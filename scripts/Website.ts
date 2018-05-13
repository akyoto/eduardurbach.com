import Application from "./Application"

export default class Website {
	app: Application

	constructor(app: Application) {
		this.app = app
	}

	init() {
		// App init
		this.app.init()

		// Event listeners
		document.addEventListener("readystatechange", this.onReadyStateChange.bind(this))
		document.addEventListener("DOMContentLoaded", this.onContentLoaded.bind(this))

		// If we finished loading the DOM (either "interactive" or "complete" state),
		// immediately trigger the event listener functions.
		if(document.readyState !== "loading") {
			this.app.emit("DOMContentLoaded")
			this.run()
		}
	}

	onReadyStateChange() {
		if(document.readyState !== "interactive") {
			return
		}

		this.run()
	}

	run() {
		this.app.content = document.getElementById("content")
		this.app.loading = document.getElementById("loading")

		this.mountMenu()

		// Fade out loading animation
		this.app.loading.classList.add("fade-out")
	}

	mountMenu() {
		let navItems = document.getElementsByClassName("navigation-item")

		let fadeIndex = function(i) {
			return function() {
				navItems[i].classList.add("navigation-item-ready")
			}
		}

		for(let i = 0; i < navItems.length; i++) {
			window.setTimeout(fadeIndex(i), i * 50)
		}
	}

	onContentLoaded() {}
	onIdle() {}
}