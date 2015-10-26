collapse = function() {
	$('.skills-list').fadeOut();
}

expand = function() {
	$('.skills-list').fadeIn();
}

toggle = function(event) {
	$(event.target).parent().parent().children('.skills-list').fadeToggle();
}

$('.skills-category').unbind('click').click(toggle);