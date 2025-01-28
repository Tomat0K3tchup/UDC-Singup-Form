import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class FormInputPhone extends window.FormInput {
  static styles = window.FormInput.styles;

  // Not ideal but used to import flag dropdown (except if better solution is available)
  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    super.firstUpdated();
    const tom = new TomSelect("#id_country", {
      sortField: {
        field: "text",
        direction: "asc",
      },
      lockOptgroupOrder: true,
      maxOptions: null,
      onInitialize: _generateLanguageLookupTom,
    });

    const preferredCountries = ["us", "ca", "uk", "fr", "de", "hn", "nl", "be", "ch"];
    preferredCountries.forEach((countryCode) => {
      const key = countryCode.toUpperCase();
      const option = tom.options[key];
      if (option) {
        tom.options[key] = { ...option, optgroup: 1 };
      }
    });
  }

  updateValue(e) {
    this.value = this.itiHandler.getNumber();
    console.log(this.value);
  }

  _getCountryFromBrowser(callback) {
    const langCountryCode = navigator.languages ? navigator.languages[0] : navigator.language;

    if (!langCountryCode) {
      callback("us");
      return;
    }

    try {
      const lang = langCountryCode.split("-")[1].toLowerCase();
      callback(lang);
    } catch (error) {
      callback(langCountryCode);
    }
  }

  render() {
    return html`
      <div class="formInput">
        <div class="container">
          <label class="${this._hasError ? "invalid" : ""}" for="${this.id}">
            ${this.label}${this.required ? html`<em class="important">*</em>` : ""}
          </label>
          <input
            id="${this.id}"
            type="tel"
            name="${this.name || this.id}"
            value="${this.value}"
            class="${this._hasError ? "invalid" : ""}"
            @input=${(e) => this.handleInput(e)}
            @blur=${this.onBlurValidation}
            @invalid=${() => this.toggleError(true)}
            ?required=${this.required}
          />
        </div>
        <span class="invalid ${this._hasError ? "visible" : ""}">Error</span>
      </div>
    `;
  }
}

customElements.define("form-phone", FormInputPhone);
