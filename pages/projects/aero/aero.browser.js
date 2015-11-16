kaze.getJSON('https://api.github.com/repos/aerojs/aero/stargazers?access_token=e8fe5e8bcaf6b7ebe0534a93976dca8bdc320ee4', function(data) {
	var stars = document.getElementById('aero-stars');
	stars.innerHTML = data.length;
	stars.classList.add('visible-text');
});