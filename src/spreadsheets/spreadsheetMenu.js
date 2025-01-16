function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp, SlidesApp or FormApp.
  ui.createMenu("UDC Admin")
    .addItem("Create document", "createLastRowDocuments")
    // .addItem('Add New Instructor', 'promptNewTab')
    // .addSeparator()
    // .addItem('Udpate Admins', 'addAdmin') // From protectTopBar
    // // .addSeparator()
    // // .addSubMenu(ui.createMenu('Sub-menu')
    // //     .addItem('Second item', 'menuItem2'))
    .addToUi();
}

function createLastRowDocuments() {
  const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);

  const topMostCell = sheet.getRange(1, 1);
  const lastRow = topMostCell.getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow();
  const nbCells = topMostCell.getNextDataCell(SpreadsheetApp.Direction.NEXT).getColumn();

  const headers = sheet.getRange(1, 1, 1, nbCells).getValues()[0];
  const values = sheet.getRange(lastRow, 1, 1, nbCells).getValues()[0];

  var data = headers.reduce((dataObject, key, idx) => {
    dataObject[key] = values[idx];
    return dataObject;
  }, {});

  const folder = createCustomerFolder(data);
  createCustomerDoc(data, folder);
  generateLiabilityPDF(data, folder);
}
