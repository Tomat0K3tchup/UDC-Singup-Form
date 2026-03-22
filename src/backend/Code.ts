import { generateRequestId, setRequestId, clearRequestId, AppLogger } from "./Logger";
import { FormProcessor } from "./FormProcessor";
import { CustomerData } from "./types";

export function doGet(): GoogleAppsScript.Content.TextOutput {
  return ContentService.createTextOutput("GAS is working");
}

export function doPost(req: GoogleAppsScript.Events.DoPost): GoogleAppsScript.Content.TextOutput {
  const requestId = generateRequestId();
  setRequestId(requestId);

  const { formId, ...formObject } = req.parameter;
  const res = processForm(formId, formObject as unknown as CustomerData);

  return res;
}

export function processForm(formId: string, formObject: CustomerData): GoogleAppsScript.Content.TextOutput {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    FormProcessor.processForm(formId, formObject);
    return ContentService.createTextOutput(JSON.stringify({ result: "ok" })).setMimeType(
      ContentService.MimeType.JSON,
    );
  } catch (e) {
    AppLogger.error(e);
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: e })).setMimeType(
      ContentService.MimeType.JSON,
    );
  } finally {
    lock.releaseLock();
    clearRequestId();
  }
}
