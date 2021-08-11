import { createStyles } from "../../lib/js/createStyles.js";

function createText(configs, className) {
  const resetStyles = createStyles({
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    transition: 'all 150ms linear',
    fontFamily: 'sans-serif',
  })

  const defaultStyes = createStyles({
    display: 'block',
  })

  class Text extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      const component = document.createElement("p");

      component.classList.add(className);
      component.textContent = configs.properties.value || this.textContent;

      const componentStyles = configs['styles'] || {}

      if (Object.keys(componentStyles).length > 0) {
        const styleTag = document.createElement('style');

        const styles = createStyles(componentStyles);

        styleTag.textContent = `*{${resetStyles}}`
        styleTag.textContent += `.${className}{${defaultStyes}${styles}}`;

        this.shadowRoot.append(styleTag, component);
      } else {
        this.shadowRoot.appendChild(component);
      }

      this.shadowRoot.appendChild(component);
    }
  }

  return Text;
}

export { createText }