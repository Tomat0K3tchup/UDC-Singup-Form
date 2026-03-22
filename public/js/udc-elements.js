// ─── udc-phone ───
class UdcPhone extends HTMLElement {
  connectedCallback() {
    this._iti = window.intlTelInput(this.querySelector("input[type=tel]"), {
      initialCountry: "auto",
      preferredCountries: ["us", "ca", "uk", "fr", "de", "hn", "nl", "be", "ch"],
      geoIpLookup: (cb) => {
        const lang = navigator.languages ? navigator.languages[0] : navigator.language;
        if (!lang) return cb("us");
        try {
          cb(lang.split("-")[1].toLowerCase());
        } catch (_) {
          cb(lang);
        }
      },
      formatAsYouType: true,
    });
  }

  get value() {
    return this._iti ? this._iti.getNumber() : "";
  }
}

customElements.define("udc-phone", UdcPhone);

// ─── udc-file-input ───
class UdcFileInput extends HTMLElement {
  connectedCallback() {
    this._value = "";
    const fileInput = this.querySelector("input[type=file]");
    const display = this.querySelector(".fileDisplay");

    display.addEventListener("click", () => fileInput.click());

    fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      if (!file) return;
      display.textContent = file.name;
      const reader = new FileReader();
      reader.onload = (ev) => {
        this._value = ev.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  get value() {
    return this._value;
  }
}

customElements.define("udc-file-input", UdcFileInput);

// ─── udc-country-select ───
const COUNTRIES = [
  { group: "Suggestions", items: [] },
  {
    group: "Africa",
    items: [
      ["DZ", "Algeria"],
      ["AO", "Angola"],
      ["BJ", "Benin"],
      ["BW", "Botswana"],
      ["BF", "Burkina Faso"],
      ["BI", "Burundi"],
      ["CM", "Cameroon"],
      ["CV", "Cape Verde"],
      ["CF", "Central African Republic"],
      ["TD", "Chad"],
      ["KM", "Comoros"],
      ["CG", "Congo - Brazzaville"],
      ["CD", "Congo - Kinshasa"],
      ["CI", "Cote d'Ivoire"],
      ["DJ", "Djibouti"],
      ["EG", "Egypt"],
      ["GQ", "Equatorial Guinea"],
      ["ER", "Eritrea"],
      ["ET", "Ethiopia"],
      ["GA", "Gabon"],
      ["GM", "Gambia"],
      ["GH", "Ghana"],
      ["GN", "Guinea"],
      ["GW", "Guinea-Bissau"],
      ["KE", "Kenya"],
      ["LS", "Lesotho"],
      ["LR", "Liberia"],
      ["LY", "Libya"],
      ["MG", "Madagascar"],
      ["MW", "Malawi"],
      ["ML", "Mali"],
      ["MR", "Mauritania"],
      ["MU", "Mauritius"],
      ["YT", "Mayotte"],
      ["MA", "Morocco"],
      ["MZ", "Mozambique"],
      ["NA", "Namibia"],
      ["NE", "Niger"],
      ["NG", "Nigeria"],
      ["RW", "Rwanda"],
      ["RE", "Reunion"],
      ["SH", "Saint Helena"],
      ["SN", "Senegal"],
      ["SC", "Seychelles"],
      ["SL", "Sierra Leone"],
      ["SO", "Somalia"],
      ["ZA", "South Africa"],
      ["SD", "Sudan"],
      ["SZ", "Swaziland"],
      ["ST", "Sao Tome and Principe"],
      ["TZ", "Tanzania"],
      ["TG", "Togo"],
      ["TN", "Tunisia"],
      ["UG", "Uganda"],
      ["EH", "Western Sahara"],
      ["ZM", "Zambia"],
      ["ZW", "Zimbabwe"],
    ],
  },
  {
    group: "Americas",
    items: [
      ["AI", "Anguilla"],
      ["AG", "Antigua and Barbuda"],
      ["AR", "Argentina"],
      ["AW", "Aruba"],
      ["BS", "Bahamas"],
      ["BB", "Barbados"],
      ["BZ", "Belize"],
      ["BM", "Bermuda"],
      ["BO", "Bolivia"],
      ["BR", "Brazil"],
      ["VG", "British Virgin Islands"],
      ["CA", "Canada"],
      ["KY", "Cayman Islands"],
      ["CL", "Chile"],
      ["CO", "Colombia"],
      ["CR", "Costa Rica"],
      ["CU", "Cuba"],
      ["DM", "Dominica"],
      ["DO", "Dominican Republic"],
      ["EC", "Ecuador"],
      ["SV", "El Salvador"],
      ["FK", "Falkland Islands"],
      ["GF", "French Guiana"],
      ["GL", "Greenland"],
      ["GD", "Grenada"],
      ["GP", "Guadeloupe"],
      ["GT", "Guatemala"],
      ["GY", "Guyana"],
      ["HT", "Haiti"],
      ["HN", "Honduras"],
      ["JM", "Jamaica"],
      ["MQ", "Martinique"],
      ["MX", "Mexico"],
      ["MS", "Montserrat"],
      ["AN", "Netherlands Antilles"],
      ["NI", "Nicaragua"],
      ["PA", "Panama"],
      ["PY", "Paraguay"],
      ["PE", "Peru"],
      ["PR", "Puerto Rico"],
      ["BL", "Saint Barthelemy"],
      ["KN", "Saint Kitts and Nevis"],
      ["LC", "Saint Lucia"],
      ["MF", "Saint Martin"],
      ["PM", "Saint Pierre and Miquelon"],
      ["VC", "Saint Vincent and the Grenadines"],
      ["SR", "Suriname"],
      ["TT", "Trinidad and Tobago"],
      ["TC", "Turks and Caicos Islands"],
      ["VI", "U.S. Virgin Islands"],
      ["US", "United States"],
      ["UY", "Uruguay"],
      ["VE", "Venezuela"],
    ],
  },
  {
    group: "Asia",
    items: [
      ["AF", "Afghanistan"],
      ["AM", "Armenia"],
      ["AZ", "Azerbaijan"],
      ["BH", "Bahrain"],
      ["BD", "Bangladesh"],
      ["BT", "Bhutan"],
      ["BN", "Brunei"],
      ["KH", "Cambodia"],
      ["CN", "China"],
      ["GE", "Georgia"],
      ["HK", "Hong Kong SAR China"],
      ["IN", "India"],
      ["ID", "Indonesia"],
      ["IR", "Iran"],
      ["IQ", "Iraq"],
      ["IL", "Israel"],
      ["JP", "Japan"],
      ["JO", "Jordan"],
      ["KZ", "Kazakhstan"],
      ["KW", "Kuwait"],
      ["KG", "Kyrgyzstan"],
      ["LA", "Laos"],
      ["LB", "Lebanon"],
      ["MO", "Macau SAR China"],
      ["MY", "Malaysia"],
      ["MV", "Maldives"],
      ["MN", "Mongolia"],
      ["MM", "Myanmar"],
      ["NP", "Nepal"],
      ["KP", "North Korea"],
      ["OM", "Oman"],
      ["PK", "Pakistan"],
      ["PS", "Palestinian Territories"],
      ["PH", "Philippines"],
      ["QA", "Qatar"],
      ["SA", "Saudi Arabia"],
      ["SG", "Singapore"],
      ["KR", "South Korea"],
      ["LK", "Sri Lanka"],
      ["SY", "Syria"],
      ["TW", "Taiwan"],
      ["TJ", "Tajikistan"],
      ["TH", "Thailand"],
      ["TL", "Timor-Leste"],
      ["TR", "Turkey"],
      ["TM", "Turkmenistan"],
      ["AE", "United Arab Emirates"],
      ["UZ", "Uzbekistan"],
      ["VN", "Vietnam"],
      ["YE", "Yemen"],
    ],
  },
  {
    group: "Europe",
    items: [
      ["AL", "Albania"],
      ["AD", "Andorra"],
      ["AT", "Austria"],
      ["BY", "Belarus"],
      ["BE", "Belgium"],
      ["BA", "Bosnia and Herzegovina"],
      ["BG", "Bulgaria"],
      ["HR", "Croatia"],
      ["CY", "Cyprus"],
      ["CZ", "Czech Republic"],
      ["DK", "Denmark"],
      ["EE", "Estonia"],
      ["FO", "Faroe Islands"],
      ["FI", "Finland"],
      ["FR", "France"],
      ["DE", "Germany"],
      ["GI", "Gibraltar"],
      ["GR", "Greece"],
      ["GG", "Guernsey"],
      ["HU", "Hungary"],
      ["IS", "Iceland"],
      ["IE", "Ireland"],
      ["IM", "Isle of Man"],
      ["IT", "Italy"],
      ["JE", "Jersey"],
      ["LV", "Latvia"],
      ["LI", "Liechtenstein"],
      ["LT", "Lithuania"],
      ["LU", "Luxembourg"],
      ["MK", "Macedonia"],
      ["MT", "Malta"],
      ["MD", "Moldova"],
      ["MC", "Monaco"],
      ["ME", "Montenegro"],
      ["NL", "Netherlands"],
      ["NO", "Norway"],
      ["PL", "Poland"],
      ["PT", "Portugal"],
      ["RO", "Romania"],
      ["RU", "Russia"],
      ["SM", "San Marino"],
      ["RS", "Serbia"],
      ["SK", "Slovakia"],
      ["SI", "Slovenia"],
      ["ES", "Spain"],
      ["SJ", "Svalbard and Jan Mayen"],
      ["SE", "Sweden"],
      ["CH", "Switzerland"],
      ["UA", "Ukraine"],
      ["GB", "United Kingdom"],
      ["VA", "Vatican City"],
      ["AX", "Aland Islands"],
    ],
  },
  {
    group: "Oceania",
    items: [
      ["AS", "American Samoa"],
      ["AQ", "Antarctica"],
      ["AU", "Australia"],
      ["BV", "Bouvet Island"],
      ["IO", "British Indian Ocean Territory"],
      ["CX", "Christmas Island"],
      ["CC", "Cocos Islands"],
      ["CK", "Cook Islands"],
      ["FJ", "Fiji"],
      ["PF", "French Polynesia"],
      ["TF", "French Southern Territories"],
      ["GU", "Guam"],
      ["HM", "Heard Island and McDonald Islands"],
      ["KI", "Kiribati"],
      ["MH", "Marshall Islands"],
      ["FM", "Micronesia"],
      ["NR", "Nauru"],
      ["NC", "New Caledonia"],
      ["NZ", "New Zealand"],
      ["NU", "Niue"],
      ["NF", "Norfolk Island"],
      ["MP", "Northern Mariana Islands"],
      ["PW", "Palau"],
      ["PG", "Papua New Guinea"],
      ["PN", "Pitcairn Islands"],
      ["WS", "Samoa"],
      ["SB", "Solomon Islands"],
      ["GS", "South Georgia and the South Sandwich Islands"],
      ["TK", "Tokelau"],
      ["TO", "Tonga"],
      ["TV", "Tuvalu"],
      ["UM", "U.S. Minor Outlying Islands"],
      ["VU", "Vanuatu"],
      ["WF", "Wallis and Futuna"],
    ],
  },
];

class UdcCountrySelect extends HTMLElement {
  connectedCallback() {
    const select = this.querySelector("select");

    COUNTRIES.forEach((g) => {
      const optgroup = document.createElement("optgroup");
      optgroup.label = g.group;
      g.items.forEach(([code, name]) => {
        const opt = document.createElement("option");
        opt.value = code;
        opt.textContent = name;
        optgroup.appendChild(opt);
      });
      select.appendChild(optgroup);
    });

    this._tom = new TomSelect(select, {
      sortField: { field: "text", direction: "asc" },
      lockOptgroupOrder: true,
      maxOptions: null,
      onInitialize() {
        const preferred = ["US", "CA", "GB", "FR", "DE", "HN", "NL", "BE", "CH"];
        preferred.forEach((key) => {
          const opt = this.options[key];
          if (opt) this.options[key] = { ...opt, optgroup: "Suggestions" };
        });

        const langCode = navigator.languages ? navigator.languages[0] : navigator.language;
        if (langCode) {
          try {
            const country = langCode.split("-")[1];
            if (country) this.addItem(country, false);
          } catch (_) {}
        }
      },
    });
  }

  get value() {
    return this._tom ? this._tom.getValue() : "";
  }
}

customElements.define("udc-country-select", UdcCountrySelect);
