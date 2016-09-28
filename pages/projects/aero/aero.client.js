let url = 'https://api.github.com/repos/aerojs/aero?clientid=e8fe5e8bcaf6b7ebe0534a93976dca8bdc320ee4&clientsecret=eae6fea79ebe2c919770e0c5e2e38d64d70453d5'

$.getJSON(url).then(data => {
	let stars = $('aero-stars')
	stars.textContent = data.stargazers_count
	stars.classList.add('visible-text')
})
