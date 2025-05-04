import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import { i18n, supportedLngs } from "../i18n.js";

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
    this.lngs = supportedLngs;
    this.languageResources = "public/locales/{{lng}}/{{ns}}.json";
  }

  firstUpdated() {
    super.firstUpdated();

    console.log(i18n);

    i18n.on("initialized", () => {
      this.$select.value = i18n.language;
      this.requestUpdate();
    });

    i18n.on("languageChanged", () => {
      this.requestUpdate();
    });
  }

  get $select() {
    return this.renderRoot.querySelector("select");
  }

  handleChange() {
    i18n.changeLanguage(this.$select.value);
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
