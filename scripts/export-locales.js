const fs = require("fs");
const path = require("path");

// Input and output directories
const fileName = "locales.html";
const inputDir = path.join(__dirname, "../locales");
const outputDir = path.join(__dirname, "../dist");
const outputFile = path.join(outputDir, fileName);

// Check for the `--watch` flag
const args = process.argv.slice(2);
const isWatchMode = args.includes("--watch");

// Debounce implementation
let debounceTimeout;
const debounce = (func, delay) => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(func, delay);
};

if (isWatchMode) {
  console.info("Running in watch mode...");
  createLocales(); // Initial execution

  // Set up a watcher on the input directory
  fs.watch(inputDir, { recursive: true }, (eventType, filename) => {
    if (filename && path.extname(filename) === ".json") {
      console.info(`Detected change in ${filename}, updating dist file...`);
      debounce(createLocales, 2000); // Debounce to avoid rapid updates
    }
  });
} else {
  console.info("Running in single execution mode...");
  createLocales();
}

function createLocales() {
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Start building the content for the output file
  let fileContent = "<!-- Automatically generated file - DO NOT EDIT -->\n\n";

  // Read all JSON files in the input directory
  fs.readdir(inputDir, (err, files) => {
    if (err) {
      console.error("Error reading i18n directory:", err);
      return;
    }

    fileContent += `<script>\n const locales = {\n`;

    files.forEach((file) => {
      if (path.extname(file) === ".json") {
        const lang = path.basename(file, ".json"); // Get file name without extension
        const filePath = path.join(inputDir, file);

        // Read and parse the JSON content
        const jsonContent = fs.readFileSync(filePath, "utf-8");

        // Append the content as a constant to the output file
        fileContent += `${lang}: {\n  "translation": ${jsonContent}},\n`;
      }
    });

    fileContent += "};\n </script>\n";

    // Write the content to the output file
    fs.writeFile(outputFile, fileContent, (writeErr) => {
      if (writeErr) {
        console.error(`Error writing ${fileName}`, writeErr);
      } else {
        console.log(`Locales successfully exported to ${outputFile}`);
      }
    });
  });
}
