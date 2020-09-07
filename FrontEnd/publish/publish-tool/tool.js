const http = require("http");
const archiver = require("archiver");
const child_process = require("child_process");
let packageName = "./package";

const redirect_uri = encodeURIComponent("http://localhost:8081/auth");
const url = `https://github.com/login/oauth/authorize?client_id=Iv1.04da7de61ecd6c5a&redirect_uri=${redirect_uri}`;

//mac open,windows使用start
child_process.exec(`start ${url}`);

const server = http.createServer((request, res) => {
  console.log(request.url);
  if (request.url.match(/^\/favicon.ico/)) {
    res.writeHead(404, {
      "Content-Type": "text/plain"
    });
    res.end("Not Found");
    return;
  }

  let token = request.url.match(/token=([^&]+)/)[1];
  console.log("token " + token);

  const options = {
    host: "localhost",
    port: 8081,
    path: "/?filename=package.zip",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      token: token,
    },
  };

  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  });

  req.on(`error`, (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  var archive = archiver("zip", {
    zlib: {
      level: 9,
    },
  });

  archive.directory(packageName, false);

  archive.finalize();

  archive.pipe(req);

  archive.on("end", () => {
    req.end();
  });
});
server.listen(8080);