import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class SafeDivingLayout extends LitElement {
  createRenderRoot() {
    return this;
  }
  render() {
    return html`
      <section>
        <p data-i18n="safeDiving:intro"></p>

        <p data-i18n="safeDiving:description"></p>
        <p data-i18n="[html]safeDiving:agreement"></p>

        <ol>
          <li><p data-i18n="[html]safeDiving:rules.goodHealth"></p></li>
          <li><p data-i18n="[html]safeDiving:rules.diveOrientation"></p></li>
          <li><p data-i18n="[html]safeDiving:rules.properGear"></p></li>
          <li><p data-i18n="[html]safeDiving:rules.diveBriefing"></p></li>
          <li><p data-i18n="[html]safeDiving:rules.buddySystem"></p></li>
          <li><p data-i18n="[html]safeDiving:rules.planDive"></p></li>
          <li><p data-i18n="[html]safeDiving:rules.maintainBuoyancy"></p></li>
          <li><p data-i18n="[html]safeDiving:rules.properBreathing"></p></li>
          <li><p data-i18n="[html]safeDiving:rules.boat"></p></li>
          <li><p data-i18n="[html]safeDiving:rules.localRegulations"></p></li>
        </ol>

        <p data-i18n="safeDiving:understandStatement"></p>
      </section>
    `;
  }
}
customElements.define("safe-diving-layout", SafeDivingLayout);
