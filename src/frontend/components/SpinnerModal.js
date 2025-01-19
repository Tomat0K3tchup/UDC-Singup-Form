import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class Spinner extends LitElement {
  static styles = css`
    .bg {
      background: #7773;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
    }

    .loader {
      width: 2rem;
      padding: 0.4rem;
      aspect-ratio: 1;
      border-radius: 50%;
      background: var(--main-bg-color);
      --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
      -webkit-mask: var(--_m);
      mask: var(--_m);
      -webkit-mask-composite: source-out;
      mask-composite: subtract;
      animation: l3 1s infinite linear;
    }
    @keyframes l3 {
      to {
        transform: rotate(1turn);
      }
    }
  `;

  static properties = {
    hidden: { type: Boolean },
  };

  constructor() {
    super();
    this.hidden = false;
  }

  firstUpdated() {
    super.firstUpdated();
    this.$container = this.renderRoot.querySelector(".bg");

    console.log(this.$container);
    this.toggle();
  }

  toggle() {
    this.hidden = !this.hidden;
    this.$container.style.display = this.hidden ? "none" : "flex";
  }

  render() {
    return html`
      <div class="bg">
        <div class="loader"></div>
      </div>
    `;
  }
}

customElements.define("spinner-modal", Spinner);
