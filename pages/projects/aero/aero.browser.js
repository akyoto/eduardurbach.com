kaze.getJSON('https://api.github.com/repos/aerojs/aero/stargazers', function(data) {
	var stars = document.getElementById('aero-stars');
	stars.innerHTML = data.length;
	stars.classList.add('visible-text');
});