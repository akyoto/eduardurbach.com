// Load
$(window).load(function() {
	$(".profile").animate({
		opacity: 1.0
	}, 2500);

	$(".navigation-item").each(function(index, item) {
		var $item = $(item);

		window.setTimeout(function() {
			$item.addClass("navigation-item-ready");
		}, (index + 1) * 250);
	});

	/*$(document).keydown(function(event) {
		switch(event.which) {
			// Left
			case 37:
				aero.navigateLeft();
				break;

			// Right
			case 39:
				aero.navigateRight();
				break;

			default:
				return;
		}

		event.preventDefault();
	});*/
});