const LANG_TO_TEMPLATE_ID_MAP = {
  en: "1KC-eK-c23lJdM4egjqk60v3l9SbQ0_ZW9KCPa-EEZPQ",
  es: "1K1nt-WWDd-luARLEhCWPqPy4ztJEWiVuORHN3F-Yt34",
};

const DEFAULT_LANG = "en";

function parseLanguageCode(code) {
  if (typeof code !== "string") return null;
  return code.split("-")[0].toLowerCase();
}

function createTemplatedDoc(destinationFolder, lang) {
  // FIXME: no partial updates
  const parseLang = parseLanguageCode(lang);
  const templateKey = parseLang in LANG_TO_TEMPLATE_ID_MAP ? parseLang : DEFAULT_LANG;
  const template = DriveApp.getFileById(LANG_TO_TEMPLATE_ID_MAP[templateKey]);
  return template.makeCopy(destinationFolder);
}

function searchAndReplace(doc, data) {
  var body = doc.getBody();

  // FIXME: not so many keys
  var clientInfo = {
    ...data,
    name: `${data.first_name} ${data.last_name}`,
  };

  delete clientInfo.first_name;
  delete clientInfo.last_name;
  delete clientInfo.signature;

  for (const key in clientInfo) {
    try {
      var value;
      if (isDateKey(key) && clientInfo[key] !== "") {
        value = formatDate(new Date(clientInfo[key]));
      } else {
        value = clientInfo[key];
      }

      if (value == "Yes" || value == "No") {
        searchAndReplaceBoolean(body, key, value === "Yes");
        continue;
      }
      body.replaceText(`{{${key.toString()}}}`, value);
    } catch (e) {
      Logger.warn(e.message);
    }
  }
}

function searchAndReplaceBoolean(body, key, value) {
  // Start and end index of the element to strikethrough in the string will be added
  const spaces = 10;
  const replacementString = "Yes" + " ".repeat(spaces) + "No";
  const OFFSET_MAP = {
    // offset of No
    true: {
      offset: spaces + 3, // spaces + Yes.length - 1
      length: 1, // No.length - 1
    },
    // offset of Yes
    false: {
      offset: 0,
      length: 2, // Yes.length - 1
    },
  };
  // Find all occurrences of the pattern
  const foundElement = body.findText(`{{${key}}}`);

  if (!foundElement) {
    Logger.warn(`Boolean placeholder {{${key}}} not found in template`);
    return;
  }

  const element = foundElement.getElement();
  const start = foundElement.getStartOffset();
  const end = foundElement.getEndOffsetInclusive();

  const text = element.asText();
  text.deleteText(start, end);
  text.insertText(start, replacementString);

  const { offset, length } = OFFSET_MAP[value];
  text.setStrikethrough(start + offset, start + offset + length, true);
}

function createCustomerDoc(data, destinationFolder) {
  const lang = data.form_language;
  try {
    var file = createTemplatedDoc(destinationFolder, lang);
    var doc = DocumentApp.openById(file.getId());
  } catch (e) {
    Logger.error(e);
  }

  searchAndReplace(doc, data);
  insertImageAndExport(doc, data.signature);
  file.setName(`${data.first_name} ${data.last_name} - ${formatDate(data.date)}`);
}

function isDateKey(key) {
  return key == "dob" || key.includes("date");
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0"); // Get the day and pad with 0 if needed
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
  const year = date.getFullYear(); // Get the full year

  return `${day}-${month}-${year}`;
}

function insertImageAndExport(doc, signatureData) {
  if (!signatureData) throw new Error("Please provide a signature for the customer");

  let blob;

  // Check if signature is a URL or base64
  if (signatureData.startsWith("http")) {
    // Load signature from Google Drive URL
    try {
      const fileId = extractFileIdFromUrl(signatureData);
      const file = DriveApp.getFileById(fileId);
      blob = file.getBlob();
    } catch (e) {
      Logger.error("Failed to load signature from URL:", signatureData, e);
      throw new Error("Could not load signature from Drive");
    }
  } else {
    // Handle base64 data URL
    const dataPart = signatureData.split(",")[1];
    if (!dataPart) throw new Error("The provided signature is invalid");
    blob = Utilities.newBlob(Utilities.base64Decode(dataPart));
  }

  doc.getBody().appendImage(blob);

  // // Export to PDF
  // var docBlob = doc.getAs('application/pdf');
  // /* Add the PDF extension */
  // docBlob.setName(doc.getName() + ".pdf");
  // var file = DriveApp.createFile(docBlob);
  // console.log(file.getUrl());

  // // Alternatively you can upload the image to Drive too if you like.
  // var mimeType = eval("MimeType." + signatureData.split(",")[0].split("/")[1].split(";")[0].toUpperCase());

  // var blob = Utilities.newBlob(decoded, mimeType, "nameOfImage");
  // var image = DriveApp.createFile(blob);
}

function extractFileIdFromUrl(url) {
  // Handle different Google Drive URL formats
  // https://drive.google.com/file/d/FILE_ID/view
  // https://drive.google.com/open?id=FILE_ID
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /[?&]id=([a-zA-Z0-9_-]+)/,
    /\/d\/([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  throw new Error("Could not extract file ID from URL: " + url);
}
