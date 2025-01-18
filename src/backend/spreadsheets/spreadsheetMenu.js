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
  } catch (e) {
    ui.alert(e.message);
  }
}

const createSelectedRowsDocumentsWithUi = () => withUI(createSelectedRowsDocuments);

function createSelectedRowsDocuments() {
  const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);

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
}

function createDocumentFromSpreadsheet(keysArray, valuesArray) {
  var data = keysArray.reduce((o, key, idx) => {
    o[key] = valuesArray[idx];
    return o;
  }, {});

  const folder = createCustomerFolder(data);
  createCustomerDoc(data, folder);
  generateLiabilityPDF(data, folder);
}
