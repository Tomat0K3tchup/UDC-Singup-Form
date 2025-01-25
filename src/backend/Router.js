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
      pageInfo = { path: "safeDiving", title: "" };
      break;
    case "tAndC":
      pageInfo = { path: "tAndC", title: "" };
      break;
    case "liability":
      pageInfo = { path: "liability", title: "" };
      break;
    case "home":
      pageInfo = { path: "home", title: "" };
      break;
    case "medical":
      pageInfo = { path: "medical", title: "" };
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
    .setFaviconUrl("https://utiladivecenter.com/img/logo/UDC-LOGO-TINY.png");
}

function getPageContent(pageName, params) {
  return getPage(pageName, params).getContent();
}
