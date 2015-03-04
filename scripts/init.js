// Elements
var $navigationContainer = $('#navigation-container');
var $contentContainer = $('#content-container');
var $statusMessage = $('#status-message');

// Load fonts
function loadFonts() {
	$statusMessage.text("Loading fonts...");

	// Font
	WebFont.load({
		google: {
			families: ['Lato', 'Lato:bold', 'Julius Sans One', 'Julius Sans One:bold']
		},
		active: function() {
			$statusMessage.fadeOut(500);

			aero.$container.animate({
				'opacity' : '1'
			}, aero.fadeSpeed, 'linear');
		}
	});
}

// Just load 'em now
loadFonts();

// Recalculate size
function recalculateContentSize() {
	var minContentHeight =
		aero.$container.outerHeight(true)
		- $navigationContainer.outerHeight(true);
	
	$contentContainer.css("min-height", minContentHeight + "px");
}

// Page handler
aero.setPageHandler(function() {
	recalculateContentSize();
})

// Resize
$(window).resize(function() {
	// Calculate content size
	recalculateContentSize();
});

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