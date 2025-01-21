import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class SuccessFailureDisplay extends LitElement {
  static styles = css`
    /* Same as formInput class */
    div {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 80vh;
      align-items: center;
      justify-content: center;
    }

    svg {
      height: 10rem;
      width: 10rem;
      margin-bottom: 1rem;
    }

    span {
      font-size: 1.2rem;
      font-weight: bold;
      text-align: center;
    }
  `;

  static properties = {
    success: { type: Boolean },
  };

  constructor() {
    super();
    this.success = true;
    this.visible = true;
  }

  firstUpdated() {
    super.firstUpdated();
    this.$container = this.renderRoot.querySelector("div");
    this.toggleVisibility();
  }

  toggleVisibility() {
    console.log("toggle visibility");
    this.visible = !this.visible;
    this.$container.style.display = this.visible ? "flex" : "none";
  }

  render() {
    return html`
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path
            fill="#FFD43B"
            d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
          />
        </svg>
        <span>
          Thank you for completing the check-in form.<br />
          Please go to the reception desk to finalize the process.
        </span>
      </div>
    `;
  }
}

customElements.define("success-failure-display", SuccessFailureDisplay);
