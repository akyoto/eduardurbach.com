'use strict'

let aero = require('aero')
aero.run()

let http = require('http')
http.createServer(function(req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(1990);
