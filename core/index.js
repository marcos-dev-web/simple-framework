import { styleTypes } from "../lib/js/types.js";
import { createText } from "./templates/Text.js";
import { createView } from "./templates/View.js";

class ComponentCore {
  constructor(name = "") {
    this.#validateComponentName(name);
    this.name = name;
  }

  #validateComponentName(name = "") {
    const validations = [
      (value) => value.length === 0,
      (value) => !value.includes("-"),
      (value) => value.split("").filter((t) => t === "-").length > 1,
      (value) => {
        const alpha = "abcdefghijklmnopqrstuvwxyz";
        const allowedChars = String(
          alpha + alpha.toUpperCase() + "0123456789"
        ).split("");

        const separated = value.split("");
        const index = separated.indexOf("-");

        const before = separated[index - 1];
        const after = separated[index + 1];

        const tB = allowedChars.some((c) => before === c);
        const tA = allowedChars.some((c) => after === c);

        if (!tA || !tB) {
          return true;
        }
        return false;
      },
    ];

    if (validations.some((v) => v(name))) {
      throw new Error("INVALID_COMPONENT_NAME");
    }
  }

  #componentProperties = {
    text: {
      attrs: ["value", "styles"],
      styles: Object.keys(styleTypes),
    },
    view: {
      attrs: ["child", "styles"],
      styles: Object.keys(styleTypes),
    },
  };

  #types = ["text", "view"];

  #validateComponent(keys, component) {
    const required = ["type", "properties"];

    if (!required.every((v) => keys.some((k) => v === k))) {
      throw new Error("MISSING_REQUIRED_KEYS");
    }

    if (
      !component["type"] ||
      !this.#types.some((t) => t === component["type"])
    ) {
      throw new Error("INVALID_TYPE");
    }

    if (
      component["properties"] === null ||
      typeof component["properties"] !== "object"
    ) {
      throw new Error("prop 'properties' must be an object");
    }

    Object.keys(component["properties"]).forEach((pk) => {
      if (
        !this.#componentProperties[component["type"]].attrs.some(
          (cp) => cp === pk
        )
      ) {
        throw new Error("INVALID_PROPERTY");
      }
    });

    if (component["properties"]["styles"]) {
      if (
        typeof component["properties"]["styles"] !== "object" ||
        !component["properties"]["styles"]
      ) {
        throw new Error("INVALID_STYLE_PROP");
      }
    }

    Object.keys(component["properties"]["styles"]).forEach((sk) => {
      if (
        !this.#componentProperties[component["type"]]["styles"].some(
          (st) => st === sk
        )
      ) {
        throw new Error("INVALID_STYLE");
      }
    });
  }

  #randomClass() {
    let s = "style-";

    for (let i = 0; i < 10; i++) {
      s += String(Math.floor(Math.random() * i));
    }

    s += String(new Date().getTime());

    return s;
  }

  #typeComponent = {
    type: null,
    properties: {
      styles: styleTypes,
    },
  };

  create(component = this.#typeComponent) {
    const keys = Object.keys(component);

    this.#validateComponent(keys, component);

    const type = component["type"];
    const properties = component["properties"];

    const componentName = this.name;

    const styles = properties.styles;

    const configs = {
      properties,
      type,
      styles,
    };

    const className = this.#randomClass();

    const elements = {
      view: (cs) => createView(configs, cs),
      text: (cs) => createText(configs, cs),
    };

    customElements.define(componentName, elements[type](className));
  }
}

export default ComponentCore;
