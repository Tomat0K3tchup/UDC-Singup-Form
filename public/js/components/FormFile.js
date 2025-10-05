import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import { FormInput } from "./FormInput.js";

export class FormInputFile extends FormInput {
  static styles = [
    FormInput.styles,
    css`
      input[type="file"] {
        display: none;
      }
    `,
  ];

  static properties = {
    ...FormInput.properties,
    accept: { type: String },
    capture: { type: String },
  };

  constructor() {
    super();
    this.accept = "";
    this.capture = "";
    this.fileName = "Choose a file";
  }

  /* 
    I don't get why value getter and setter can't be inherited if none of them are overridden
    But since it's the case, I copy pasted them
  */
  get value() {
    return this._value;
  }

  set value(val) {
    if (val == this._value) return;
    this._value = val;

    this.updateFormValue();
  }

  updateValue(e) {
    const fileInput = e.target;
    const fileName = fileInput.files[0] ? fileInput.files[0].name : "Choose a file";

    this.fileName = fileName;

    const reader = new FileReader();
    reader.onload = (fileLoadEvent) => {
      this.value = fileLoadEvent.target.result;
    };

    if (fileInput) {
      reader.readAsDataURL(fileInput.files[0]);
    }
  }

  get validity() {
    const valueMissing = this.required && !this.value;
    return { valueMissing: valueMissing, valid: !valueMissing };
  }

  checkValidity() {
    // Emulate the trigger of an invalid event on the input since a hidden input isn't handled properly
    const invalid = this.validity.valid;
    if (!invalid) this.$input.dispatchEvent(new Event("invalid"));

    return invalid;
  }

  // TODO: could add button at the end of the line to make element keyboard focusable
  render() {
    return html`
      <div class="container">
        <label class="${this._hasError ? "invalid" : ""}" for="${this.id}">
          ${this.label}${this.required ? html`<em class="important">*</em>` : ""}
          <input
            id="${this.id}"
            type="file"
            accept="${this.accept}"
            @input=${(e) => this.handleInput(e)}
            @blur=${this.onBlurValidation}
            @invalid=${() => this.toggleError(true)}
          />
          <div id="fileDisplay" class="input ${this._hasError ? "invalid" : ""}">${this.fileName}</div>
        </label>
      </div>

      <span class="invalid ${this._hasError ? "visible" : ""}">Error</span>
    `;
  }
}

customElements.define("form-file", FormInputFile);
