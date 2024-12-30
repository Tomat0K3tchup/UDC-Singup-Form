// test deploy: https://script.google.com/macros/s/AKfycby3STqolbuRf7cXKuAsZjwLqUON9zZ69p-1Gu9xVEg/dev

// https://medium.com/script-portal/how-to-create-web-app-with-google-apps-script-part-i-008b0ffc1adf
// https://medium.com/google-cloud/easily-implementing-html-form-with-google-spreadsheet-as-database-using-google-apps-script-66472ab7bf6c

const SPREADSHEET_ID = '1mO4clKaXB5KSpBq7cF8CDWtWiNadSouvTPqC83YhegY'
const SHEET_NAME = 'Sheet2'

/**
 * Endoint router of the webapp. As of now, the only route served is the default. It serves index.html
 */
function doGet() {
  return HtmlService
      .createTemplateFromFile('src/index')
      .evaluate()
      .setTitle("UDC signup form")
      .setFaviconUrl('https://utiladivecenter.com/img/logo/UDC-LOGO-TINY.png')
}


/**
 * DEPRECATED
 */
function doPost_old(formData) {
  // const spreadsheetId = SpreadsheetApp.getActiveSpreadsheet().getId();
  // const res = HtmlFormApp.appendFormData({ formData, spreadsheetId });
  // console.log(ContentService.createTextOutput(
  //   JSON.stringify({ message: "Done", row: res.range.getRow() })
  // ))

  console.log(formData)

  return ContentService.createTextOutput("test"); // Please add this.

}

/**
 * TODO
 */
function backendValidation() {}



function processForm(formObject) {
  console.log(formObject)

  const lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {
    const doc = SpreadsheetApp.openById(SPREADSHEET_ID)

    console.log(doc.getName())
    const sheet = doc.getSheetByName(SHEET_NAME)

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    const nextRow = sheet.getLastRow() + 1

    const newRow = headers.map(header => {
      return header === 'Date' ? new Date() : formObject[header]
    })

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

    // return ContentService
    //   .createTextOutput(JSON.stringify({ 'result': 'success', 'row': 'nextRow' }))
    //   .setMimeType(ContentService.MimeType.JSON)
  } catch (e) {
    // return ContentService
    //   .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
    //   .setMimeType(ContentService.MimeType.JSON)
    console.log(e)
  } finally {
    lock.releaseLock()
  }
}

/**
 * Helper function to include script and stylesheet into the html code.
 * This is to avoid a limitation of the App Script editor
 * .js files are "html" files with a <script> tag
 * .css files are "html" files with a <style> tag
 */
function include_(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}