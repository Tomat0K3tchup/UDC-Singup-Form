window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const form = document.forms.item(0);
  if (form) form.addEventListener("submit", async (event) => handleFormSubmit(event));

  prefillForm(urlParams);
};

async function handleFormSubmit(event) {
  event.preventDefault();
  toggleSpinner(true);

  try {
    const payload = formToPayload(event.target);
    const body = new URLSearchParams(payload);

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbxXYwcBcGuOi_GCAyTJ53OprOxPeyh1eA3JoNWKt3_0wveaLtQKIfd5Wglh9RnNZV8/exec",
      {
        method: "POST",
        // cache: "no-cache",
        // credentials: "same-origin",
        // redirect: "follow",
        // referrerPolicy: "no-referrer",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      },
    );

    if (response.ok) {
      const urlParams = new URLSearchParams(window.location.search);
      let nextPage = urlParams.get("pathway");

      if (nextPage) {
        const editedParams = editUrlParams(urlParams, nextPage, payload);
        window.location.href = `${nextPage}?${editedParams.toString()}`;
      } else {
        handleLastStep();
      }
    } else {
      console.error("Error submitting form");
    }
  } catch (error) {
    console.error("Request failed", error);
  } finally {
    toggleSpinner(false);
  }
}

function formToPayload(form) {
  var payload = Object.fromEntries(new FormData(form));

  // Because phone input is in the light DOM, it can't modify the form by itself
  form.querySelectorAll("form-phone").forEach(($phoneInput) => {
    if (!$phoneInput.value) return;
    payload[$phoneInput.name] = $phoneInput.value;
  });

  payload.formId = form.id;

  return payload;
}

function toggleSpinner(force = undefined) {
  document.querySelector("spinner-modal").toggle(force);
}

function handleLastStep() {
  document.querySelector("multi-step-form").style.display = "none";
  document.querySelector("success-failure-display").toggleVisibility();
}

const PREFILL_KEYS = ["first_name", "last_name", "dob", "di", "di_policy_nb", "pkg"];

function prefillForm(urlParams) {
  if (!urlParams) return;

  PREFILL_KEYS.forEach((id) => {
    const data = urlParams.get(id);
    const elem = document.getElementById(id);
    if (!data || !elem) return;
    elem.value = data;
  });
}

function editUrlParams(urlParams, nextPage, payload) {
  if (!urlParams) return;
  const newUrlParams = new URLSearchParams(urlParams);

  if (!nextPage) {
    newUrlParams.delete("pathway");
  } else {
    newUrlParams.delete("pathway", nextPage);
  }

  PREFILL_KEYS.forEach((id) => {
    const data = payload[id];
    if (!data) return;
    newUrlParams.set(id, data);
  });

  return newUrlParams;
}
