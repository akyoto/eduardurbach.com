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

			$container.animate({
				'opacity' : '1'
			}, fadeSpeed, 'linear');
		}
	});
}

// Just load 'em now
loadFonts();

// Elements
var $container = $('#container');
var $navigationContainer = $('#navigation-container');
var $contentContainer = $('#content-container');

// Recalculate size
function recalculateContentSize() {
	var minContentHeight =
		$container.outerHeight(true)
		- $navigationContainer.outerHeight(true);
	
	$contentContainer.css("min-height", minContentHeight + "px");
}

// Page handler
setPageHandler(function(pageId) {
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
				loadURL("/");
				break;

			// p
			case 80:
				loadURL("/projects");
				break;

			// s
			case 83:
				loadURL("/skills");
				break;

			// w
			case 87:
				loadURL("/web");
				break;

			// Left
			case 37:
				navigateLeft();
				break;

			// Right
			case 39:
				navigateRight();
				break;

			default:
				return;
		}

		event.preventDefault();
	});
});