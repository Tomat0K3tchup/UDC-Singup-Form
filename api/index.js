import express from "express";
import path from "path";
import indexRouter from "./Router.js";

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

// app.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// });

export default app;
