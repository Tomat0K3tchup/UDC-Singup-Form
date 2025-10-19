const MEDICAL_PDF_ID_SPA = "1-c85xqY8GSalZBMHWVG4cuQAV20JOf-R";

function testLiability() {
  const clientData = {
    first_name: "Janette",
    last_name: "Doe",
    date: new Date(),
    signature: SIG,
    pkg: "goPro",
    di: false,
    di_policy_nb: "1234",
  };

  //const folder = FileManager.getOrCreateCustomerFolder(clientData);
  const folder = null;
  generateLiabilityPDF(clientData, folder);
}

async function generateLiabilityPDF(clientData, destinationFolder) {
  console.log("Generating liability PDF...");
  const pdfConst = LIABILITY_FORM_TO_PDF_MAP_SP;
  try {
    const pdfDoc = await loadGoogleFileToPdfLib(pdfConst.id);
    const pdfForm = pdfDoc.getForm();

    //const pdfFields = pdfForm.getFields()
    //pdfFields.forEach(field => console.log(field.getName()))

    const liabilityData = getLiabilityData(clientData);
    fillLiabilityForm(pdfForm, pdfConst.form, liabilityData);
    pdfForm.flatten();
    sign(pdfDoc, pdfConst.signature, clientData.signature);

    const title = `${liabilityData.participantName} - ${pdfConst.title} - ${liabilityData.date}`;
    savePdfLibDocToGoogle(pdfDoc, destinationFolder, title);
  } catch (e) {
    console.error(e.message);
    if (errDetails != {}) Logger.log(errDetails);
    throw new Error("Could not generate Liability PDF");
  }
}

function formatDate(date) {
  const DD_MM_YY_FORMATTER = new Intl.DateTimeFormat("fr-FR");
  return DD_MM_YY_FORMATTER.format(date);
}

function getLiabilityData(clientData) {
  return {
    shop: "Utila Dive Center",
    participantName: `${clientData.first_name} ${clientData.last_name}`,
    date: formatDate(clientData.date),
    di_yesNo: clientData.di,
    di_policyNb: clientData.di_policy_nb.toString(),
  };
}

function fillLiabilityForm(pdfForm, map, data) {
  Object.keys(data).forEach((key) => {
    console.info("Trying to fill", key);
    try {
      if (typeof map[key] === "string") {
        fillSinglePDFField(pdfForm, map[key], data[key]);
      } else if (map[key] instanceof Array) {
        const fields = map[key];

        fields.forEach((fieldName) => {
          fillSinglePDFField(pdfForm, fieldName, data[key]);
        });
      } else {
        checkBoxValue = data[key];
        fieldIdentifier = map[key][checkBoxValue];

        if (fieldIdentifier === undefined) {
          throw Error("Received invalid value for choosing text box");
        }

        fillSinglePDFField(pdfForm, fieldIdentifier, checkBoxValue);
      }
    } catch (e) {
      console.error(e);
      throw new Error(`Failed to fill fields`, { cause: e });
    }
  });
}

const PDFLibObjectTypes = {
  TEXT: "PDFTextField",
  RADIO: "PDFRadioGroup",
  CHECKBOX: "PDFCheckBox",
};

function isTextField(pdfField) {
  return pdfField.constructor.name == PDFLibObjectTypes.TEXT;
}

function isRadioField(pdfField) {
  return pdfField.constructor.name == PDFLibObjectTypes.RADIO;
}

function isCheckBox(pdfField) {
  return pdfField.constructor.name == PDFLibObjectTypes.CHECKBOX;
}

function fillSinglePDFField(pdfForm, pdfFieldIdentifier, fillValue) {
  console.log(pdfFieldIdentifier);
  pdfField = pdfForm.getField(pdfFieldIdentifier);
  console.log(pdfField);

  if (isTextField(pdfField)) {
    console.log("Set Field", pdfFieldIdentifier, fillValue);

    pdfField.setText(fillValue);
  } else if (isRadioField(pdfField)) {
    console.log("Selected Field", pdfFieldIdentifier, fillValue);

    pdfField.select(fillValue);
  } else if (isCheckBox(pdfField)) {
    console.log("Checked Field", pdfFieldIdentifier, fillValue);
    pdfField.check();
  } else {
    console.warn(`Received unhandled field type: ${pdfField.constructor.name}`);
  }
}

async function generateMedicalPDF(clientData, destinationFolder) {
  const pdfConst = MEDICAL_FORM_TO_PDF_MAP;
  const pdfDoc = await loadGoogleFileToPdfLib(pdfConst.id);
  const pdfForm = pdfDoc.getForm();

  const medicalData = transformDataFromMedical(clientData);

  try {
    fillMedicalForm(pdfForm, pdfConst.form, medicalData);
    sign(pdfDoc, pdfConst.signature, clientData.signature);

    const title = `${medicalData.participantName} - ${pdfConst.title} - ${medicalData.date}`;
    savePdfLibDocToGoogle(pdfDoc, destinationFolder, title);
  } catch (e) {
    console.error(e);
    throw new Error("Couldn't fill medical form", { cause: e });
  }
}

function transformDataFromMedical(data) {
  const today = formatDate(new Date(data.date));
  const dob = formatDate(new Date(data.dob));
  return {
    ...data,
    participantName: `${data.first_name} ${data.last_name}`,
    shop: "Utila Dive Center",
    date: today,
    dob: dob,
  };
}

function testMedical() {
  const clientData = {
    first_name: "T",
    last_name: "M",
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
    GA_1: "",
    qG_2: "",
    qG_3: "",
    qG_4: "",
    signature:
      "data:image/png;base64,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",
  };

  const destFolder = DriveApp.getFolderById(DESTINATION_FOLDER_ID);

  generateMedicalPDF(clientData, destFolder);
}

function fillMedicalForm(pdfForm, answerToDocMap, clientData) {
  for (const question in clientData) {
    if (!question.includes("q")) continue;

    const fieldName = answerToDocMap[question][clientData[question]];

    if (!fieldName) continue;
    pdfForm.getField(fieldName).check();
  }

  answerToDocMap.participantName.forEach((nameInForm) => {
    pdfForm.getField(nameInForm).setText(clientData.participantName);
  });

  answerToDocMap.dob.forEach((dobInForm) => {
    pdfForm.getField(dobInForm).setText(clientData.dob);
  });

  pdfForm.getField(answerToDocMap.date).setText(clientData.date);
}

async function loadGoogleFileToPdfLib(id) {
  const file = DriveApp.getFileById(id);
  const existingPdfBytes = Uint8Array.from(file.getBlob().getBytes());
  try {
    const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
    return pdfDoc;
  } catch (error) {
    console.error("Error loading PDF:", error.message, "docId:", id);
    throw new Error("Error loading PDF template");
  }
}

async function savePdfLibDocToGoogle(pdfDoc, destinationFolder, name) {
  const pdfBytes = await pdfDoc.save();

  const blob = Utilities.newBlob(pdfBytes).setContentType(MimeType.PDF).setName(name);
  destinationFolder.createFile(blob);
}

async function sign(pdfDoc, map, signature) {
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
