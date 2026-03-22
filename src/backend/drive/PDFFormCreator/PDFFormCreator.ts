import { AppLogger } from "../../Logger";
import {
  LIABILITY_FORM_TO_PDF_MAP,
  MEDICAL_FORM_TO_PDF_MAP,
  SignaturePosition,
  PDFFormConfig,
  BooleanFieldMap,
} from "./consts";
import { PDFDocument, PDFTextField, PDFRadioGroup, PDFCheckBox } from "pdf-lib";
import type { PDFForm, PDFField } from "pdf-lib";
import { CustomerData, MedicalCustomerData } from "../../types";

type Folder = GoogleAppsScript.Drive.Folder;

export function testLiability(): void {
  const clientData: CustomerData = {
    first_name: "Janette",
    last_name: "Doe",
    date: new Date().toISOString(),
    signature: SIG,
    pkg: "goPro",
    di: "false",
    di_policy_nb: "1234",
    form_language: "es",
  };

  const folder = null as unknown as Folder;
  generateLiabilityPDF(clientData, folder);
}

export async function generateLiabilityPDF(clientData: CustomerData, destinationFolder: Folder): Promise<void> {
  AppLogger.log("Generating liability PDF...");
  const lang = clientData.form_language || "en";
  const pdfConst = LIABILITY_FORM_TO_PDF_MAP[lang];
  try {
    const pdfDoc = await loadGoogleFileToPdfLib(pdfConst.id);
    const pdfForm = pdfDoc.getForm();

    const liabilityData = getLiabilityData(clientData);
    fillLiabilityForm(pdfForm, pdfConst.form, liabilityData);
    pdfForm.flatten();
    sign(pdfDoc, pdfConst.signature, clientData.signature as string);

    const title = `${liabilityData.participantName} - ${pdfConst.title} - ${liabilityData.date}`;
    savePdfLibDocToGoogle(pdfDoc, destinationFolder, title);
  } catch (e) {
    AppLogger.error(e);
    throw new Error("Could not generate Liability PDF");
  }
}

export function formatDate(date: Date): string {
  const DD_MM_YY_FORMATTER = new Intl.DateTimeFormat("fr-FR");
  return DD_MM_YY_FORMATTER.format(date);
}

export function getLiabilityData(clientData: CustomerData) {
  return {
    shop: "Utila Dive Center",
    participantName: `${clientData.first_name} ${clientData.last_name}`,
    date: formatDate(new Date(clientData.date!)),
    di_yesNo: clientData.di,
    di_policyNb: String(clientData.di_policy_nb),
  };
}

export function fillLiabilityForm(pdfForm: PDFForm, map: PDFFormConfig["form"], data: Record<string, unknown>): void {
  Object.keys(data).forEach((key) => {
    AppLogger.debug("Trying to fill", key);
    try {
      if (typeof map[key] === "string") {
        fillSinglePDFField(pdfForm, map[key] as string, data[key] as string | undefined);
      } else if (map[key] instanceof Array) {
        const fields = map[key] as string[];
        fields.forEach((fieldName) => {
          fillSinglePDFField(pdfForm, fieldName, data[key] as string | undefined);
        });
      } else {
        const checkBoxValue = data[key];
        const fieldMap = map[key] as BooleanFieldMap;
        const boolKey = checkBoxValue === "true" || checkBoxValue === "Yes" ? "true" : "false";
        const fieldIdentifier = fieldMap[boolKey];

        if (fieldIdentifier === undefined) {
          throw Error("Received invalid value for choosing text box");
        }

        fillSinglePDFField(pdfForm, fieldIdentifier, checkBoxValue as string | undefined);
      }
    } catch (e) {
      AppLogger.error(e);
      throw new Error(`Failed to fill fields`);
    }
  });
}

export function isTextField(pdfField: PDFField): pdfField is PDFTextField {
  return pdfField instanceof PDFTextField;
}

export function isRadioField(pdfField: PDFField): pdfField is PDFRadioGroup {
  return pdfField instanceof PDFRadioGroup;
}

export function isCheckBox(pdfField: PDFField): pdfField is PDFCheckBox {
  return pdfField instanceof PDFCheckBox;
}

export function fillSinglePDFField(pdfForm: PDFForm, pdfFieldIdentifier: string, fillValue: string | undefined): void {
  const pdfField = pdfForm.getField(pdfFieldIdentifier);

  if (isTextField(pdfField)) {
    AppLogger.debug("Set Field", pdfFieldIdentifier, fillValue);
    pdfField.setText(fillValue);
  } else if (isRadioField(pdfField)) {
    AppLogger.debug("Selected Field", pdfFieldIdentifier, fillValue);
    pdfField.select(fillValue as string);
  } else if (isCheckBox(pdfField)) {
    AppLogger.debug("Checked Field", pdfFieldIdentifier, fillValue);
    pdfField.check();
  } else {
    AppLogger.warn(`Received unhandled field type: ${pdfField.constructor.name}`);
  }
}

