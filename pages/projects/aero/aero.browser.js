$.getJSON('https://api.github.com/repos/aerojs/aero/stargazers', function(data) {
	$("#aero-stars").text(data.length).addClass('visible-text');
}).fail(function() {
	console.log("Couldn't fetch GitHub stars");
});