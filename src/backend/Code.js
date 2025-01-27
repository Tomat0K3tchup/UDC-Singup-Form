// test deploy: https://script.google.com/macros/s/AKfycby3STqolbuRf7cXKuAsZjwLqUON9zZ69p-1Gu9xVEg/dev

// https://medium.com/script-portal/how-to-create-web-app-with-google-apps-script-part-i-008b0ffc1adf
// https://medium.com/google-cloud/easily-implementing-html-form-with-google-spreadsheet-as-database-using-google-apps-script-66472ab7bf6c

const SPREADSHEET_ID = "1mO4clKaXB5KSpBq7cF8CDWtWiNadSouvTPqC83YhegY";
const SHEET_NAME = "Form Responses";

/** Endpoint router of the webapp. As of now, the only route served is the default. It serves index.html */
function doGet(req) {
  return getPage("index");
}

function processForm(formId, formObject) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    FormProcessor.processForm(formId, formObject);
  } catch (e) {
    // return ContentService
    //   .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
    //   .setMimeType(ContentService.MimeType.JSON)
    console.error(e.message);
    Logger.log(e);
  } finally {
    lock.releaseLock();
  }
}

function processAndSendNextPage(formId, formObject, page) {
  processForm(formId, formObject);

  if (page) {
    return getPageContent(page);
  } else {
    return null;
  }
}

// function handleFormResponseMedical(formObject) {
//   const data = transformDataFromMedical(formObject);
//   generateMedicalPDF(data);
// }

/**
 * Helper function to include script and stylesheet into the html code.
 * This is to avoid a limitation of the App Script editor
 * .js files are "html" files with a <script> tag
 * .css files are "html" files with a <style> tag
 */
function include_(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
