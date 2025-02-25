import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class Header extends LitElement {
  static styles = css`
    :host {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--dark-blue);
      border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
      margin: 0;
      padding: 2rem;
    }

    h1 {
      font-family: Montserrat, sans-serif;
      font-size: 2rem;
      color: var(--main-accent-color);
      margin: 0;
      padding: 0;
      font-weight: 900;
      text-transform: uppercase;
    }
  `;

  static properties = {
    title: { type: String },
  };

  constructor() {
    super();
    this.title = "";
  }

  render() {
    return html`
      <h1>${this.title}</h1>
      <language-selector></language-selector>
    `;
  }
}

customElements.define("header-element", Header);
