const url = require("url");
const { System, applyImportMap, setBaseUrl } = require("systemjs");

// Setting base URL is optional - the default is to use process.cwd()
// so the code here is redundant
const basePath = url.pathToFileURL(process.cwd()).href;
setBaseUrl(System, basePath);

applyImportMap(System, {
  imports: {
    md5: "./md5.js",
  },
});

System.import("md5").then((md5) => {
  console.log("md5 module", md5);
});
