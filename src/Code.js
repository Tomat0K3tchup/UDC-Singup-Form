// test deploy: https://script.google.com/macros/s/AKfycby3STqolbuRf7cXKuAsZjwLqUON9zZ69p-1Gu9xVEg/dev

// https://medium.com/script-portal/how-to-create-web-app-with-google-apps-script-part-i-008b0ffc1adf
// https://medium.com/google-cloud/easily-implementing-html-form-with-google-spreadsheet-as-database-using-google-apps-script-66472ab7bf6c

const SPREADSHEET_ID = "1mO4clKaXB5KSpBq7cF8CDWtWiNadSouvTPqC83YhegY";
const SHEET_NAME = "Sheet2";

/** Endoint router of the webapp. As of now, the only route served is the default. It serves index.html*/
function doGet(e) {
  let pageInfo = {
    fileName: "src/index-2",
    title: "UDC signup form",
  };

  if (e.pathInfo == "test") {
    pageInfo.fileName = "src/components/test";
    pageInfo.title = "UDC test";
  }

  if (e.pathInfo == "demo") {
    pageInfo.fileName = "src/demo-medical";
    pageInfo.title = "UDC Demo Medical";
  }

  if (e.pathInfo == "admin") {
    pageInfo.fileName = "src/reception";
    pageInfo.title = "UDC admin reception form";
  }

  // var params = JSON.stringify(e);
  // return ContentService.createTextOutput(params).setMimeType(ContentService.MimeType.JSON);

  return HtmlService.createTemplateFromFile(pageInfo.fileName)
    .evaluate()
    .setTitle(pageInfo.title)
    .setFaviconUrl("https://utiladivecenter.com/img/logo/UDC-LOGO-TINY.png");
}

// TODO
function backendValidation() {}

function processForm(formObject) {
  console.log(formObject);

  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const doc = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = doc.getSheetByName(SHEET_NAME);

    const headers = sheet
      .getRange(1, 1, 1, sheet.getLastColumn())
      .getValues()[0];
    const nextRow = sheet.getLastRow() + 1;

    const newRow = headers.map((header) => {
      return header === "Date" ? new Date() : formObject[header];
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    // return ContentService
    //   .createTextOutput(JSON.stringify({ 'result': 'success', 'row': 'nextRow' }))
    //   .setMimeType(ContentService.MimeType.JSON)
  } catch (e) {
    // return ContentService
    //   .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
    //   .setMimeType(ContentService.MimeType.JSON)
    console.log(e);
  } finally {
    lock.releaseLock();
  }
}

function handleFormResponseMedical(formObject) {
  Logger.log(formObject)

  const data = transformDataFromMedical(formObject)
  Logger.log(data)
  generateMedicalPDF(data)
  Logger.log("Success!")
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
