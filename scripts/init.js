// Load
$(window).load(function() {
	$(document).keydown(function(event) {
		switch(event.which) {
			// m
			case 77:
				aero.loadURL("/");
				break;

			// p
			case 80:
				aero.loadURL("/projects");
				break;

			// s
			case 83:
				aero.loadURL("/skills");
				break;

			// w
			case 87:
				aero.loadURL("/web");
				break;

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