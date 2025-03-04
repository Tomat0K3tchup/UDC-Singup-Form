class FormProcessor {
  static processForm(formId, formObject) {
    const redactedForm = { ...formObject, signature: "redacted", id_file: "redacted" };
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
    const propertyService = PropertiesService.getScriptProperties();
    const sheetId = propertyService.getProperty("spreadsheetId");
    const sheetName = propertyService.getProperty("sheetName");

    const doc = SpreadsheetApp.openById(sheetId);
    const sheet = doc.getSheetByName(sheetName);

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const nextRow = sheet.getLastRow() + 1;

    const newRow = headers.map((header) => {
      if (header == "date") return new Date();
      if (header in formObject) return formObject[header];
      return "";
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    if (formObject.id_file) {
      const folder = FileManager.getOrCreateCustomerFolder(formObject);
      FormProcessor._generatePassportFile(formObject.id_file, folder);
    }
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

  static _generatePassportFile(fileData, destinationFolder) {
    const [metadata, data] = fileData.split(",");
    const mimeType = metadata.match(/data:([^;]+);base64/)[1];

    const blob = Utilities.newBlob(Utilities.base64Decode(data), mimeType, "ID picture");
    destinationFolder.createFile(blob);
  }
}
