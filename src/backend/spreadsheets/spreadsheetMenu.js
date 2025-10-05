function onOpen() {
  const ui = SpreadsheetApp.getUi();
  // prettier-ignore
  ui.createMenu("UDC Admin")
    .addItem("Create document", "createSelectedRowsDocumentsWithUi")
    .addSubMenu(ui.createMenu('Team management')
      .addItem("Add team member", "promptAndAddEditor")
    )
    .addToUi()
}

function withUI(fn) {
  const ui = SpreadsheetApp.getUi();

  try {
    fn();
  } catch ({ message, ...errDetails }) {
    console.error(message);
    if (errDetails != {}) Logger.log(errDetails);
    ui.alert(message);
  }
}

const createSelectedRowsDocumentsWithUi = () => withUI(createSelectedRowsDocuments);

function createSelectedRowsDocuments() {
  const propertyService = PropertiesService.getScriptProperties();
  const sheetName = propertyService.getProperty("sheetName");

  const sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);

  const selection = sheet.getSelection();
  if (!selection) throw new Error("Please select the rows you want to use for paperwork creation.");

  const selectedRanges = selection.getActiveRangeList().getRanges();
  if (selectedRanges[0].getRow() <= 3) throw new Error("Please select rows lower than row 3 (headers).");

  const nbCells = sheet.getLastColumn();
  const headers = sheet.getRange(1, 1, 1, nbCells).getValues()[0];

  let values = [];
  selectedRanges.forEach((range) => {
    const col = range.getColumn();
    const nbCellRange = range.getLastColumn();
    if (nbCellRange != nbCells || col != 1) throw new Error("Please select one or more full row(s)");

    values = values.concat(range.getValues());
  });

  values.forEach((row) => createDocumentFromSpreadsheet(headers, row));
  SpreadsheetApp.getUi().alert("All documents created successfully!");
}

function createDocumentFromSpreadsheet(keysArray, valuesArray) {
  var data = keysArray.reduce((o, key, idx) => {
    o[key] = valuesArray[idx];
    return o;
  }, {});

  const folder = FileManager.getOrCreateCustomerFolder(data);
  createCustomerDoc(data, folder);
  // generateLiabilityPDF(data, folder);
}

function promptAndAddEditor() {
  const ui = SpreadsheetApp.getUi();
  const propertyService = PropertiesService.getScriptProperties();

  const folderId = propertyService.getProperty("storageFolderId");

  // Prompt for the email address
  const response = ui.prompt(
    "Add Editor",
    "Enter an email address to add as editor:",
    ui.ButtonSet.OK_CANCEL,
  );

  // Handle user's response
  if (response.getSelectedButton() == ui.Button.OK) {
    const email = response.getResponseText().trim();

    if (email && validateEmail(email)) {
      try {
        // Add as editor to spreadsheet
        const ss = SpreadsheetApp.getActiveSpreadsheet();
        ss.addEditor(email);

        // Add as editor to folder
        const folder = DriveApp.getFolderById(folderId);
        folder.addEditor(email);

        ui.alert("✅ Success", `${email} was added as an editor.`, ui.ButtonSet.OK);
      } catch (e) {
        ui.alert("❌ Error", `${e.message}`, ui.ButtonSet.OK);
      }
    } else {
      ui.alert("⚠️ Invalid email address. Please try again.");
    }
  } else {
    ui.alert("Operation canceled.");
  }
}

// Optional: Simple email validation
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
