function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp, SlidesApp or FormApp.
  ui.createMenu("UDC Admin")
    .addItem("Create document", "createLastRowDocument")
    // .addItem('Add New Instructor', 'promptNewTab')
    // .addSeparator()
    // .addItem('Udpate Admins', 'addAdmin') // From protectTopBar
    // // .addSeparator()
    // // .addSubMenu(ui.createMenu('Sub-menu')
    // //     .addItem('Second item', 'menuItem2'))
    .addToUi();
}

function createLastRowDocument() {
  var sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);

  var lastRow = sheet.getRange(1, 1).getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow();
  var nbCells = sheet.getRange(1, 1).getNextDataCell(SpreadsheetApp.Direction.NEXT).getColumn();

  var headers = sheet.getRange(1, 1, 1, nbCells).getValues()[0];
  var values = sheet.getRange(lastRow, 1, 1, nbCells).getValues()[0];

  var data = headers.reduce((dataObject, key, idx) => {
    dataObject[key] = values[idx];
    return dataObject;
  }, {});

  createCustomerDoc(data);
}
