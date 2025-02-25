// import express from "express";
// import { getPageHTMLOutput } from "./pageHelper"; // Assuming getPageHTMLOutput is in a separate file

// const root = path.join(__dirname, "/public");

// const router = express.Router();

// router.get("/:pageName", (req, res) => {
//   const { pageName } = req.params;
//   const params = req.query; // Assuming query params are being passed in URL

//   const pageContent = getPage(pageName, params);

//   res.send(pageContent); // Send the rendered HTML as the response
// });

// app.use((req, res, next) => {
//   const file = req.url + ".html";
//   fs.exists(path.join(root, file), (exists) => (exists ? res.sendFile(file, { root }) : next()));
// });

// // Helper function
// function getPage(pageName, params = {}) {
//   const basePath = "dist/frontend/pages";
//   let pageInfo;

//   switch (pageName) {
//     case "admin/test":
//       pageInfo = { path: "admin/test", title: "UDC test" };
//       break;
//     case "safeDiving":
//       pageInfo = { path: "forms/safeDiving", title: "" };
//       break;
//     case "tAndC":
//       pageInfo = { path: "forms/tAndC", title: "" };
//       break;
//     case "liability":
//       pageInfo = { path: "forms/liability", title: "" };
//       break;
//     case "home":
//       pageInfo = { path: "home", title: "" };
//       break;
//     case "medical":
//       pageInfo = { path: "forms/medical", title: "" };
//       break;
//     case "udc":
//       pageInfo = { path: "forms/udc", title: "" };
//       break;
//     default:
//       pageInfo = { path: "index", title: "UDC signup form" };
//   }

//   pageInfo.path = `${basePath}/${pageInfo.path}`;
//   return getPageHTMLOutput(pageInfo, params);
// }

// export default router;

import express from "express";
import path from "path";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Home Page",
    page: "home",
  });
});

router.get("/page1", (req, res) => {
  res.render("index", {
    title: "Page 1",
    page: "page1",
  });
});

router.get("/page2", (req, res) => {
  res.render("index", {
    title: "Page 2",
    page: "page2",
  });
});

export default router;
