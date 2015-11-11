$.getJSON('https://api.github.com/users/blitzprog/events', function(data) {
	$("#github-events").html(
		'<ul>' + data
		.filter(function(e) {
			return e.type === 'PushEvent'
		})
		.map(function(e) {
			return e.payload.commits.map(function(commit) {
				return '<li><a href="https://github.com/' + e.repo.name + '/commit/' + commit.sha + '" target="_blank">' + commit.message + '</a>'
					+ '<span class="repository-name">' + e.repo.name.substring(e.repo.name.indexOf('/') + 1) + '</span>'
					+ '</li>';
			}).join('');
		}).join('') + '</ul>'
	);
}).fail(function() {
	console.error("Couldn't fetch GitHub events");
});