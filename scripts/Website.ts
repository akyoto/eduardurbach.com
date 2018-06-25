import Application from "./Application"
import SVGIcon from "elements/svg-icon/svg-icon"
import Diff from "./Diff"

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
		window.addEventListener("popstate", this.onPopState.bind(this))

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

	onPopState(e: PopStateEvent) {
		this.app.load(location.pathname, {
			addToHistory: false
		})
	}

	run() {
		this.app.content = document.getElementById("content")
		this.app.loading = document.getElementById("loading")

		this.registerWebComponents()

		// Fade out loading animation
		this.app.loading.classList.add("fade-out")
	}

	registerWebComponents() {
		if(!("customElements" in window)) {
			console.warn("Web components not supported in your current browser")
			return
		}

		// Custom element names must have a dash in their name
		const elements = new Map<string, Function>([
			["svg-icon", SVGIcon]
		])

		// Register all custom elements
		for(const [tag, definition] of elements.entries()) {
			window.customElements.define(tag, definition)
		}
	}

	mountMountables() {
		let mountables = [...document.getElementsByClassName("mountable")]

		let fadeIndex = function(i) {
			return function() {
				Diff.mutations.queue(() => mountables[i].classList.add("mounted"))
			}
		}

		let count = 0

		for(let i = 0; i < mountables.length; i++) {
			if(mountables[i].classList.contains("mounted")) {
				continue
			}

			// Special case: Paragraphs in blockquotes should never be mounted.
			if(mountables[i].parentElement.tagName === "BLOCKQUOTE") {
				mountables[i].classList.remove("mountable")
				continue
			}

			window.setTimeout(fadeIndex(i), count * 50)
			count++
		}
	}

	onContentLoaded() {
		this.mountMountables()
	}
	onIdle() {}
}