const FormProcessor = class FormProcessor {
  static processForm(formId, formObject) {
    const redactedForm = { ...formObject, signature: "redacted" };
    console.info("Processing", formId, redactedForm);

    switch (formId) {
      case "udc-form":
        FormProcessor._processUDCForm(formObject);
        break;
      case "liability-form":
        FormProcessor._processLiabilityForm(formObject);
        break;
      case "safeDiving-form":
        FormProcessor._processSafeDiving(formObject);
        break;
      case "medical-form":
        FormProcessor._processMedicalForm(formObject);
        break;
      default:
        console.error("Invalid formId: " + formId);
    }
  }

  static _processUDCForm(formObject) {
    const doc = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = doc.getSheetByName(SHEET_NAME);

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const nextRow = sheet.getLastRow() + 1;

    const newRow = headers.map((header) => {
      if (header == "date") return new Date();
      if (header in formObject) return formObject[header];
      return "";
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
    //FIXME: checkboxes ??
    // const diCol = 11,
    //   tAndCCol = 19;
    // const needCheckbox = new RangeList([
    //   sheet.getRange(nextRow, diCol),
    //   sheet.getRange(nextRow, diCol),
    // ]);
    // needCheckbox.insertCheckboxes();
  }

  static _processLiabilityForm(formObject) {
    const folder = FileManager.getOrCreateCustomerFolder(formObject);
    generateLiabilityPDF(formObject, folder);
  }

  static _processSafeDiving(formObject) {
    // FIXME to implement
    // const folder = FileManager.getOrCreateCustomerFolder(formObject);
    // generateLiabilityPDF(formObject, folder);
  }

  static _processMedicalForm(formObject) {
    const folder = FileManager.getOrCreateCustomerFolder(formObject);
    generateMedicalPDF(formObject, folder);
  }
};
