// test deploy: https://script.google.com/macros/s/AKfycby3STqolbuRf7cXKuAsZjwLqUON9zZ69p-1Gu9xVEg/dev

// https://medium.com/script-portal/how-to-create-web-app-with-google-apps-script-part-i-008b0ffc1adf
// https://medium.com/google-cloud/easily-implementing-html-form-with-google-spreadsheet-as-database-using-google-apps-script-66472ab7bf6c

const SPREADSHEET_ID = "1mO4clKaXB5KSpBq7cF8CDWtWiNadSouvTPqC83YhegY";
const SHEET_NAME = "Form Responses";

/** Endpoint router of the webapp. As of now, the only route served is the default. It serves index.html */
function doGet() {
  return ContentService.createTextOutput("GAS is working");
}

function doPost(req) {
  const { formId, ...formObject } = req.parameter;
  res = processForm(formId, formObject);

  return res;
}

function processForm(formId, formObject) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    FormProcessor.processForm(formId, formObject);
    return ContentService.createTextOutput(JSON.stringify({ result: "ok" })).setMimeType(
      ContentService.MimeType.JSON,
    );
  } catch (e) {
    console.error(e.message);
    Logger.log(e);
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: e })).setMimeType(
      ContentService.MimeType.JSON,
    );
  } finally {
    lock.releaseLock();
  }
}
