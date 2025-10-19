const MEDICAL_FORM_TO_PDF_MAP = {
  id: "1FN5e_z_5bvIqXuaU1ho08awKCL9AGQ8m",
  title: "Medical Form",
  form: {
    q1: { true: "Yes", false: "No" },
    q2: { true: "Yes_2", false: "No_2" },
    q3: { true: "Yes_3", false: "No_3" },
    q4: { true: "Yes_4", false: "No_4" },
    q5: { true: "Yes_5", false: "No_5" },
    q6: { true: "Yes_6", false: "No_6" },
    q7: { true: "Si", false: "No_7" },
    q8: { true: "Yes_7", false: "No_8" },
    q9: { true: "Yes_8", false: "No_9" },
    q10: { true: "Yes_9", false: "No_10" },
    qA_1: { true: "Yes_10", false: "No_11" },
    qA_2: { true: "Yes_11", false: "No_12" },
    qA_3: { true: "Yes_12", false: "No_13" },
    qA_4: { true: "Yes_13", false: "No_14" },
    qA_5: { true: "Yes_14", false: "No_15" },
    qB_1: { true: "undefined", false: "undefined_2" },
    qB_2: { true: "Yes_16", false: "No_17" },
    qB_3: { true: "Yes_17", false: "No_18" },
    qB_4: { true: "Yes_18", false: "No_19" },
    qC_1: { true: "Yes_19", false: "No_20" },
    qC_2: { true: "Yes_20", false: "No_21" },
    qC_3: { true: "Yes_21", false: "No_22" },
    qC_4: { true: "Yes_22", false: "No_23" },
    qD_1: { true: "undefined_3", false: "undefined_4" },
    qD_2: { true: "Yes_24", false: "No_25" },
    qD_3: { true: "Yes_25", false: "No_26" },
    qD_4: { true: "Yes_26", false: "No_27" },
    qD_5: { true: "Yes_27", false: "No_28" },
    qE_1: { true: "Yes_28", false: "No_29" },
    qE_2: { true: "Yes_29", false: "No_30" },
    qE_3: { true: "Yes_30", false: "No_31" },
    qE_4: { true: "Yes_31", false: "No_32" },
    qF_1: { true: "Yes_32", false: "No_33" },
    qF_2: { true: "Yes_33", false: "No_34" },
    qF_3: { true: "Yes_34", false: "No_35" },
    qF_4: { true: "Yes_35", false: "No_36" },
    qF_5: { true: "Yes_36", false: "No_37" },
    qG_1: { true: "Yes_37", false: "No_38" },
    qG_2: { true: "Yes_38", false: "No_39" },
    qG_3: { true: "Yes_39", false: "No_40" },
    qG_4: { true: "Yes_40", false: "No_41" },
    qG_5: { true: "Yes_41", false: "No_42" },
    qG_6: { true: "Yes_42", false: "No_43" },
    participantName: ["Participant Name Print", "Participant Name", "Participant Name2"],
    shop: "Facility Name Print",
    dob: ["Birthdate ddmmyyyy", "Birthdate", "Birthdate2"],
    date: "Date ddmmyyyy",
  },
  signature: {
    page: 0,
    X: 0.23,
    Y: 0.205,
  },
};

const MAP_SIGN = {
  CONED: {
    page: 1,
    X: 0.28,
    Y: 0.085,
    GUARDIAN: {
      X: 0.28,
      Y: 0.045,
    },
  },
};

const LIABILITY_FORM_TO_PDF_MAP = {
  en: EN_LIABILITY_FORM_TO_PDF_MAP,
  es: ES_LIABILITY_FORM_TO_PDF_MAP,
};

const EN_LIABILITY_FORM_TO_PDF_MAP = {
  id: "1CSRdWSEvVDd62O0gcbAqlxQklw1_NpH2",
  title: "Liability Release",
  form: {
    shop: "Store/Resort Name",
    participantName: ["Diver Name", "Diver Name 2"],
    date: "Date DayMonthYear",
    dateMinor: "Date DayMonthYear_2",
    di_yesNo: "No/Yes",
    di_policyNb: "Policy Number",
  },
  signature: {
    page: 1,
    X: 0.275,
    Y: 0.295,
    GUARDIAN: {
      X: 0.275,
      Y: 0.255,
    },
  },
};

const ES_LIABILITY_FORM_TO_PDF_MAP = {
  id: "14WWnmZ2NQ8-vUf-soi-OI9naOE6sL4ml",
  title: "Contrato de Descargo de Responsabilidad",
  form: {
    shop: ["Instalación o embarcación", "Instalación o embarcación_2"],
    participantName: ["Nombre del buceador", "Nombre del buceador_2"],
    date: "Fecha díamesaño",
    dateMinor: "Fecha díamesaño_2",
    di_yesNo: {
      false: "Check Box7",
      true: "Check Box8",
    },
    di_policyNb: "Números de póliza",
  },
  signature: {
    page: 0,
    X: 0.275,
    Y: 0.095,
    GUARDIAN: {
      X: 0.275,
      Y: 0.255,
    },
  },
};
