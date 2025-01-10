const MEDICAL_PDF_ID = "1FN5e_z_5bvIqXuaU1ho08awKCL9AGQ8m";
const MEDICAL_PDF_ID_SPA = "1-c85xqY8GSalZBMHWVG4cuQAV20JOf-R";

function transformDataFromMedical(data) {
  const today = formatDate(new Date());
  const dob = formatDate(new Date(data.dob));
  return {
    ...data,
    participantName: `${data.first_name} ${data.last_name}`,
    date: today,
    dob: dob,
  };
}

async function generateMedicalPDF(clientData) {
  const pdfDoc = await loadGoogleFileToPdfLib(MEDICAL_PDF_ID);
  const pdfForm = pdfDoc.getForm();

  try {
    fillMedicalForm(pdfForm, MEDICAL_FORM_ANSWER_TO_DOC_MAP);
  } catch (e) {
    Logger.log(e);
  }
  const title = `${clientData.participantName} - Medical Form - ${clientData.date}`;
  savePdfLibDocToGoogle(pdfDoc, DESTINATION_FOLDER_ID, title);
}

async function loadGoogleFileToPdfLib(id) {
  const file = DriveApp.getFileById(id);
  const existingPdfBytes = Uint8Array.from(file.getBlob().getBytes());
  const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
  return pdfDoc;
}

async function savePdfLibDocToGoogle(pdfDoc, folderId, name) {
  const pdfBytes = await pdfDoc.save();

  const blob = Utilities.newBlob(pdfBytes).setContentType(MimeType.PDF).setName(name);
  DriveApp.getFolderById(folderId).createFile(blob);
}

function fillMedicalForm(pdfForm, answerToDocMap) {
  for (const question in clientData) {
    if (!question.includes("q")) {
      continue;
    }
    const field = pdfForm.getField(answerToDocMap[question][clientData[question]]);
    field.check();
  }

  answerToDocMap.participantName.forEach((nameInForm) => {
    pdfForm.getField(nameInForm).setText(clientData.participantName);
  });

  answerToDocMap.dob.forEach((dobInForm) => {
    pdfForm.getField(dobInForm).setText(clientData.participantName);
  });

  pdfForm.getField(answerToDocMap.date).setText(clientData.date);
}
