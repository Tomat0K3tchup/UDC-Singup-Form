import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Home Page",
    page: "home",
  });
});

router.get("/udc", (req, res) => {
  const pkg = _sanitizePkg(req.query.pkg);
  res.render("index", {
    title: "UDC",
    page: "udc",
    pkg: pkg,
  });
});

router.get("/liability", (req, res) => {
  const pkg = _sanitizePkg(req.query.pkg);
  res.render("index", {
    title: "Liability Release",
    page: "liability",
    pkg: pkg,
  });
});

router.get("/medical", (req, res) => {
  const pkg = _sanitizePkg(req.query.pkg);
  res.render("index", {
    title: "Diver Medical",
    page: "medical",
    pkg: pkg,
  });
});

router.get("/test", (req, res) => {
  res.render("test");
});

function _sanitizePkg(reqPkg) {
  const allowedPkg = ["fd", "ow", "aow", "goPro"];
  const pkg = reqPkg && allowedPkg.includes(reqPkg) ? reqPkg : "fd";

  return pkg;
}

export default router;
