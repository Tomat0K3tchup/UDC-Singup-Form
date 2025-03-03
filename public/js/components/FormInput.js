import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
// FIXME: Rn the i18n process is a mix of lit-i18n inside render and accessing the global jQuery object for outside of render
// This is less than ideal
// import { translate as t } from "https://cdn.jsdelivr.net/npm/lit-i18n@4.1.0/+esm";

const NAME_VALIDATION_REGEX = /^\s*[\p{L}](([ ,.'-](?<!( {2}|[,.'-]{2})))*[\p{L}])*[ ,.'-]?$/u;

class FormInput extends LitElement {
  static formAssociated = true;
  static styles = css`
    /* Same as formInput class */
    :host {
      display: flex;
      flex-direction: column;
      // align-items: start;
      width: 100%;
    }

    .container {
      display: flex;
      flex-direction: column;
    }

    div:has(input[type="checkbox"]) {
      flex-direction: row-reverse;
      justify-content: flex-end;
      align-items: center;
    }

    input,
    .input {
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-sm);
      padding: 0.5rem 1rem;
      font-family: var(--body-font-family-text);
      font-size: 1rem;
    }

    input[type="checkbox"] {
      margin-right: 0.5rem;
    }

    .invalid {
      color: var(--error-color);
    }

    input.invalid,
    .input.invalid {
      border: 1px solid var(--error-color);
    }

    span.invalid {
      padding: 0.4rem 0 0 0.5rem;
      font-size: 0.9rem;
      display: none;
    }

    span.visible {
      display: block;
    }

    .important {
      color: var(--error-color) !important;
    }
  `;

  _internals;
  _value;

  static properties = {
    name: { type: String, reflect: true },
    id: { type: String },
    type: { type: String },
    label: { type: String },
    value: { type: String },
    required: { type: Boolean },
    _hasError: { type: Boolean },
  };

  constructor() {
    super();
    this.name = "";
    this.label = "";
    this.type = "text";
    this.id = "";
    this._value = "";
    this.value = this._value;
    this.required = false;
    this._hasError = false;
  }

  createRenderRoot() {
    const renderRoot = super.createRenderRoot();
    renderRoot.delegateFocus = true;
    return renderRoot;
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.name.trim()) {
      this.name = this.id;
    }

    this._internals = this.attachInternals();
    if (!this._internals) {
      console.error("ElementInternals could not be attached.");
    }
  }

  firstUpdated() {
    super.firstUpdated();
    this.$errorMessage = this.renderRoot.querySelector("span");
    this._internals.setFormValue("");
  }

  get $input() {
    return this.renderRoot.querySelector("input");
  }

  updateValue(e) {
    if (this.type == "checkbox") {
      this.value = e.target.checked ? "Yes" : "No";
    } else {
      this.value = e.target.value;
    }
  }

  get value() {
    return this._value;
  }

  set value(val) {
    if (val == this._value) return;
    this._value = val;
    this.requestUpdate("value", this._value);

    const updateFormWhenReady = new Promise((resolve) => {
      if (this.$input && this._internals) {
        return resolve();
      }

      const observer = new MutationObserver((_) => {
        if (this.$input && this._internals) {
          resolve();
          observer.disconnect();
        }
      });

      observer.observe(this.renderRoot, {
        childList: true,
        subtree: true,
      });
    });

    updateFormWhenReady.then((_) => {
      this.updateFormValue();
    });
  }

  get willValidate() {
    return this.$input.willValidate;
  }

  get validity() {
    return this.$input.validity;
  }

  checkValidity() {
    return this.$input.checkValidity();
  }

  get validationMessage() {
    const validity = this.validity;

    if (validity.valueMissing) {
      return window.$.t("errors.required");
    }

    if (validity.typeMismatch && this.type == "email") {
      const matchAtRegex = /@/;
      const matchAtAndDomainRegex = /.+@.+\..+/;
      if (!this.value.match(matchAtRegex)) return window.$.t("errors.emailAt");
      if (!this.value.match(matchAtAndDomainRegex)) return window.$.t("errors.emailDomain");
    }

    return this.$input.validationMessage;
  }

  onBlurValidation() {
    if (this.validity.valid) return;
    if (this.validity.valueMissing) return;
    this.toggleError();
    // tooLong // tooShort // rangeOverflow // rangeUnderflow // typeMismatch
  }

  toggleError(force) {
    this._hasError = force != undefined ? force : !this._hasError;
    this.$errorMessage.innerHTML = this._hasError ? this.validationMessage : "";
  }

  updateFormValue() {
    this._internals.setFormValue(this.value);
    if (!this.$input) return;
    this._internals.setValidity(this.validity, this.validationMessage, this.$input);
  }

  handleInput(e) {
    if (this._hasError) {
      this.toggleError();
    }
    this.updateValue(e);
  }

  render() {
    return html`
      <div class="container">
        <label class="${this._hasError ? "invalid" : ""}" for="${this.id}">
          ${this.label}${this.required ? html`<em class="important">*</em>` : ""}
        </label>
        <input
          id="${this.id}"
          type="${this.type}"
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
    `;
  }
}

customElements.define("form-input", FormInput);
window.FormInput = FormInput;
