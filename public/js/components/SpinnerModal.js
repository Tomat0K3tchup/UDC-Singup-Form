import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class Spinner extends LitElement {
  static styles = css`
    .bg {
      background: #000a;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
    }

    .loader {
      width: 2rem;
      padding: 0.6rem;
      aspect-ratio: 1;
      border-radius: 50%;
      background: var(--main-accent-color);
      --_m: conic-gradient(#0000 0%, #000), linear-gradient(#000 0 0) content-box;
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
    this.hidden = true;
  }

  firstUpdated() {
    super.firstUpdated();
    this.$container = this.renderRoot.querySelector(".bg");
    // Initialize display state without toggling
    // this.$container.style.display = this.hidden ? "none" : "flex";
  }

  disableScroll() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;

    window.onscroll = () => {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0;
    };
  }

  enableScroll() {
    window.onscroll = function () {};
  }

  toggle(force = undefined) {
    this.hidden = force !== undefined ? !force : !this.hidden;
    this.$container.style.display = this.hidden ? "none" : "flex";

    if (!this.hidden) {
      this.disableScroll();
    } else {
      this.enableScroll();
    }
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
