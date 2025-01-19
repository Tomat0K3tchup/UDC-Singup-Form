export function withWatchMode(fn, inputDir) {
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
    fn(); // Initial execution

    // Set up a watcher on the input directory
    fs.watch(inputDir, { recursive: true }, (eventType, filename) => {
      if (filename && path.extname(filename) === ".json") {
        debounce(fn, 2000); // Debounce to avoid rapid updates
      }
    });
  } else {
    console.info("Running in single execution mode...");
    fn();
  }
}
