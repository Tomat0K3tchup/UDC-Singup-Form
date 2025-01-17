import * as fs from "fs";
import * as path from "path";
import * as prettier from "prettier";

const __dirname = import.meta.dirname;

console.log(__dirname);

// Input and output directories
const inputDir = path.join(__dirname, "../locales");

const fileName = "locales.html";
const outputDir = path.join(__dirname, "../dist");
const outputFile = path.join(outputDir, fileName);

const prettierOptions = await prettier.resolveConfig(__dirname);

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

async function createLocales() {
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Start building the content for the output file
  let fileContent = "";

  // Read all JSON files in the input directory
  const allLocales = fs
    .readdirSync(inputDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  allLocales.forEach((lang) => {
    let langContent = "";
    const namespace = fs.readdirSync(path.join(inputDir, lang));
    namespace.forEach((file) => {
      if (path.extname(file) === ".json") {
        const ns = path.basename(file, ".json"); // Get file name without extension
        const filePath = path.join(inputDir, lang, file);

        // Read and parse the JSON content
        const jsonContent = fs.readFileSync(filePath, "utf-8");

        // Append the content as a constant to the output file
        langContent += `${ns}: ${jsonContent},\n`;
      }
    });
    fileContent += `${lang}: {${langContent}},`;
  });

  fileContent = `<script>const locales = {${fileContent}};</script>`;
  fileContent = "<!-- Automatically generated file - DO NOT EDIT -->\n\n" + fileContent;

  const formattedFile = await prettier.format(fileContent, {
    ...prettierOptions,
    parser: "html",
  });

  // Write the content to the output file
  fs.writeFileSync(outputFile, formattedFile, (writeErr) => {
    if (writeErr) {
      console.error(`Error writing ${fileName}`, writeErr);
    } else {
      console.log(`Locales successfully exported to ${outputFile}`);
    }
  });
}
