// prevOrLast
jQuery.fn.prevOrLast = function(selector) {
	var prev = this.prev(selector);
	return (prev.length) ? prev : this.nextAll(selector).last();
};

// nextOrFirst
jQuery.fn.nextOrFirst = function(selector) {
	var next = this.next(selector);
	return (next.length) ? next : this.prevAll(selector).last();
};

// Navigate left
kaze.navigateLeft = function() {
	kaze.loadURL($('.active').parent().prevOrLast('.navigation-item').children('.navigation-item-text').attr('href'));
};

// Navigate right
kaze.navigateRight = function() {
	kaze.loadURL($('.active').parent().nextOrFirst('.navigation-item').children('.navigation-item-text').attr('href'));
};

// Load
$(window).load(function() {
	kaze.fadeSpeed = 300;

	$(".navigation-item").each(function(index, item) {
		var $item = $(item);

		window.setTimeout(function() {
			$item.addClass("navigation-item-ready");
		}, (index) * 50);
	});

	/*$(document).keydown(function(event) {
		switch(event.which) {
			// Left
			case 37:
				kaze.navigateLeft();
				break;
			// Right
			case 39:
				kaze.navigateRight();
				break;

			case 77:
				kaze.loadURL('/');
				break;

			case 83:
				kaze.loadURL('/skills');
				break;

			case 80:
				kaze.loadURL('/projects');
				break;

			case 87:
				kaze.loadURL('/websites');
				break;

			case 67:
				kaze.loadURL('/contact');
				break;

			default:
				return;
		}
		event.preventDefault();
	});*/
});