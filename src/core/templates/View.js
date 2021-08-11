import { createStyles } from "../../lib/js/createStyles.js";

function createView(configs, className) {
  const resetStyles = createStyles({
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
    transition: "all 150ms linear",
    fontFamily: "sans-serif",
  });

  const defaultStyes = createStyles({
    overflow: "auto",
    position: "relative",
  });

  class View extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      const component = document.createElement("div");

      component.classList.add(className);
      component.innerHTML = this.innerHTML;
      this.innerHTML = "";

      const componentStyles = configs["styles"] || {};

      if (Object.keys(componentStyles).length > 0) {
        const styleTag = document.createElement("style");

        const styles = createStyles(componentStyles);

        styleTag.textContent = `*{${resetStyles}}`;
        styleTag.textContent += `.${className}{${defaultStyes}${styles}}`;

        this.shadowRoot.append(styleTag, component);
      } else {
        this.shadowRoot.appendChild(component);
      }

      this.shadowRoot.appendChild(component);
    }
  }

  return View;
}

export { createView };
