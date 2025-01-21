import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import SignaturePad from "https://cdn.jsdelivr.net/npm/signature_pad@5.0.4/+esm";

export class FormSignature extends window.FormInput {
  static styles = [
    window.FormInput.styles,
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
        border: 1px solid var(--main-bg-color);
        border-radius: 2px;
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
    this.$canvas.width = this.$canvas.offsetWidth * ratio;
    this.$canvas.height = this.$canvas.offsetHeight * ratio;
    this.$canvas.getContext("2d").scale(ratio, ratio);
    this.signaturePad.clear(); // otherwise isEmpty() might return incorrect value
  }

  clear() {
    this.signaturePad.clear();
    this.updateValue();
  }

  // checkValidity() {
  //   if (this.signaturePad.isEmpty()) {
  //     //FIXME: error handling
  //     return alert("Please provide a signature first.");
  //   }

  //   var data = this.signaturePad.toDataURL("image/png");
  //   console.log(data);
  // }

  render() {
    return html`
      <div class="sigNav">
        <button @click=${this.clear}>Clear</button>
      </div>
      <div class="sigWrapper" @invalid=${() => this.toggleError(true)}>
        <canvas></canvas>
        <input type="hidden" id="${this.id}" name="${this.name || this.id}" />
      </div>
    `;
  }
}

customElements.define("form-signature", FormSignature);
