/*
    Freezing Wind CMS
*/

var fs = require("fs");
var nib = require("nib");
var path = require("path");
var jade = require("jade");
var events = require("events");
var stylus = require("stylus");
var express = require("express");
var objectAssign = require("object-assign");

// Init
var app = express();
var eventEmitter = new events.EventEmitter();

var fw = {
    config: {
        "siteName": "Untitled",
        "pagesPath": "./pages",
        "stylesPath": "./styles",
        port: 80
    },
    css: "",
    
    start: function(configFile) {
        // Merge
        this.config = objectAssign(this.config, JSON.parse(fs.readFileSync(configFile, "utf8")));
        
        this.init();
        this.loadStyles();
        this.loadPages();
    },
    
    init: function() {
        var options = {
            maxAge: 60 * 60 * 1000
        };
        
        // Set up jade
        app.set("views", fw.config.pagesPath);
        app.set("view engine", "jade");
        app.locals.basedir = path.join(__dirname, "pages");

        // Static files
        app.use("/fw/css", express.static("./fw/css", options));
        app.use("/fw/js", express.static("./fw/js", options));
        app.use("/js", express.static("./js", options));
        app.use("/images", express.static("./images", options));
        
        /*app.use(function(req, res, next) {
            if(req.url.match(/^\/(css|js|img|font)\/.+/)) {
                res.setHeader('Cache-Control', 'public, max-age=3600'))
            }
            next();
        });*/
        
        // Favicon
        app.get("/favicon.ico", function(request, response) {
            response.sendFile("favicon.ico", {root: "./"});
        });

        eventEmitter.on("newPage", function(pageName) {
            console.log("Installing page: " + pageName);
        });
    },
    
    loadStyles: function() {
        var files = fs.readdirSync(fw.config.stylesPath);
        
        // Combine everything into a single CSS string
        var fileObjects = files.map(function(file) {
            return {
                name: file,
                fullPath: path.join(fw.config.stylesPath, file)
            };
        });
        
        // Prepend reset
        fileObjects.unshift({
            name: "reset.styl",
            fullPath: "fw/styles/reset.styl"
        });
        
        this.css = fileObjects.filter(function(file) {
            return fs.statSync(file.fullPath).isFile();
        }).map(function(file) {
            console.log("Compiling style: " + path.basename(file.name, ".styl"));
            
            var style = fs.readFileSync(file.fullPath, "utf8");
            var output = "";
            
            stylus(style)
                .set("filename", file.fullPath.replace(".styl", ".css"))
                .set("compress", true)
                .use(nib())
                .render(function(error, css) {
                    if(error)
                        throw error;
                    
                    output = css;
                });
            
            return output;
        }).reduce(function(total, style) {
            return total + style;
        });
    },
    
    loadPages: function() {
        var files = fs.readdirSync(fw.config.pagesPath);
        
        // Filter directories
        var pages = files.map(function(file) {
            return {
                name: file,
                fullPath: path.join(fw.config.pagesPath, file)
            };
        }).filter(function(file) {
            return fs.statSync(file.fullPath).isDirectory();
        });
        
        // Find all pages
        pages.forEach(function(file) {
            var pageName = file.name;
            var jsonFile = path.join(file.fullPath, pageName + ".json");
            var stylFile = path.join(file.fullPath, pageName + ".styl");
            
            var jsonString = null;
            
            // JSON
            try {
                jsonString = fs.readFileSync(jsonFile, "utf8");
            } catch(error) {
                //console.warn("Missing page information file: " + jsonFile);
            }
            
            var page = {
                title: pageName.capitalize(),
                url: pageName
            };
            
            // Merge
            if(jsonString != null)
                page = objectAssign(page, JSON.parse(jsonString));
            
            var style = null;
            
            // Style
            try {
                style = fs.readFileSync(stylFile, "utf8");
            } catch(error) {
                //console.warn("Missing stylus file: " + stylFile);
            }
            
            if(style != null) {
                stylus(style)
                    .set("filename", stylFile.replace(".styl", ".css"))
                    .set("compress", true)
                    .use(nib())
                    .render(function(error, css) {
                        if(error)
                            throw error;
                        
                            page.css = css;
                    });
            }
            
            if(typeof fw.config.pages == "undefined")
                fw.config.pages = {};
            
            fw.config.pages[pageName] = page;
            eventEmitter.emit("newPage", pageName);
        });
        
        // Compile jade files
        pages.forEach(function(file) {
            var key = file.name;
            var page = fw.config.pages[key];
            
            console.log("Compiling page: " + page.title);
            
            var params = {
                pageId: key,
                page: page,
                pages: fw.config.pages,
                siteName: fw.config.siteName,
                css: fw.css
            };
            
            // Render Jade file to HTML
            app.render(key + "/" + key, params, function(error, html) {
                if(error)
                    throw error;
                
                params.content = html;
                
                // Set up response with cached output
                app.get("/raw/" + page.url, function(request, response) {
                    response.header("Content-Type", "text/html; charset=utf-8");
                    response.end(html);
                });
                
                // Render Jade file to HTML
                app.render("layout", params, function(error, html) {
                    if(error)
                        console.log(error);
                    
                    // Set up response with cached output
                    app.get("/" + page.url, function(request, response) {
                        response.header("Content-Type", "text/html; charset=utf-8");
                        response.end(html);
                    });
                });
            });
        });
        
        fw.makePages();
        fw.startServer();
    },
    
    makePages: function() {
        app.get("/fw/js/pages.js", function(request, response) {
            response.setHeader("Content-Type", "application/javascript");
            
            var makePages = [];
            
            Object.keys(fw.config.pages).forEach(function(key) {
                var page = fw.config.pages[key];
                
                makePages.push('makePage("' + page.title + '", "' + key + '", "' + page.url + '");');
            });
            
            response.end("$(document).ready(function(){" + makePages.join('') + "});");
        });
    },
    
    // Start server
    startServer: function() {
        // Start server
        app.listen(fw.config.port);
        
        console.log("Server started on port " + fw.config.port + ".");
    }
};

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

module.exports = fw;