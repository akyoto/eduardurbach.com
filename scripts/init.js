// Load
$(window).load(function() {
	kaze.fadeSpeed = 300;

	$(".navigation-item").each(function(index, item) {
		var $item = $(item);

		window.setTimeout(function() {
			$item.addClass("navigation-item-ready");
		}, (index) * 150);
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