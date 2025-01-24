function getRoute(req) {
  const baseRoute = "dist/frontend/pages";
  let pageInfo = {
    fileName: "index",
    title: "UDC signup form",
  };

  if (req.pathInfo == "admin/test") {
    pageInfo.fileName = "test";
    pageInfo.title = "UDC test";
  }

  if (req.pathInfo == "safeDiving") {
    pageInfo.fileName = "safeDiving";
    pageInfo.title = "UDC Terms and Conditions";
  }

  if (req.pathInfo == "tAndC") {
    pageInfo.fileName = "tAndC";
    pageInfo.title = "UDC Terms and Conditions";
  }

  if (req.pathInfo == "liability") {
    pageInfo.fileName = "liability";
    pageInfo.title = "UDC Liability";
  }

  if (req.pathInfo == "medical") {
    pageInfo.fileName = "medical";
    pageInfo.title = "Padi Medical Form";
  }

  //   if (req.pathInfo == "admin/reception") {
  //     pageInfo.fileName = "reception";
  //     pageInfo.title = "UDC admin reception form";
  //   }

  pageInfo.fileName = `${baseRoute}/${pageInfo.fileName}`;

  return pageInfo;
}
