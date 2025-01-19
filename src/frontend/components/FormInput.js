import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

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

    div {
      display: flex;
      flex-direction: column;
    }

    div:has(input[type="checkbox"]) {
      flex-direction: row-reverse;
      justify-content: flex-end;
      align-items: center;
    }

    input {
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

    input.invalid {
      border: 1px solid var(--error-color);
    }

    span {
      padding: 0.4rem 0 0 0.5rem;
      font-size: 0.9rem;
      display: none;
    }

    .visible {
      display: block;
    }

    .important {
      color: var(--error-color) !important;
    }
  `;

  _internals;

  static properties = {
    name: { type: String, reflect: true },
    id: { type: String },
    type: { type: String },
    label: { type: String },
    value: { type: String, reflect: true },
    required: { type: Boolean },
    _hasError: { type: Boolean },
  };

  constructor() {
    super();
    this.name = "";
    this.label = "";
    this.type = "text";
    this.id = "";
    this.value = "";
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
    this.$input = this.shadowRoot.querySelector("input");
    this.$errorMessage = this.shadowRoot.querySelector("span");
    this._internals.setFormValue("");
    // this.updateFormValue()
  }

  updateValue(e) {
    if (this.type == "checkbox") {
      this.value = e.target.checked;
    } else {
      this.value = e.target.value;
    }
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
    this._internals.setValidity(this.$input.validity, this.$input.validationMessage, this.$input);

    const f = new FormData(this._internals.form);
  }

  handleInput(e) {
    if (this._hasError) {
      this.toggleError();
    }
    this.updateValue(e);
    this.updateFormValue();
  }

  render() {
    return html`
      <div>
        <label class="${this._hasError ? "invalid" : ""}" for="${this.id}">
          ${this.label}${this.required ? html`<em class="important">*</em>` : ""}
        </label>
        <input
          id="${this.id}"
          type="${this.type}"
          name="${this.name || this.id}"
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
