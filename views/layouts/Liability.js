import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class LiabilityLayout extends LitElement {
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
    if (window.urlParams.pkg) {
      this.pkg = window.urlParams.pkg;
    }
    this.pickLiability();
  }

  pickLiability() {
    if (this.pkg == "fd") return;

    document
      .querySelector(".coned")
      .setAttribute("data-i18n", "[html]liability:nonAgency.padiLiability.courses");

    const $courseLiability = document.getElementById("courseLiability");
    $courseLiability.classList.remove("hidden");
    document.getElementById("generalLiability").classList.add("hidden");

    if (this.pkg == "ow") return;

    $courseLiability.querySelectorAll(".coned").forEach(($p) => {
      if ($p.classList.contains("hidden")) {
        $p.classList.remove("hidden");
      } else {
        let i18nData = $p.getAttribute("data-i18n").replace("ow", "conEd");
        $p.setAttribute("data-i18n", i18nData);
      }
    });
  }

  render() {
    return html`
      <p data-i18n="liability:intro"></p>

      <section>
        <h3 data-i18n="liability:nonAgency.title"></h3>

        <p data-i18n="[html]liability:nonAgency.nonPadi"></p>
        <p data-i18n="liability:nonAgency.franchise"></p>
        <p class="coned" data-i18n="liability:nonAgency.padiLiability.general"></p>
      </section>

      <section id="generalLiability">
        <h3 data-i18n="liability:riskAgreement.title"></h3>

        <p data-i18n="[html]liability:riskAgreement.knowledgeRisk"></p>
        <p data-i18n="[html]liability:riskAgreement.dcsRisk"></p>
        <p data-i18n="[html]liability:riskAgreement.boatRisk"></p>
        <p data-i18n="[html]liability:riskAgreement.udcLiability"></p>
        <p data-i18n="[html]liability:riskAgreement.goodHealth"></p>
        <p data-i18n="[html]liability:riskAgreement.divePractices"></p>
        <p data-i18n="[html]liability:riskAgreement.boatDiving"></p>
        <p data-i18n="[html]liability:riskAgreement.refresher"></p>
        <p data-i18n="[html]liability:riskAgreement.staffLiability"></p>
        <p data-i18n="[html]liability:riskAgreement.gearLiability"></p>
        <p data-i18n="[html]liability:riskAgreement.rescue"></p>
        <p data-i18n="[html]liability:riskAgreement.validityPeriod"></p>
        <p data-i18n="[html]liability:riskAgreement.lawfulAge"></p>
        <p data-i18n="[html]liability:riskAgreement.legalStatement"></p>
        <p data-i18n="[html]liability:riskAgreement.fullyInformed"></p>
      </section>

      <section id="courseLiability" class="hidden">
        <h3 data-i18n="liability:riskAgreement.title"></h3>

        <p data-i18n="[html]liability:courses.ow.knowledgeRisk"></p>
        <p data-i18n="[html]liability:courses.ow.dcsRisk"></p>
        <p data-i18n="[html]liability:courses.ow.boatRisk"></p>
        <p class="coned hidden" data-i18n="[html]liability:courses.conEd.allTraining"></p>
        <p class="coned" data-i18n="[html]liability:courses.ow.udcLiability"></p>
        <p data-i18n="[html]liability:courses.ow.personalRisk"></p>
        <p class="coned" data-i18n="[html]liability:courses.ow.staffLiability"></p>
        <p class="coned hidden" data-i18n="[html]liability:courses.conEd.medicalCondition"></p>
        <p data-i18n="[html]liability:courses.ow.divingRisk"></p>
        <p data-i18n="[html]liability:courses.ow.lawfulAge"></p>
        <p class="coned hidden" data-i18n="[html]liability:courses.conEd.validityPeriod"></p>
        <p data-i18n="[html]liability:courses.ow.liabilityWaiver"></p>
        <p class="coned hidden" data-i18n="[html]liability:courses.conEd.completedMedical"></p>
        <p class="coned" data-i18n="[html]liability:courses.ow.legalStatement"></p>
        <p data-i18n="[html]liability:courses.ow.fullyInformed"></p>
      </section>
    `;
  }
}
customElements.define("liability-layout", LiabilityLayout);