export async function generateMedicalPDF(clientData: MedicalCustomerData, destinationFolder: Folder): Promise<void> {
  const pdfConst = MEDICAL_FORM_TO_PDF_MAP;
  const pdfDoc = await loadGoogleFileToPdfLib(pdfConst.id);
  const pdfForm = pdfDoc.getForm();

  const medicalData = transformDataFromMedical(clientData);

  try {
    fillMedicalForm(pdfForm, pdfConst.form, medicalData);
    sign(pdfDoc, pdfConst.signature, clientData.signature as string);

    const title = `${medicalData.participantName} - ${pdfConst.title} - ${medicalData.date}`;
    savePdfLibDocToGoogle(pdfDoc, destinationFolder, title);
  } catch (e) {
    AppLogger.error(e);
    throw new Error("Couldn't fill medical form");
  }
}

export function transformDataFromMedical(data: MedicalCustomerData) {
  const today = formatDate(new Date(data.date!));
  const dob = formatDate(new Date(data.dob!));
  return {
    ...data,
    participantName: `${data.first_name} ${data.last_name}`,
    shop: "Utila Dive Center",
    date: today,
    dob: dob,
  };
}

export function testMedical(): void {
  const clientData: MedicalCustomerData = {
    first_name: "T",
    last_name: "M",
    pkg: "fd",
    dob: "01/01/1999",
    q1: "false",
    q2: "true",
    q3: "false",
    q4: "false",
    q5: "false",
    q6: "false",
    q7: "false",
    q8: "false",
    q9: "false",
    q10: "false",
    qA_1: "",
    qA_2: "",
    qA_3: "",
    qA_4: "",
    qA_5: "",
    qB_1: "true",
    qB_2: "true",
    qB_3: "false",
    qB_4: "false",
    qC_1: "",
    qC_2: "",
    qC_3: "",
    qC_4: "",
    qD_1: "",
    qD_2: "",
    qD_3: "",
    qD_4: "",
    qE_1: "",
    qE_2: "",
    qE_3: "",
    qE_4: "",
    qF_1: "",
    qF_2: "",
    qF_3: "",
    qF_4: "",
    qG_1: "",
    qG_2: "",
    qG_3: "",
    qG_4: "",
    signature: SIG,
  };

  // @ts-expect-error DESTINATION_FOLDER_ID is set in GAS script properties — deferred fix
  const destFolder = DriveApp.getFolderById(DESTINATION_FOLDER_ID);
  generateMedicalPDF(clientData, destFolder);
}

export function fillMedicalForm(
  pdfForm: PDFForm,
  answerToDocMap: PDFFormConfig["form"],
  clientData: Record<string, unknown>,
): void {
  for (const question in clientData) {
    if (!question.includes("q")) continue;

    const questionMap = answerToDocMap[question] as BooleanFieldMap | undefined;
    if (!questionMap) continue;
    const boolKey = clientData[question] === "true" ? "true" : "false";
    const fieldName = questionMap[boolKey];

    if (!fieldName) continue;
    pdfForm.getCheckBox(fieldName).check();
  }

  (answerToDocMap.participantName as string[]).forEach((nameInForm) => {
    pdfForm.getTextField(nameInForm).setText(clientData.participantName as string);
  });

  (answerToDocMap.dob as string[]).forEach((dobInForm) => {
    pdfForm.getTextField(dobInForm).setText(clientData.dob as string);
  });

  pdfForm.getTextField(answerToDocMap.date as string).setText(clientData.date as string);
}

export async function loadGoogleFileToPdfLib(id: string): Promise<PDFDocument> {
  const file = DriveApp.getFileById(id);
  const existingPdfBytes = Uint8Array.from(file.getBlob().getBytes());
  try {
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    return pdfDoc;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    AppLogger.error("Error loading PDF:", message, "docId:", id);
    throw new Error("Error loading PDF template");
  }
}

export async function savePdfLibDocToGoogle(
  pdfDoc: PDFDocument,
  destinationFolder: Folder,
  name: string,
): Promise<void> {
  const pdfBytes = await pdfDoc.save();

  const blob = Utilities.newBlob([...pdfBytes])
    .setContentType(MimeType.PDF)
    .setName(name);
  destinationFolder.createFile(blob);
}

export async function sign(pdfDoc: PDFDocument, map: SignaturePosition, signature: string): Promise<void> {
  const sigImg = await pdfDoc.embedPng(signature);
  const dims = sigImg.scale(0.33);

  const page = pdfDoc.getPages()[map.page];
  const { width, height } = page.getTrimBox();

  page.drawImage(sigImg, {
    x: map.X * width,
    y: map.Y * height,
    width: dims.width,
    height: dims.height,
  });
}

const SIG =
  "data:image/png;base64,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";
