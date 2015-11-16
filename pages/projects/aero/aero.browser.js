kaze.getJSON('https://api.github.com/repos/aerojs/aero/stargazers?access_token=e350588171cbd6c8351b0d27cb07201b1e1fbe5e', function(data) {
	var stars = document.getElementById('aero-stars');
	stars.innerHTML = data.length;
	stars.classList.add('visible-text');
});