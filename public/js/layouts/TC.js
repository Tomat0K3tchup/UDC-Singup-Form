import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class TAndCLayout extends LitElement {
  static properties = {
    pkg: { type: String },
  };

  constructor() {
    super();
    this.pkg = "";
  }

  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    super.firstUpdated();
    this.pickTAndC();
  }

  pickTAndC() {
    if (this.pkg !== "goPro") return;

    this.renderRoot.querySelector("#generalRefund").classList.add("hidden");
    this.renderRoot.querySelector("#goProRefund").classList.remove("hidden");

    const $tAndC = this.renderRoot.querySelector("#tAndC");

    $tAndC.querySelectorAll(".goPro").forEach(($element) => {
      if ($element.classList.contains("hidden")) {
        $element.classList.remove("hidden");
      } else if ($element.classList.contains("visible")) {
        $element.classList.add("hidden");
      } else {
        let i18nData = $element.getAttribute("data-i18n").replace("general", "goPro");
        $element.setAttribute("data-i18n", i18nData);
      }
    });
  }

  render() {
    return html`
      <section id="generalRefund">
        <h2 data-i18n="tAndC:refund.title"></h2>
        <h3 data-i18n="tAndC:refund.courses.title"></h3>

        <p data-i18n="tAndC:refund.courses.intro"></p>
        <ul>
          <li>
            <p data-i18n="[html]tAndC:refund.courses.conditions.reservation"></p>
          </li>
          <li>
            <p data-i18n="[html]tAndC:refund.courses.conditions.1day"></p>
          </li>
          <li>
            <p data-i18n="[html]tAndC:refund.courses.conditions.2days"></p>
          </li>
          <li>
            <p data-i18n="[html]tAndC:refund.courses.conditions.3days"></p>
          </li>
        </ul>

        <h3 data-i18n="tAndC:refund.room.title"></h3>
        <p data-i18n="tAndC:refund.room.description"></p>

        <h3 data-i18n="tAndC:refund.funDives.title"></h3>
        <p data-i18n="tAndC:refund.funDives.description"></p>
      </section>

      <section class="hidden" id="goProRefund">
        <h2 data-i18n="tAndC:refund.goPro.title"></h2>

        <ul>
          <li>
            <p data-i18n="[html]tAndC:refund.goPro.noRefund"></p>
          </li>
          <li>
            <p data-i18n="[html]tAndC:refund.goPro.travelInsurance"></p>
          </li>
          <li>
            <p data-i18n="[html]tAndC:refund.goPro.equipmentPurchase"></p>
          </li>
          <li>
            <p data-i18n="[html]tAndC:refund.goPro.diveInsurance"></p>
          </li>
        </ul>
      </section>

      <section id="tAndC">
        <h2 data-i18n="tAndC:tc.title"></h2>
        <ol class="tAndCList">
          <li><p data-i18n="tAndC:tc.rules.reefTax"></p></li>
          <li>
            <div>
              <p data-i18n="tAndC:tc.rules.depthLimits.description"></p>
              <ul>
                <li>
                  <p data-i18n="[html]tAndC:tc.rules.depthLimits.extra.ow"></p>
                </li>
                <li>
                  <p data-i18n="[html]tAndC:tc.rules.depthLimits.extra.aow"></p>
                </li>
                <li>
                  <p data-i18n="[html]tAndC:tc.rules.depthLimits.extra.dm"></p>
                </li>
                <li>
                  <p data-i18n="[html]tAndC:tc.rules.depthLimits.extra.deep"></p>
                </li>
              </ul>
              <p data-i18n="tAndC:tc.rules.depthLimits.note"></p>
            </div>
          </li>
          <li>
            <div>
              <p data-i18n="tAndC:tc.rules.tuneUp.description"></p>
              <ul>
                <li>
                  <p data-i18n="[html]tAndC:tc.rules.tuneUp.extra.20"></p>
                </li>
                <li>
                  <p data-i18n="[html]tAndC:tc.rules.tuneUp.extra.50"></p>
                </li>
                <li>
                  <p data-i18n="[html]tAndC:tc.rules.tuneUp.extra.100"></p>
                </li>
              </ul>
            </div>
          </li>
          <li><p data-i18n="tAndC:tc.rules.drugsOrAlcohol"></p></li>
          <li><p data-i18n="tAndC:tc.rules.reefItems"></p></li>
          <li>
            <div>
              <p data-i18n="tAndC:tc.rules.largeGameEncounter.description"></p>
              <ul>
                <li>
                  <p data-i18n="[html]tAndC:tc.rules.largeGameEncounter.extra.whaleSharks"></p>
                </li>
                <li>
                  <p data-i18n="[html]tAndC:tc.rules.largeGameEncounter.extra.dolphins"></p>
                </li>
              </ul>
            </div>
          </li>
          <li><p data-i18n="tAndC:tc.rules.liability"></p></li>
          <li><p data-i18n="tAndC:tc.rules.personalItems"></p></li>
          <li><p data-i18n="tAndC:tc.rules.diveEquipment"></p></li>
          <li class="goPro visible"><p data-i18n="tAndC:tc.rules.gearIncluded"></p></li>
          <li><p class="goPro" data-i18n="tAndC:tc.rules.equipmentForCourses.general"></p></li>
          <li><p class="goPro" data-i18n="tAndC:tc.rules.responsibilityForGear.general"></p></li>
          <li><p data-i18n="tAndC:tc.rules.floodedRegulator"></p></li>
          <li><p data-i18n="tAndC:tc.rules.tablet"></p></li>
          <li><p data-i18n="tAndC:tc.rules.courseDelays"></p></li>
          <li class="goPro visible"><p data-i18n="tAndC:tc.rules.nbTanks"></p></li>
          <li class="goPro visible"><p data-i18n="tAndC:tc.rules.reimbursement"></p></li>
          <li class="goPro hidden"><p data-i18n="tAndC:tc.rules.FFD4Life"></p></li>
          <li class="goPro hidden"><p data-i18n="tAndC:tc.rules.goProRoom"></p></li>
          <li><p data-i18n="tAndC:tc.rules.makeUp"></p></li>
          <li><p class="goPro" data-i18n="tAndC:tc.rules.reschedule.general"></p></li>
          <li><p class="goPro" data-i18n="tAndC:tc.rules.paymentUponArrival.general"></p></li>
          <li><p data-i18n="tAndC:tc.rules.cardFees"></p></li>
          <li><p data-i18n="tAndC:tc.rules.dormNights"></p></li>
          <li class="goPro hidden"><p data-i18n="tAndC:tc.rules.goPro"></p></li>
          <li><p data-i18n="tAndC:tc.rules.photos"></p></li>
        </ol>
      </section>
    `;
  }
}
customElements.define("tc-layout", TAndCLayout);
