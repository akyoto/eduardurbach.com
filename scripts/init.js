let navItems = $('navigation').querySelectorAll('.navigation-item')

let fadeIndex = function(i) {
	return function() {
		navItems[i].classList.add('navigation-item-ready')
	}
}

for(let i = 0; i < navItems.length; i++) {
	window.setTimeout(fadeIndex(i), i * 50)
}

// Fade out loading animation
window.onload = () => $('loading-animation').classList.add('fade-out')