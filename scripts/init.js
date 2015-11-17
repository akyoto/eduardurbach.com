// Init
var init = function() {
	kaze.fadeIn(document.getElementById('container'))

	var navItems = document.querySelectorAll('.navigation-item');

	var fadeIndex = function(i) {
		return function() {
			navItems[i].classList.add('navigation-item-ready');
		};
	}

	for(var i = 0; i < navItems.length; i++) {
		window.setTimeout(fadeIndex(i), i * 50);
	}

	// Fade out loading animation
	document.getElementById('loading-animation').classList.add('fade-out');
};

// Load
if(document.readyState !== 'complete')
	window.addEventListener('load', init);
else
	init();