function zf_ValidateAndSubmit() {
  if (zf_CheckMandatory() && zf_ValidCheck()) {
    if (isSalesIQIntegrationEnabled) {
      zf_addDataToSalesIQ();
    }
    return true;
  }
  return false;
}

function zf_CheckMandatory() {
  for (let i = 0; i < zf_MandArray.length; i++) {
    const fieldName = zf_MandArray[i];
    const fieldObj = document.forms.form[fieldName];

    if (fieldObj) {
      if (fieldObj.nodeName === "OBJECT") {
        if (!zf_MandatoryCheckSignature(fieldObj)) {
          zf_ShowErrorMsg(fieldName);
          return false;
        }
      } else if (fieldObj.nodeName === "SELECT") {
        if (fieldObj.options[fieldObj.selectedIndex].value === "-Select-") {
          fieldObj.focus();
          zf_ShowErrorMsg(fieldName);
          return false;
        }
      } else if (fieldObj.type === "checkbox" || fieldObj.type === "radio") {
        if (!fieldObj.checked) {
          fieldObj.focus();
          zf_ShowErrorMsg(fieldName);
          return false;
        }
      } else if (!fieldObj.value.trim()) {
        if (fieldObj.type === "file") {
          fieldObj.focus();
          zf_ShowErrorMsg(fieldName);
          return false;
        }
        fieldObj.focus();
        zf_ShowErrorMsg(fieldName);
        return false;
      } else if (fieldObj.length) {
        // Handle multi-selects or groups like checkboxes/radios
        const checkedValsCount = Array.from(fieldObj).filter((el) => el.checked).length;
        if (checkedValsCount === 0) {
          fieldObj[0].focus();
          zf_ShowErrorMsg(fieldName);
          return false;
        }
      }
    }
  }
  return true;
}

function zf_ValidCheck() {
  for (let ind = 0; ind < zf_FieldArray.length; ind++) {
    const fieldName = zf_FieldArray[ind];
    const fieldObj = document.forms.form[fieldName];
    if (fieldObj) {
      const checkType = fieldObj.getAttribute("checktype");
      if (!zf_ValidateField(fieldObj, checkType)) {
        fieldObj.focus();
        zf_ShowErrorMsg(fieldName);
        return false;
      }
    }
  }
  return true;
}

function zf_ValidateField(fieldObj, checkType) {
  switch (checkType) {
    case "c2":
      return zf_ValidateNumber(fieldObj);
    case "c3":
      return zf_ValidateCurrency(fieldObj) && zf_ValidateDecimalLength(fieldObj, 10);
    case "c4":
      return zf_ValidateDateFormat(fieldObj);
    case "c5":
      return zf_ValidateEmailID(fieldObj);
    case "c6":
      return zf_ValidateLiveUrl(fieldObj);
    case "c7":
      return zf_ValidatePhone(fieldObj);
    case "c8":
      return zf_ValidateSignature(fieldObj);
    default:
      return true;
  }
}

function zf_ShowErrorMsg(uniqName) {
  zf_FieldArray.forEach((field) => {
    const fldLinkName = field.split("_")[0];
    document.getElementById(fldLinkName + "_error").style.display = "none";
  });
  const linkName = uniqName.split("_")[0];
  document.getElementById(linkName + "_error").style.display = "block";
}

function zf_ValidateNumber(elem) {
  const validChars = "-0123456789";
  const numValue = elem.value.trim();
  if (numValue === "") return true;
  if (numValue.charAt(0) === "-" && numValue.length === 1) return false;
  return [...numValue].every((char) => validChars.includes(char));
}

function zf_ValidateDateFormat(elem) {
  return elem.value.trim() === "" || zf_DateRegex.test(elem.value.trim());
}

function zf_ValidateCurrency(elem) {
  const validChars = "0123456789.";
  let numValue = elem.value.trim();
  if (numValue.charAt(0) === "-") numValue = numValue.substring(1);
  if (numValue === "") return true;
  return [...numValue].every((char) => validChars.includes(char));
}

function zf_ValidateDecimalLength(elem, decimalLen) {
  const numValue = elem.value;
  if (numValue.includes(".")) {
    const decimalLength = numValue.split(".")[1].length;
    return decimalLength <= decimalLen;
  }
  return true;
}

