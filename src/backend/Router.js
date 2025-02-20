function getPage(pageName, params = {}) {
  const basePath = "dist/frontend/pages";
  switch (pageName) {
    case "admin/test":
      pageInfo = { path: "admin/test", title: "UDC test" };
      break;
    // case "admin/reception":
    //   pageInfo = { path: "admin/reception", title: "UDC test" };
    //   break;
    case "safeDiving":
      pageInfo = { path: "forms/safeDiving", title: "" };
      break;
    case "tAndC":
      pageInfo = { path: "forms/tAndC", title: "" };
      break;
    case "liability":
      pageInfo = { path: "forms/liability", title: "" };
      break;
    case "home":
      pageInfo = { path: "home", title: "" };
      break;
    case "medical":
      pageInfo = { path: "forms/medical", title: "" };
      break;

    case "udc":
      pageInfo = { path: "forms/udc", title: "" };
      break;
    default:
      pageInfo = { path: "index", title: "UDC signup form" };
  }

  pageInfo.path = `${basePath}/${pageInfo.path}`;
  return getPageHTMLOutput(pageInfo, params);
}

function getPageHTMLOutput(pageInfo, params) {
  const template = HtmlService.createTemplateFromFile(pageInfo.path);

  const validKeys = ["first_name", "last_name", "dob", "pkg"];
  const formPrefill = validKeys.reduce((o, key) => {
    if (params[key]) o[key] = params[key];
    return o;
  }, {});

  template.data = { title: pageInfo.title, form: formPrefill };

  return template
    .evaluate()
    .setTitle(pageInfo.title)
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
    .setFaviconUrl("https://utiladivecenter.com/img/logo/UDC-LOGO-TINY.png");
}

function getPageContent(pageName, params) {
  return getPage(pageName, params).getContent();
}
