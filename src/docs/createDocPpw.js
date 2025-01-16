const TEMPLATE_FILE_ID = "1KC-eK-c23lJdM4egjqk60v3l9SbQ0_ZW9KCPa-EEZPQ";
const DESTINATION_FOLDER_ID = "1eUidUtWoJaFE6MzZE-9p3exhd03UNagU";

const DEBUG_CREATE_FILE = true;
const DEBUG_FILE_ID = "1gI_7XX1kzRNJXaYkVTbqmUEZK_OD3kKVGR_mIxPwJts";

function createTemplatedDoc(destinationFolder) {
  var template = DriveApp.getFileById(TEMPLATE_FILE_ID);
  return template.makeCopy(destinationFolder);
}

function searchAndReplace(doc, data) {
  var body = doc.getBody();

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
      body.replaceText(`{{${key}}}`, value);
    } catch (e) {}
  }
}

// function test() {
//   var doc = DocumentApp.openById(TEMPLATE_FILE_ID);
//   var paragraphs = doc.getBody().getParagraphs();
//   paragraphs.forEach((paragraph) => {
//     if (paragraph.getType() == DocumentApp.ElementType.LIST_ITEM)
//       console.log(paragraph.getText(), paragraph.getAttributes());
//   });
// }

function createCustomerDoc(data, destinationFolder) {
  var file = createTemplatedDoc(destinationFolder);
  var doc = DocumentApp.openById(file.getId());

  console.log(data);

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
  // Sample image in base64

  // decode the image to make a blob
  var decoded = Utilities.base64Decode(base64String.split(",")[1]);
  var blob = Utilities.newBlob(decoded);

  // Append the image as blob
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
