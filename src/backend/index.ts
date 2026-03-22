// Entry point — import all modules and expose GAS globals
import { doGet, doPost } from "./Code";
import {
  onOpen,
  createSelectedRowsDocumentsWithUi,
  promptAndAddEditor,
} from "./spreadsheets/spreadsheetMenu";
import { testLiability as testLiabilityPDF, testMedical } from "./drive/PDFFormCreator/PDFFormCreator";
import { testLiability } from "./drive/tests";

// Expose functions on globalThis for GAS to discover
const _global = globalThis as Record<string, unknown>;

// Web app triggers
_global.doGet = doGet;
_global.doPost = doPost;

// Simple triggers
_global.onOpen = onOpen;

// Menu callbacks (referenced by string name in addItem())
_global.createSelectedRowsDocumentsWithUi = createSelectedRowsDocumentsWithUi;
_global.promptAndAddEditor = promptAndAddEditor;

// Test utilities (for GAS editor Run button)
_global.testLiability = testLiability;
_global.testMedical = testMedical;
_global.testLiabilityPDF = testLiabilityPDF;
