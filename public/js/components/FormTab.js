import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class MultiStepForm extends LitElement {
  static formAssociated = true;
  _internals;

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem 10% 2rem 10%;
    }

    button {
      flex-grow: 0;
      font-size: 1rem;
      font-weight: 700;
      font-family: Montserrat, sans-serif;
      text-transform: uppercase;
      border-radius: var(--border-radius);
      border: 2px solid var(--dark-blue);
      padding: 0.5rem;
    }

    button.primary {
      background-color: var(--dark-blue);
      color: var(--main-accent-color);
    }

    button.secondary {
      background-color: #fff;
      color: var(--dark-blue);
    }

    button:focus {
      outline: -webkit-focus-ring-color auto 1px;
      outline-offset: 4px;
    }

    div {
      display: flex;
      justify-content: space-between;
      margin: 2rem 0 0 0;
      width: 100%;
      position: relative;
    }

    p {
      position: absolute; /* Removes the text from the normal flow */
      left: 50%; /* Positions the text horizontally in the middle */
      transform: translateX(-50%); /* Adjusts for the text's width to truly center it */
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._internals = this.attachInternals();
    if (!this._internals) {
      console.error("ElementInternals could not be attached.");
    }
  }

  firstUpdated() {
    super.firstUpdated();

    // Here we are selecting slotted fieldset, hence no renderRoot
    this.$sets = this.querySelectorAll("fieldset.formStep");
    this.totalSets = this.$sets.length;

    this.renderRoot.querySelector("#mf-total").innerText = this.totalSets ?? "?";
    this.current = 0;

    this.$nextBtn = this.renderRoot.querySelector("#mf-next-btn");
    this.$prevBtn = this.renderRoot.querySelector("#mf-prev-btn");
    this.$currentSetNum = this.renderRoot.querySelector("#mf-current");

    this.$sets.forEach((s) => {
      s.style.display = "none";
    });
    this.updateDisplay();
    this.dispatchActivatedEvent();
  }

  checkValidity() {
    const elToValidate = this.$sets[this.current].elements;

    let isValid = true;
    for (let i = 0; i < elToValidate.length; i++) {
      isValid = elToValidate[i].checkValidity() && isValid;
    }

    return isValid;
  }

  dispatchActivatedEvent() {
    const activatedEvent = new CustomEvent("activated", {
      bubbles: true,
      composed: true,
      detail: "Triggered when a new .formStep is activated by the multi-form-step wizard",
    });
    this.$sets[this.current].dispatchEvent(activatedEvent);
  }

  nextSet() {
    if (!this.checkValidity()) return;
    if (this.current + 1 == this.totalSets) return this._internals.form.requestSubmit();
    this.current++;
    this.updateDisplay();
    this.dispatchActivatedEvent();
  }

  prevSet() {
    if (this.current == 0) return;
    this.current--;
    this.updateDisplay();
    this.dispatchActivatedEvent();
  }

  updateDisplay() {
    const prevBtnDisplay = this.current == 0 ? "hidden" : "visible";
    this.$prevBtn.style.visibility = prevBtnDisplay;

    this.$sets.forEach(($set, idx) => {
      if (idx === this.current) {
        $set.style.display = "flex";
      } else $set.style.display = "none";
    });
    this.$currentSetNum.innerText = this.current + 1;

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  render() {
    return html`
      <slot></slot>
      <div>
        <button data-i18n="test" id="mf-prev-btn" class="secondary" @click=${this.prevSet}>
          ${$.t("wizard.prev")}
        </button>
        <p>
          <span id="mf-current" data-i18n="test"></span> ${$.t("wizard.xStepsOfTotal")}
          <span id="mf-total">${this.totalSets}</span>
        </p>
        <button data-i18n="test" id="mf-next-btn" class="primary" @click=${this.nextSet}>
          ${this.current == this.totalSets - 1 ? $.t("wizard.submit") : $.t("wizard.next")}
        </button>
      </div>
    `;
  }
}

customElements.define("multi-step-form", MultiStepForm);
