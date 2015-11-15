exports.get = function(request, response) {
	response.json({})
}

exports = {
	get: function(request, response) {
		response.end('get it')
	},

	post: function(request, response) {
		response.end('post it')
	},

	delete: function(request, response) { // DRAFT: Not supported yet
		response.end('delete it')
	}
}