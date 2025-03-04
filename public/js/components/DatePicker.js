import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
// import "https://cdn.jsdelivr.net/npm/@duetds/date-picker@1.4.0/dist/duet/duet.esm.js";
// import "https://cdn.jsdelivr.net/npm/@duetds/date-picker@1.4.0/dist/duet/duet.js;";
import { FormInput } from "./FormInput.js";

class DatePicker extends FormInput {
  static styles = [
    FormInput.styles,
    css`
      :host {
        --duet-color-primary: var(--main-bg-color);
        --duet-color-text: #333;
        --duet-color-text-active: #fff;
        --duet-color-placeholder: #666;
        --duet-color-button: #fff0;
        --duet-color-surface: #fff;
        --duet-color-overlay: rgba(0, 0, 0, 0.8);
        --duet-color-border: var(--border-color);

        --duet-font: var(--body-font-family-text);
        --duet-font-normal: var(--body-font-weight);
        --duet-font-bold: bold;

        --duet-radius: var(--border-radius-sm);
        --duet-z-index: 600;
      }

      .duet-date__input {
        padding: 0.5rem 1rem;
      }

      .invalid .duet-date__input {
        border: 1px solid var(--error-color);
      }

      .duet-date__toggle {
        box-shadow: none;
      }

      .duet-date__input:focus,
      .duet-date__toggle:focus {
        box-shadow: none;
        outline: -webkit-focus-ring-color auto 1px;
      }

      .duet-date__toggle-icon > svg {
        height: 1.25rem;
      }
    `,
  ];

  // createRenderRoot() {
  //   return this;
  // }

  constructor() {
    super();
    const year = new Date().getFullYear();
    this.minDate = `${year - 100}-01-01`;
  }

  firstUpdated() {
    super.firstUpdated();
    const $picker = this.shadowRoot.querySelector("duet-date-picker");

    new MutationObserver((_, observer) => {
      if ($picker.classList.contains("hydrated")) {
        this.duetFirstUpdated($picker);
        observer.disconnect();
      }
    }).observe($picker, { attributes: true, attributeFilter: ["class"] });

    this.addEventListener("duetChange", (e) => this.handleInput(e));
  }

  get $input() {
    return this.shadowRoot.querySelector(".duet-date__input");
  }

  duetFirstUpdated(picker) {
    const DATE_FORMAT = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    picker.dateAdapter = {
      parse(value = "", createDate) {
        const matches = value.match(DATE_FORMAT);
        if (matches) {
          return createDate(matches[3], matches[2], matches[1]);
        }
      },
      format(date) {
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      },
    };
    picker.localization = { ...picker.localization, placeholder: window.$.t("placeholder.date") };
  }

  checkValidity() {
    const valid = super.checkValidity();
    // duet-date-picker does not have a built-in invalid handler
    this.toggleError(!valid);
    return valid;
  }

  updateValue(e) {
    this.value = e.detail.value;
  }

  render() {
    return html`
      <div class="container">
        <label class="${this._hasError ? "invalid" : ""}" for="${this.id}">
          ${this.label}${this.required ? html`<em class="important">*</em>` : ""}
        </label>
        <duet-date-picker
          class="date"
          identifier="${this.id}"
          class="${this._hasError ? "invalid" : ""}"
          min="${this.minDate}"
          value="${this.value}"
          ?required=${this.required}
        ></duet-date-picker>
      </div>
      <span class="invalid ${this._hasError ? "visible" : ""}">Error</span>
    `;
  }
}

customElements.define("date-picker", DatePicker);
