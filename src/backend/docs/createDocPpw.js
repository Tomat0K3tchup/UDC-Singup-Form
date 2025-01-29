const TEMPLATE_FILE_ID = "1KC-eK-c23lJdM4egjqk60v3l9SbQ0_ZW9KCPa-EEZPQ";
const DESTINATION_FOLDER_ID = "1eUidUtWoJaFE6MzZE-9p3exhd03UNagU";
// FIXME: use properties
const DEBUG_CREATE_FILE = true;
const DEBUG_FILE_ID = "1gI_7XX1kzRNJXaYkVTbqmUEZK_OD3kKVGR_mIxPwJts";

function createTemplatedDoc(destinationFolder) {
  // FIXME: no partial updates
  var template = DriveApp.getFileById(TEMPLATE_FILE_ID);
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
      if (key == "dob" || key.includes("date")) {
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
      console.warn(e.message);
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
  var file = createTemplatedDoc(destinationFolder);
  var doc = DocumentApp.openById(file.getId());

  searchAndReplace(doc, data);
  insertImageAndExport(doc, data.signature);
  file.setName(`${data.first_name} ${data.last_name} - ${formatDate(data.date)}`);
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0"); // Get the day and pad with 0 if needed
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
  const year = date.getFullYear(); // Get the full year

  return `${day}-${month}-${year}`;
}

function insertImageAndExport(doc, base64String) {
  if (!base64String) throw new Error("Please provide a signature for the customer");
  const dataPart = base64String.split(",")[1];

  if (!dataPart) throw new Error("The provided signature is invalid");
  var blob = Utilities.newBlob(Utilities.base64Decode(dataPart));

  doc.getBody().appendImage(blob);

  // // Export to PDF
  // var docBlob = doc.getAs('application/pdf');
  // /* Add the PDF extension */
  // docBlob.setName(doc.getName() + ".pdf");
  // var file = DriveApp.createFile(docBlob);
  // console.log(file.getUrl());

  // // Alternatively you can upload the image to Drive too if you like.
  // var mimeType = eval("MimeType." + base64String.split(",")[0].split("/")[1].split(";")[0].toUpperCase());

  // var blob = Utilities.newBlob(decoded, mimeType, "nameOfImage");
  // var image = DriveApp.createFile(blob);
}
