import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class FormAccordion extends LitElement {
  static properties = {
    toggleValue: { type: String },
  };

  constructor() {
    super();
    this.toggleValue = "Yes";
  }

  firstUpdated() {
    super.firstUpdated();
    this.$decision = this.querySelector("[slot='decision']");
    this.$hidden = this.querySelector("[slot='hidden']");

    this.$hidden.style.display = "none";
  }

  handleChange(e) {
    // Because the event is fired in a shadow DOM via a slot we need to "break" the encapsulation
    const display = e.target.value == this.toggleValue ? "flex" : "none";
    this.$hidden.style.display = display;
  }

  render() {
    return html`
      <slot name="decision" @change=${(e) => this.handleChange(e)}></slot>
      <slot name="hidden"></slot>
    `;
  }
}

customElements.define("form-accordion", FormAccordion);
