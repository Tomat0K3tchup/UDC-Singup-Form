const MEDICAL_PDF_ID = "1FN5e_z_5bvIqXuaU1ho08awKCL9AGQ8m";

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
  /** Loading file. For reasons unknown it's not possible to put it in it's own function */
  const file = DriveApp.getFileById(MEDICAL_PDF_ID);
  const existingPdfBytes = Uint8Array.from(file.getBlob().getBytes());
  const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
  // const pdfDoc =  loadGoogleFileToPdfLib(MEDICAL_PDF_ID)

  const pdfForm = pdfDoc.getForm();

  // const clientData = { q1: true, q2: false, q3: false, q4: false, q5: false, q6: false, q7: false, q8: false, q9: false, q10: false, q1_1: true, q1_2: false, q1_3: false, q1_4: false, q1_5: true    };
  try {
    for (const question in clientData) {
      if (!question.includes("q")) {
        continue;
      }
      const field = pdfForm.getField(FORM_TO_PDF_MAP[question][clientData[question]]);
      field.check();
    }

    pdfForm.getField("Participant Name Print").setText(clientData.participantName);
    pdfForm.getField("Participant").setText(clientData.participantName);
    pdfForm.getField("Participant Name").setText(clientData.participantName);
    pdfForm.getField("Participant Name2").setText(clientData.participantName);

    pdfForm.getField("Birthdate").setText(clientData.dob);
    pdfForm.getField("Birthdate2").setText(clientData.dob);

    pdfForm.getField("Date ddmmyyyy").setText(clientData.date);
  } catch (e) {
    Logger.log(e);
  }
  const title = `${clientData.participantName} - Medical Form - ${clientData.date}`;
  savePdfLibDocToGoogle(pdfDoc, DESTINATION_FOLDER_ID, title);
}

async function loadGoogleFileToPdfLib(id) {
  const file = DriveApp.getFileById(MEDICAL_PDF_ID);
  const existingPdfBytes = Uint8Array.from(file.getBlob().getBytes());
  const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
  return pdfDoc;
}

async function savePdfLibDocToGoogle(pdfDoc, folderId, name) {
  const pdfBytes = await pdfDoc.save();

  const blob = Utilities.newBlob(pdfBytes).setContentType(MimeType.PDF).setName(name);
  DriveApp.getFolderById(folderId).createFile(blob);
}
