import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import { FormInput } from "./FormInput.js";

export class FormInputRadio extends FormInput {
  static properties = { ...FormInput.properties, options: { type: Object } };

  static styles = [
    FormInput.styles,
    css`
      fieldset {
        margin: 0;
        border: 0;
        padding: 0;
      }

      legend {
        padding-inline: 0;
      }

      fieldset > p {
        margin: 0;
        padding: 0.5rem 0 0 1rem;
      }
    `,
  ];

  constructor() {
    super();
    this.options = [];
  }

  get value() {
    return super.value;
  }

  set value(val) {
    super.value = val;

    if (!this.renderRoot) return;
    const composedShadowEvent = new Event("change", { bubbles: true, composed: true });
    this.renderRoot.dispatchEvent(composedShadowEvent);
  }

  render() {
    return html`
      <fieldset>
        <legend class="${this._hasError ? "invalid" : ""}">
          ${this.label}${this.required ? html`<em class="important">*</em>` : ""}
        </legend>
        ${this.options.map((option) => {
          const optionId = option.id || `${this.id}_${option.label.toLowerCase()}`;
          return html`
            <p>
              <input
                type="radio"
                id="${optionId}"
                name="${this.id}"
                ?checked="${this.value == option.value}"
                value="${option.value}"
                @change=${(e) => this.handleInput(e)}
                @invalid=${() => this.toggleError(true)}
                ?required=${this.required}
              />
              <label for="${optionId}">${option.label}</label>
            </p>
          `;
        })}
        <span class="invalid ${this._hasError ? "visible" : ""}">Error</span>
      </fieldset>
    `;
  }
}

customElements.define("form-radio", FormInputRadio);
