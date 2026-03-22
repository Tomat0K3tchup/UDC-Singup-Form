import { AppLogger } from "../Logger";
import { CustomerData } from "../types";

type Document = GoogleAppsScript.Document.Document;
type Body = GoogleAppsScript.Document.Body;
type Folder = GoogleAppsScript.Drive.Folder;

export const LANG_TO_TEMPLATE_ID_MAP: Record<string, string> = {
  en: "1KC-eK-c23lJdM4egjqk60v3l9SbQ0_ZW9KCPa-EEZPQ",
  es: "1K1nt-WWDd-luARLEhCWPqPy4ztJEWiVuORHN3F-Yt34",
};

export const DEFAULT_LANG = "en";

export function parseLanguageCode(code: unknown): string | null {
  if (typeof code !== "string") return null;
  return code.split("-")[0].toLowerCase();
}

export function createTemplatedDoc(destinationFolder: Folder, lang: string): GoogleAppsScript.Drive.File {
  // FIXME: no partial updates
  const parseLang = parseLanguageCode(lang);
  const templateKey = parseLang && parseLang in LANG_TO_TEMPLATE_ID_MAP ? parseLang : DEFAULT_LANG;
  const template = DriveApp.getFileById(LANG_TO_TEMPLATE_ID_MAP[templateKey]);
  return template.makeCopy(destinationFolder);
}

export function searchAndReplace(doc: Document, data: CustomerData): void {
  var body = doc.getBody();
  const lang = parseLanguageCode(data.form_language) || DEFAULT_LANG;

  // FIXME: not so many keys
  var clientInfo: Record<string, unknown> = {
    ...data,
    name: `${data.first_name} ${data.last_name}`,
  };

  delete clientInfo.first_name;
  delete clientInfo.last_name;
  delete clientInfo.signature;

  for (const key in clientInfo) {
    try {
      var value: unknown;
      if (isDateKey(key) && clientInfo[key] !== "") {
        value = formatDate(new Date(clientInfo[key] as string));
      } else {
        value = clientInfo[key];
      }

      if (value == "Yes" || value == "No") {
        searchAndReplaceBoolean(body, key, value === "Yes", lang);
        continue;
      }
      body.replaceText(`{{${key.toString()}}}`, String(value));
    } catch (e: any) {
      AppLogger.warn(e.message);
    }
  }
}

export function searchAndReplaceBoolean(body: Body, key: string, value: boolean, lang: string): void {
  const spaces = 10;
  const yesLabel = lang === "es" ? "Sí" : "Yes";
  const noLabel = "No";
  const replacementString = yesLabel + " ".repeat(spaces) + noLabel;
  const OFFSET_MAP: Record<string, { offset: number; length: number }> = {
    true: {
      offset: spaces + yesLabel.length,
      length: noLabel.length - 1,
    },
    false: {
      offset: 0,
      length: yesLabel.length - 1,
    },
  };
  const foundElement = body.findText(`{{${key}}}`);

  if (!foundElement) {
    AppLogger.warn(`Boolean placeholder {{${key}}} not found in template`);
    return;
  }

  const element = foundElement.getElement();
  const start = foundElement.getStartOffset();
  const end = foundElement.getEndOffsetInclusive();

  const text = element.asText();
  text.deleteText(start, end);
  text.insertText(start, replacementString);

  const { offset, length } = OFFSET_MAP[String(value)];
  text.setStrikethrough(start + offset, start + offset + length, true);
}

export function createCustomerDoc(data: CustomerData, destinationFolder: Folder): void {
  const lang = data.form_language;
  try {
    var file = createTemplatedDoc(destinationFolder, lang || DEFAULT_LANG);
    var doc = DocumentApp.openById(file.getId());
  } catch (e) {
    AppLogger.error(e);
  }

  searchAndReplace(doc!, data);
  insertImageAndExport(doc!, data.signature);
  file!.setName(`${data.first_name} ${data.last_name} - ${formatDate(new Date(data.date!))}`);
}

export function isDateKey(key: string): boolean {
  return key == "dob" || key.includes("date");
}

export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export function insertImageAndExport(doc: Document, signatureData: string | undefined): void {
  if (!signatureData) throw new Error("Please provide a signature for the customer");

  let blob: GoogleAppsScript.Base.Blob;

  if (signatureData.startsWith("http")) {
    try {
      const fileId = extractFileIdFromUrl(signatureData);
      const file = DriveApp.getFileById(fileId);
      blob = file.getBlob();
    } catch (e) {
      AppLogger.error("Failed to load signature from URL:", signatureData, e);
      throw new Error("Could not load signature from Drive");
    }
  } else {
    const dataPart = signatureData.split(",")[1];
    if (!dataPart) throw new Error("The provided signature is invalid");
    blob = Utilities.newBlob(Utilities.base64Decode(dataPart));
  }

  doc.getBody().appendImage(blob);
}

export function extractFileIdFromUrl(url: string): string {
  const patterns = [/\/file\/d\/([a-zA-Z0-9_-]+)/, /[?&]id=([a-zA-Z0-9_-]+)/, /\/d\/([a-zA-Z0-9_-]+)/];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  throw new Error("Could not extract file ID from URL: " + url);
}
