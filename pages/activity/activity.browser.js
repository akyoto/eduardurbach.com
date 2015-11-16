kaze.getJSON('https://api.github.com/users/blitzprog/events?clientid=e8fe5e8bcaf6b7ebe0534a93976dca8bdc320ee4&clientsecret=eae6fea79ebe2c919770e0c5e2e38d64d70453d5', function(data) {
	document.getElementById('github-events').innerHTML = '<ul>' +
		data
		.filter(function(e) {
			return e.type === 'PushEvent'
		})
		.map(function(e) {
			return e.payload.commits.map(function(commit) {
				return '<li class="commit"><a href="https://github.com/' + e.repo.name + '/commit/' + commit.sha + '" target="_blank">' + commit.message + '</a>'
					+ '<span class="repository-name">' + e.repo.name.substring(e.repo.name.indexOf('/') + 1) + '</span>'
					+ '</li>';
			}).join('');
		}).join('') + '</ul>';
});