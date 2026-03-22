import express from "express";

const router = express.Router();

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
