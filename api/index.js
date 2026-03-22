import express from "express";
import path from "path";
import indexRouter from "./Router.js";

const app = express();

const __dirname = import.meta.dirname;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use("/", indexRouter);

export default app;
