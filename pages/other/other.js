'use strict'

let fs = require('fs')
let aero = require('aero')

module.exports = {
	init: function() {
		fs.readdir(aero.config.path.pages, (error, pages) => {
			this.pages = pages.filter(page => page !== 'me' && !(page in aero.layout.json.nav))
		})
	},

	get: function(request, response) {
		response.render({
			pages: this.pages,
			humanize: name => name[0].toUpperCase() + name.substring(1).replace('-', ' ')
		})
	}
}