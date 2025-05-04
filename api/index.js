// import express from "express";
// import path from "path";
// import fs from "fs";
// // import pageRouter from "./Router"; // Import the router
// const app = express();

// const root = path.join(__dirname, "../public");
// app.use((req, res, next) => {
//   const file = req.url === "/" ? "index.html" : req.url + ".html"; // Add .html extension
//   const filePath = path.join(root, file);

//   console.log(filePath);
//   fs.promises
//     .access(filePath, fs.constants.F_OK)
//     .then(() => res.sendFile(filePath)) // Serve the file if it exists
//     .catch(() => next()); // Otherwise, move to the next middleware (404 handler)
// });

// // Optional: A 404 handler to respond with a 404 if no file is found
// app.use((req, res) => {
//   res.status(404).send("Not Found");
// });

// // Use the pageRouter for routes starting with `/pages`
// // app.use("/", pageRouter);

// // app.get("/", (req, res) => res.send("Express on Vercel ESM"));

// export default app;

import express from "express";
import path from "path";
import indexRouter from "./Router.js";
// import FormProcessor from "../src/backend/FormProcessor.js";

const app = express();

const __dirname = import.meta.dirname;

// Set EJS as the view engine
app.set("view engine", "ejs");

// Set views directory
app.set("views", path.join(__dirname, "../views"));

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());

// Use routes
app.use("/", indexRouter);

// app.post("/form", (req, res) => {
//   const { formId, ...formObject } = req.body;
//   try {
//     FormProcessor.processForm(formId, formObject);
//   } catch (e) {
//     console.error(e.message);
//   } finally {
//     res.send("Form submitted");
//   }

// });

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

export default app;
