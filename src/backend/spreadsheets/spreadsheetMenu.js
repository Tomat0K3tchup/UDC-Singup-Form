function onOpen() {
  const ui = SpreadsheetApp.getUi();
  // prettier-ignore
  ui.createMenu("UDC Admin")
    .addItem("Create document", "createSelectedRowsDocumentsWithUi")
    .addToUi();
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