function zf_ValidateEmailID(elem) {
  const emailValue = elem.value.trim();
  if (emailValue === "") return true;
  const emailExp =
    /^[\w][\w\-.+&'/]*@([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,22}$/;
  return emailValue.split(",").every((email) => emailExp.test(email.trim()));
}

function zf_ValidateLiveUrl(elem) {
  const urlValue = elem.value.trim();
  if (urlValue === "") return true;
  const urlregex = new RegExp(
    "^(((https|http|ftps|ftp)://[a-zA-Z\\d]+((_|-|@)[a-zA-Z\\d]+)*(\\.[a-zA-Z\\d]+((_|-|@)[a-zA-Z\\d]+)*)+(:\\d{1,5})?)|((w|W){3}(\\.[a-zA-Z\\d]+((_|-|@)[a-zA-Z\\d]+)*){2,}(:\\d{1,5})?)|([a-zA-Z\\d]+((_|-)[a-zA-Z\\d]+)*(\\.[a-zA-Z\\d]+((_|-)[a-zA-Z\\d]+)*)+(:\\d{1,5})?))(/[-\\w.?,:'/\\\\+=&;%$#@()!~]*)?$",
    "i",
  );
  return urlregex.test(urlValue);
}

function zf_ValidatePhone(elem) {
  const phoneFormat = parseInt(elem.getAttribute("phoneFormat"));
  const fieldInpVal = elem.value.trim();
  const ZFPhoneRegex = {
    PHONE_INTE_ALL_REG: /^[+()0-9-. ]+$/,
    PHONE_INTE_NUMERIC_REG: /^[0-9]+$/,
    PHONE_USA_REG: /^[0-9]+$/,
    PHONE_CONT_CODE_REG: /^[+][0-9]{1,4}$/,
  };

  if (phoneFormat === 1) {
    if (elem.getAttribute("valType") === "code") {
      return ZFPhoneRegex.PHONE_CONT_CODE_REG.test(fieldInpVal);
    } else {
      const regex =
        elem.getAttribute("phoneFormatType") === "2"
          ? ZFPhoneRegex.PHONE_INTE_NUMERIC_REG
          : ZFPhoneRegex.PHONE_INTE_ALL_REG;
      return regex.test(fieldInpVal);
    }
  } else if (phoneFormat === 2) {
    const maxLength = elem.getAttribute("maxlength");
    return (
      fieldInpVal === "" ||
      (ZFPhoneRegex.PHONE_USA_REG.test(fieldInpVal) && fieldInpVal.length === maxLength)
    );
  }
  return true;
}

function zf_ValidateSignature(objElem) {
  const linkName = objElem.getAttribute("compname");
  const canvasElem = document.getElementById("drawingCanvas-" + linkName);
  const isValidSign = zf_IsSignaturePresent(objElem, linkName, canvasElem);
  const hiddenSignInputElem = document.getElementById("hiddenSignInput-" + linkName);
  hiddenSignInputElem.value = isValidSign ? canvasElem.toDataURL() : "";
  return isValidSign;
}

function zf_MandatoryCheckSignature(objElem) {
  const linkName = objElem.getAttribute("compname");
  const canvasElem = document.getElementById("drawingCanvas-" + linkName);
  return zf_IsSignaturePresent(objElem, linkName, canvasElem);
}

function zf_IsSignaturePresent(objElem, linkName, canvasElem) {
  const context = canvasElem.getContext("2d");
  const canvasData = context.getImageData(0, 0, canvasElem.width, canvasElem.height);
  return [...canvasData.data].some((value) => value !== 0);
}

function zf_FocusNext(elem, event) {
  if ([9, 16].includes(event.keyCode) || (event.keyCode >= 37 && event.keyCode <= 40)) {
    return;
  }
  const compname = elem.getAttribute("compname");
  const inpElemName = elem.getAttribute("name");

  if (inpElemName === `${compname}_countrycode` && elem.value.length === 3) {
    document.getElementsByName(`${compname}_first`)[0].focus();
  } else if (inpElemName === `${compname}_first` && elem.value.length === 3) {
    document.getElementsByName(`${compname}_second`)[0].focus();
  }
}
