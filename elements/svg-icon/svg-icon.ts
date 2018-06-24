export default class SVGIcon extends HTMLElement {
	static get observedAttributes() {
		return ["name"]
	}

	attributeChangedCallback(attrName, oldVal, newVal) {
		if(attrName === "name") {
			this.render()
		}
	}

	async render() {
		let url = `/images/svg/${this.name}.svg`
		let response = await fetch(url)
		
		if(!response.ok) {
			console.warn(`Failed loading SVG icon: ${url}`)
			return
		}

		let text = await response.text()
		this.innerHTML = text
	}

	get name() {
		return this.getAttribute("name")
	}

	set name(value: string) {
		this.setAttribute("name", value)
	}
}