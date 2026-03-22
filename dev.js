import express from "express";
import path from "path";
import app from "./api/index.js";

const __dirname = import.meta.dirname;

// Mimic Vercel cleanUrls + redirect locally
const devApp = express();
devApp.get("/", (req, res) => res.redirect(308, "/home"));
devApp.use(express.static(path.join(__dirname, "public"), { extensions: ["html"] }));
devApp.use(app);

const PORT = process.env.PORT || 3000;
devApp.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
