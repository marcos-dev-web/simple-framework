import { createStyles } from "./lib/index.js"

class Component {
	constructor(name = "") {
		this.#validateComponentname(name)
		this.name = name
	}

	#validateComponentname(name) {
		const validations = [
			(value) => value.length === 0,
			(value) => !value.includes("-"),
			(value) => value.split("").filter((v) => v === "-").length > 1,
			(value) => {
				const alpha = "abcdefghijklmnopqrstuvwxyz"
				const allowedChars = String(
					alpha + alpha.toUpperCase() + "1234567890"
				).split("")
				const splited = value.split("")
				const index = splited.indexOf("-")

				const before = splited[index - 1]
				const after = splited[index + 1]

				const tB = allowedChars.some((c) => before === c)
				const tA = allowedChars.some((c) => after === c)

				if (!tA || !tB) {
					return true
				}
				return false
			},
		]

		if (validations.some((v) => v(name))) {
			throw new Error("INVALID_COMPONENT_NAME")
		}
	}

	#componentProperties = {
		text: {
			attrs: ["value", "styles"],
			styles: ["color", "fontSize"],
		},
		view: {
			attrs: ["child", "styles"],
			styles: ["width", "height", "background"],
		},
	}

	#types = ["text", "view"]

	#validateComponent(keys, component) {
		const required = ["type", "properties"]

		if (!required.every((v) => keys.some((k) => v === k))) {
			throw new Error("INVALID_KEYS")
		}

		if (!component["type"] || !this.#types.some((t) => t === component["type"]))
			throw new Error("INVALID_TYPE")

		if (
			component["properties"] === null ||
			typeof component["properties"] !== "object"
		)
			throw new Error('prop "properties" must be an object')

		Object.keys(component["properties"]).forEach((pk) => {
			if (
				!this.#componentProperties[component["type"]].attrs.some(
					(cp) => cp === pk
				)
			)
				throw new Error("INVALID_PROPERTIE")
		})

		if (component["properties"]["styles"]) {
			if (
				typeof component["properties"]["styles"] !== "object" ||
				!component["properties"]["styles"]
			)
				throw new Error("INVALID_STYLES")

			Object.keys(component["properties"]["styles"]).forEach((sk) => {
				if (
					!this.#componentProperties[component["type"]]["styles"].some(
						(st) => st === sk
					)
				)
					throw new Error("INVALID_STYLE")
			})
		}
	}

	#random() {
		let s = "styles-"

		for (let i = 0; i < 10; i++) {
			s += String(Math.floor(Math.random() * i))
		}

		s += String(new Date().getTime())

		return s
	}

	create(component = {}) {
		const keys = Object.keys(component)

		this.#validateComponent(keys, component)

		const type = component["type"]
		const properties = component["properties"]

		const componentName = this.name

		const styles = properties.styles

		const configs = {
			properties,
			type,
			styles,
		}

		const className = this.#random()

		class ComponentTemplate extends HTMLElement {
			constructor() {
				super()

				this.attachShadow({ mode: "open" })

				switch (configs.type) {
					case "text":
						const component = document.createElement("p")
						component.classList.add(className)
						const componentStyles = configs["styles"] || {}
						if (Object.keys(componentStyles).length > 0) {
							const stylesTag = document.createElement("style")
							component.textContent = configs.properties.value || this.textContent
							const styles = createStyles(componentStyles)
							stylesTag.textContent = `.${className}{${styles}}`
							this.shadowRoot.append(stylesTag, component)
						} else {
							this.shadowRoot.appendChild(component)
						}
					case "view":
						return
				}
			}
		}

		customElements.define(componentName, ComponentTemplate)
	}
}

const component = new Component("i-i")

component.create({
	type: "text",
	properties: {
		styles: {
			color: "red",
		},
	},
})

const textView = new Component("text-view")

textView.create({
	type: "text",
	properties: {
		value: "Hello World",
		styles: {
			fontSize: '50px',
			color: 'springgreen'
		}
	}
})
