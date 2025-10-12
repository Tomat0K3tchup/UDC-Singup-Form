/** Endpoint router of the webapp. As of now, the only route served is the default. It serves index.html */
function doGet() {
  return ContentService.createTextOutput("GAS is working");
}

function doPost(req) {
  const { formId, ...formObject } = req.parameter;
  Logger.log(formId);
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
    Logger.error(e.message);
    Logger.log(e);
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: e })).setMimeType(
      ContentService.MimeType.JSON,
    );
  } finally {
    lock.releaseLock();
  }
}
