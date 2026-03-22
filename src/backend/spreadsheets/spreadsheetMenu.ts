import { AppLogger, generateRequestId, setRequestId, clearRequestId } from "../Logger";
import { FileManager } from "../drive/FileManager";
import { createCustomerDoc } from "../docs/createDocPpw";
import { CustomerData } from "../types";

export function onOpen(): void {
  const ui = SpreadsheetApp.getUi();
  // prettier-ignore
  ui.createMenu("UDC Admin")
    .addItem("Create document", "createSelectedRowsDocumentsWithUi")
    .addSubMenu(ui.createMenu('Team management')
      .addItem("Add team member", "promptAndAddEditor")
    )
    .addToUi()
}

export function withUI(fn: () => void): void {
  const ui = SpreadsheetApp.getUi();

  const requestId = generateRequestId();
  setRequestId(requestId);

  try {
    fn();
  } catch (e: any) {
    AppLogger.error(e.message);
    ui.alert(e.message);
  } finally {
    clearRequestId();
  }
}

export const createSelectedRowsDocumentsWithUi = (): void => withUI(createSelectedRowsDocuments);

export function createSelectedRowsDocuments(): void {
  const propertyService = PropertiesService.getScriptProperties();
  const sheetName = propertyService.getProperty("sheetName");

  const sheet = SpreadsheetApp.getActive().getSheetByName(sheetName!);

  const selection = sheet!.getSelection();
  if (!selection) throw new Error("Please select the rows you want to use for paperwork creation.");

  const selectedRanges = selection.getActiveRangeList()!.getRanges();
  if (selectedRanges[0].getRow() <= 3) throw new Error("Please select rows lower than row 3 (headers).");

  const nbCells = sheet!.getLastColumn();
  const headers = sheet!.getRange(1, 1, 1, nbCells).getValues()[0] as string[];

  let values: unknown[][] = [];
  selectedRanges.forEach((range) => {
    const col = range.getColumn();
    const nbCellRange = range.getLastColumn();
    if (nbCellRange != nbCells || col != 1) throw new Error("Please select one or more full row(s)");

    values = values.concat(range.getValues());
  });

  values.forEach((row) => createDocumentFromSpreadsheet(headers, row));
  SpreadsheetApp.getUi().alert("All documents created successfully!");
}

export function createDocumentFromSpreadsheet(keysArray: string[], valuesArray: unknown[]): void {
  var data = keysArray.reduce((o: Record<string, unknown>, key, idx) => {
    o[key] = valuesArray[idx];
    return o;
  }, {}) as CustomerData;

  AppLogger.info("Creating document for customer:", data.first_name, data.last_name);
  const folder = FileManager.getOrCreateCustomerFolder(data);
  createCustomerDoc(data, folder);
}

export function promptAndAddEditor(): void {
  const ui = SpreadsheetApp.getUi();
  const propertyService = PropertiesService.getScriptProperties();

  const requestId = generateRequestId();
  setRequestId(requestId);
  AppLogger.info("Starting add editor operation");

  try {
    const folderId = propertyService.getProperty("storageFolderId");

    const response = ui.prompt(
      "Add Editor",
      "Enter an email address to add as editor:",
      ui.ButtonSet.OK_CANCEL,
    );

    if (response.getSelectedButton() == ui.Button.OK) {
      const email = response.getResponseText().trim();

      if (email && validateEmail(email)) {
        try {
          const ss = SpreadsheetApp.getActiveSpreadsheet();
          ss.addEditor(email);
          AppLogger.info("Added editor to spreadsheet:", email);

          const folder = DriveApp.getFolderById(folderId!);
          folder.addEditor(email);
          AppLogger.info("Added editor to folder:", email);

          ui.alert("✅ Success", `${email} was added as an editor.`, ui.ButtonSet.OK);
        } catch (e: any) {
          AppLogger.error("Failed to add editor:", e.message);
          ui.alert("❌ Error", `${e.message}`, ui.ButtonSet.OK);
        }
      } else {
        AppLogger.warn("Invalid email address provided:", email);
        ui.alert("⚠️ Invalid email address. Please try again.");
      }
    } else {
      AppLogger.info("Add editor operation canceled by user");
      ui.alert("Operation canceled.");
    }
  } finally {
    clearRequestId();
  }
}

export function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
