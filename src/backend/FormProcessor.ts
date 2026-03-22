import { AppLogger } from "./Logger";
import { FileManager } from "./drive/FileManager";
import { generateLiabilityPDF, generateMedicalPDF } from "./drive/PDFFormCreator/PDFFormCreator";
import { CustomerData } from "./types";

type Folder = GoogleAppsScript.Drive.Folder;

export const FormsTypes = {
  UDC: "udc-form",
  LIABILITY: "liability-form",
  SAFE_DIVING: "safeDiving-form",
  MEDICAL: "medical-form",
} as const;

export type FormType = (typeof FormsTypes)[keyof typeof FormsTypes];

export class FormProcessor {
  static processForm(formId: string, formObject: CustomerData): void {
    const redactedForm = { ...formObject, signature: "redacted", id_file: "redacted" };
    AppLogger.debug("Processing", formId, redactedForm);

    try {
      switch (formId) {
        case FormsTypes.UDC:
          FormProcessor._processUDCForm(formObject);
          break;
        case FormsTypes.LIABILITY:
          FormProcessor._processLiabilityForm(formObject);
          break;
        // BUG: duplicate LIABILITY case — should be SAFE_DIVING (deferred fix)
        case FormsTypes.LIABILITY:
          FormProcessor._processSafeDiving(formObject);
          break;
        case FormsTypes.MEDICAL:
          FormProcessor._processMedicalForm(formObject);
          break;
        default:
          AppLogger.warn("Invalid formId: " + formId);
      }
    } catch (e) {
      AppLogger.error(e);
    }
  }

  static _processUDCForm(formObject: CustomerData): void {
    const propertyService = PropertiesService.getScriptProperties();
    const sheetId = propertyService.getProperty("spreadsheetId");
    const sheetName = propertyService.getProperty("sheetName");

    const doc = SpreadsheetApp.openById(sheetId!);
    const sheet = doc.getSheetByName(sheetName!)!;

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] as string[];
    const nextRow = sheet.getLastRow() + 1;

    const folder = FileManager.getOrCreateCustomerFolder(formObject);
    let signatureUrl = "";

    if (formObject.signature) {
      const signatureFile = FormProcessor._generateSignatureFile(formObject.signature, folder);
      signatureUrl = signatureFile.getUrl();
    }

    if (formObject.id_file) {
      FormProcessor._generatePassportFile(formObject.id_file as string, folder);
    }

    const newRow = headers.map((header) => {
      if (header == "date") return new Date();
      if (header == "signature") return signatureUrl;
      if (header in formObject) return formObject[header];
      return "";
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
  }

  static _processLiabilityForm(formObject: CustomerData): void {
    const folder = FileManager.getOrCreateCustomerFolder(formObject);
    generateLiabilityPDF(formObject, folder);
  }

  static _processSafeDiving(_formObject: CustomerData): void {
    // FIXME to implement
  }

  static _processMedicalForm(formObject: CustomerData): void {
    const folder = FileManager.getOrCreateCustomerFolder(formObject);
    generateMedicalPDF(formObject, folder);
  }

  static _generatePassportFile(fileData: string, destinationFolder: Folder): void {
    const [metadata, data] = fileData.split(",");
    const mimeType = metadata.match(/data:([^;]+);base64/)![1];

    const blob = Utilities.newBlob(Utilities.base64Decode(data), mimeType, "ID picture");
    destinationFolder.createFile(blob);
  }

  static _generateSignatureFile(fileData: string, destinationFolder: Folder): GoogleAppsScript.Drive.File {
    const [metadata, data] = fileData.split(",");
    const mimeType = metadata.match(/data:([^;]+);base64/)![1];

    const blob = Utilities.newBlob(Utilities.base64Decode(data), mimeType, "Signature");
    return destinationFolder.createFile(blob);
  }
}
