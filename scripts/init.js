// Load
$(window).load(function() {
	$(document).keydown(function(event) {
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
	});
});