import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class LanguageSelector extends LitElement {
  static styles = css`
    select {
      font-family: var(--body-font-family);
      background: white;
      padding: 0.5rem;
      border-radius: var(--border-radius-sm);
      color: var(--main-bg-color);
    }
  `;
  constructor() {
    super();
    this.lngs = $.i18n.options.supportedLngs.filter((lng) => lng !== "cimode");
  }

  get $select() {
    return this.renderRoot.querySelector("select");
  }

  firstUpdated() {
    super.firstUpdated();
    this.$select.value = $.i18n.resolvedLanguage;
  }

  handleChange() {
    $.i18n.changeLanguage(this.$select.value);
  }

  render() {
    return html`
      <select @change=${this.handleChange}>
        ${this.lngs.map((lng) => {
          return html` <option value="${lng}" }>${lng.toUpperCase()}</option> `;
        })}
      </select>
    `;
  }
}

customElements.define("language-selector", LanguageSelector);
