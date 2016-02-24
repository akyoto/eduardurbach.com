let navItems = document.querySelectorAll('.navigation-item');

let fadeIndex = function(i) {
	return function() {
		navItems[i].classList.add('navigation-item-ready');
	}
}

for(let i = 0; i < navItems.length; i++) {
	window.setTimeout(fadeIndex(i), i * 50);
}

// Fade out loading animation
$('loading-animation').classList.add('fade-out');