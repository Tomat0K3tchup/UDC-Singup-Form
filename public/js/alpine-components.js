import { i18next, supportedLngs } from "/js/alpine-i18n.js";

const PREFILL_KEYS = ["first_name", "last_name", "dob", "di", "di_policy_nb", "pkg"];

document.addEventListener("alpine:init", () => {
  Alpine.data("formField", () => ({
    error: "",
    showError: false,

    validate(e) {
      const el = e.target;
      if (el.validity && el.validity.valid) {
        this.showError = false;
        return;
      }
      if (el.validity && el.validity.valueMissing) return;
      this.error = el.validationMessage;
      this.showError = true;
    },

    onInvalid(e) {
      e.preventDefault();
      const el = e.target;
      this.error = el.validationMessage || "Please fill this field";
      this.showError = true;
    },

    clearError() {
      if (this.showError) this.showError = false;
    },
  }));

  Alpine.data("udcDatePicker", () => ({
    dateValue: "",
    error: "",
    showError: false,

    init() {
      const picker = this.$el.querySelector("duet-date-picker");
      if (!picker) return;

      const self = this;

      // Expose value getter/setter for external access (prefill)
      Object.defineProperty(this.$el, "value", {
        get() {
          return self.dateValue;
        },
        set(v) {
          self.dateValue = v;
          picker.value = v;
        },
        configurable: true,
      });

      // Expose checkValidity for wizard step validation
      this.$el.checkValidity = () => {
        if (this.$el.hasAttribute("required") && !this.dateValue) {
          this.$el.dispatchEvent(new Event("invalid", { bubbles: true }));
          return false;
        }
        return true;
      };

      // Configure date adapter once Duet is ready
      const configure = () => {
        const DATE_FORMAT = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
        picker.dateAdapter = {
          parse(value, createDate) {
            const m = (value || "").match(DATE_FORMAT);
            if (m) return createDate(m[3], m[2], m[1]);
          },
          format(date) {
            return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
          },
        };
        picker.localization = { ...picker.localization, placeholder: "dd/mm/yyyy" };
      };

      picker.componentOnReady
        ? picker.componentOnReady().then(configure)
        : customElements.whenDefined("duet-date-picker").then(configure);

      this.$el.addEventListener("duetChange", (e) => {
        this.dateValue = e.detail.value;
        if (this.showError) this.showError = false;
      });
    },

    onInvalid(e) {
      e.preventDefault();
      this.error = "Please fill this field";
      this.showError = true;
    },

    clearError() {
      if (this.showError) this.showError = false;
    },
  }));

  Alpine.data("udcSignature", () => ({
    signatureValue: "",
    error: "",
    showError: false,
    _pad: null,
    _ro: null,

    init() {
      const canvas = this.$refs.canvas;
      this._pad = new SignaturePad(canvas, { penColor: "#145394" });
      this._pad.addEventListener("endStroke", () => {
        this.signatureValue = this._pad.toDataURL();
        if (this.showError) this.showError = false;
      });

      this.$el.checkValidity = () => {
        if (this.$el.hasAttribute("required") && (!this._pad || this._pad.isEmpty())) {
          this.$el.dispatchEvent(new Event("invalid", { bubbles: true }));
          return false;
        }
        return true;
      };

      this._ro = new ResizeObserver(() => {
        requestAnimationFrame(() => this._resizeCanvas());
      });
      this._ro.observe(this.$el);
    },

    destroy() {
      if (this._ro) this._ro.disconnect();
    },

    _resizeCanvas() {
      const canvas = this.$refs.canvas;
      if (!canvas) return;
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      const w = canvas.offsetWidth * ratio;
      const h = canvas.offsetHeight * ratio;
      if (Math.abs(canvas.width - w) < 1 && Math.abs(canvas.height - h) < 1) return;
      canvas.width = w;
      canvas.height = h;
      canvas.getContext("2d").scale(ratio, ratio);
      this._pad.clear();
    },

    clearSignature() {
      this._pad.clear();
      this.signatureValue = "";
    },

    onInvalid(e) {
      e.preventDefault();
      this.error = "Please fill this field";
      this.showError = true;
    },

    clearError() {
      if (this.showError) this.showError = false;
    },
  }));

  Alpine.data("udcForm", () => ({
    step: 0,
    totalSteps: 4,
    pkg: "",
    di: "",
    loading: false,
    success: false,
    supportedLngs,

    init() {
      const params = new URLSearchParams(window.location.search);
      this.pkg = params.get("pkg") || "fd";
      this.$nextTick(() => this.prefill(params));
    },

    prefill(params) {
      PREFILL_KEYS.forEach((id) => {
        const val = params.get(id);
        if (!val) return;

        if (id === "pkg") {
          this.pkg = val;
          return;
        }
        if (id === "di") {
          this.di = val;
          return;
        }

        const el = document.getElementById(id);
        if (el) el.value = val;
      });
    },

    nextStep() {
      const fieldsets = this.$root.querySelectorAll("fieldset.formStep");
      const current = fieldsets[this.step];
      if (!current) return;

      const elements = current.querySelectorAll(
        "input, select, textarea, .udcDatePicker, udc-phone, udc-country-select, udc-file-input, .udcSignature",
      );

      let valid = true;
      elements.forEach((el) => {
        if (typeof el.checkValidity === "function") {
          if (!el.checkValidity()) valid = false;
        }
      });

      if (!valid) return;

      if (this.step + 1 >= this.totalSteps) {
        this.$root.requestSubmit();
        return;
      }

      this.step++;
      window.scrollTo(0, 0);
    },

    prevStep() {
      if (this.step > 0) {
        this.step--;
        window.scrollTo(0, 0);
      }
    },

    async submitForm(e) {
      this.loading = true;

      try {
        const form = e.target;
        const payload = Object.fromEntries(new FormData(form));

        form.querySelectorAll("udc-phone").forEach((phone) => {
          if (phone.value) payload[phone.getAttribute("name")] = phone.value;
        });

        form.querySelectorAll("udc-file-input").forEach((file) => {
          if (file.value) payload[file.getAttribute("name")] = file.value;
        });

        form.querySelectorAll("udc-country-select").forEach((cs) => {
          if (cs.value) payload[cs.getAttribute("name")] = cs.value;
        });

        payload.formId = form.id;

        const body = new URLSearchParams(payload);
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbxMJBv7SQsFBsIz2emct58L-sPo_r-3MAhOmgowSQf4HiPuzkH0XZ1NCzm5__f0bU7Y/exec",
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: body.toString(),
          },
        );

        if (response.ok) {
          const urlParams = new URLSearchParams(window.location.search);
          const nextPage = urlParams.get("pathway");

          if (nextPage) {
            const newParams = new URLSearchParams(urlParams);
            newParams.delete("pathway", nextPage);
            PREFILL_KEYS.forEach((id) => {
              if (payload[id]) newParams.set(id, payload[id]);
            });
            window.location.href = nextPage + "?" + newParams.toString();
          } else {
            this.success = true;
          }
        } else {
          console.error("Error submitting form");
        }
      } catch (err) {
        console.error("Request failed", err);
      } finally {
        this.loading = false;
      }
    },

    switchLang(lng) {
      i18next.changeLanguage(lng);
    },
  }));
});
