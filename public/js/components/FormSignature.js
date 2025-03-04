import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import SignaturePad from "https://cdn.jsdelivr.net/npm/signature_pad@5.0.4/+esm";
import { FormInput } from "./FormInput.js";

export class FormSignature extends FormInput {
  static styles = [
    FormInput.styles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        width: 50%;
      }

      @media (max-width: 700px) {
        :host {
          width: 100%;
        }
      }

      .sigWrapper {
        height: 5rem;
        padding: 0;
      }

      canvas {
        width: 100%;
        height: 100%;
      }

      .sigNav {
        display: flex;
        flex-direction: row;
        justify-content: end;
      }

      button {
        border: none;
        color: var(--main-bg-color);
        font-weight: bold;
        background-color: #fff0;
        text-decoration: underline;
      }
    `,
  ];

  firstUpdated() {
    super.firstUpdated();
    this.$canvas = this.shadowRoot.querySelector("canvas");

    this.signaturePad = new SignaturePad(this.$canvas, {
      penColor: "#145394",
    });

    this._resizeObserver = new ResizeObserver(() => this.resizeCanvas());
    this._resizeObserver.observe(this.parentElement); // Observe the parent container

    this.signaturePad.addEventListener("endStroke", () => this.handleInput());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver.disconnect(); // Clean up observer
  }

  updateValue() {
    this.value = this.signaturePad.toDataURL();
  }

  resizeCanvas() {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const [newWidth, newHeight] = [this.$canvas.offsetWidth * ratio, this.$canvas.offsetHeight * ratio];

    if (Math.abs(this.$canvas.width - newWidth) < 1 && Math.abs(this.$canvas.height - newHeight) < 1)
      return;

    this.$canvas.width = this.$canvas.offsetWidth * ratio;
    this.$canvas.height = this.$canvas.offsetHeight * ratio;
    this.$canvas.getContext("2d").scale(ratio, ratio);
    this.clear(); // otherwise isEmpty() might return incorrect value
  }

  clear() {
    this.signaturePad.clear();
    this.updateValue();
  }

  get validity() {
    const valueMissing = this.required && this.signaturePad.isEmpty();
    return { valueMissing: valueMissing, valid: !valueMissing };
  }

  checkValidity() {
    // Emulate the trigger of an invalid event on the input since a hidden input isn't handled properly
    const invalid = this.validity.valid;
    if (!invalid) this.$input.dispatchEvent(new Event("invalid"));

    return invalid;
  }

  render() {
    return html`
      <div class="sigNav">
        <button @click=${this.clear}>Clear</button>
      </div>
      <div class="sigWrapper input ${this._hasError ? "invalid" : ""}">
        <canvas></canvas>
        <input
          type="hidden"
          id="${this.id}"
          name="${this.name || this.id}"
          @invalid=${() => this.toggleError(true)}
        />
      </div>
      <span class="invalid ${this._hasError ? "visible" : ""}">Error</span>
    `;
  }
}

customElements.define("form-signature", FormSignature);
