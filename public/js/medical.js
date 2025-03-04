const MAP_Q_TO_BOXES = {
  q1: "boxA",
  q2: "boxB",
  q4: "boxC",
  q6: "boxD",
  q7: "boxE",
  q8: "boxF",
  q9: "boxG",
};

function activateSecondaryBoxes(event) {
  const qId = event.target.id;

  if (qId in MAP_Q_TO_BOXES) {
    const box = document.getElementById(MAP_Q_TO_BOXES[qId]);
    const value = event.target.value == "true";
    box.classList.toggle("visible", value);
    box.querySelectorAll("form-radio").forEach(($radio) => {
      $radio.required = value;
    });
  }
}

window.addEventListener("change", activateSecondaryBoxes);

const $multiStepForm = document.querySelector("multi-step-form");

$multiStepForm.addEventListener("activated", function (event) {
  if (event.target.id == "secondaryQStep" && !needSecondary()) {
    $multiStepForm.nextSet();
  } else if (event.target == "signatureStep") {
    displayMedicalResult(needMedical());
  }
});

function needSecondary() {
  return document.getElementsByClassName("visible").length > 0;
}

const NEED_MEDICAL_REGEX = /q[A-Z]|q(?:3|5|10)/;
function needMedical() {
  const formData = Object.fromEntries(new FormData(document.forms.item(0)));
  return Object.keys(formData).some((key) => key.match(NEED_MEDICAL_REGEX) && formData[key] === "true");
}

function displayMedicalResult(customerNeedMedical) {
  const listP = document.querySelectorAll("[data-need-medical]");

  listP.forEach(($p) => {
    const needDisplayOnMedical = $p.dataset.needMedical === "true";
    $p.style.display = customerNeedMedical === needDisplayOnMedical ? "block" : "none";
  });
}
