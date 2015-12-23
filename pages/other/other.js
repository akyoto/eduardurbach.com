'use strict'

let fs = require('fs')
let aero = require('aero')

let excludePages = {
	'me': true,
	'api': true,
	'about': true,
	'education': true,
	'employment': true,
	'resume': true,
	'allprojects': true
}

exports.init = function() {
	fs.readdir(aero.config.path.pages, (error, pages) => {
		this.pages = pages.filter(page => !(excludePages[page]) && !(page in aero.layout.json.nav))
	})
}

exports.get = function(request, response) {
	response.render({
		pages: this.pages,
		humanize: name => name[0].toUpperCase() + name.substring(1).replace('-', ' ')
	})
}