const http = require("http");
const https = require("https");
const fs = require("fs");
const unzip = require("unzipper");

const host = "localhost" //localhost

const server = http.createServer((req, res) => {
  if (req.url.match(/^\/auth/)) {
    return auth(req, res);
  }
  if (!req.url.match(/^\/?/)) {
    res.writeHead(404, {
      "Content-Type": "text/plain",
    });
    return res.end("not found");
  }

  if (req.url.match(/^\/favicon.ico/)) {
    res.writeHead(404, {
      "Content-Type": "text/plain",
    });
    res.end("Not Found");
    return;
  }

  if (req.url.match(/^\/\?filename=/)) {
    // OAuth Start

    const options = {
      hostname: "api.github.com",
      port: 443,
      path: "/user",
      method: "GET",
      headers: {
        Authorization: `token ${req.headers.token}`,
        "User-Agent": "toy-publish",
      },
    };
    console.log("options " + JSON.stringify(options));

    //发起请求
    const request = https.request(options, (response) => {
      let body = "";
      response.on("data", (d) => {
        if (d) {
          body += d.toString();
        }
      });

      response.on("end", () => {

        //根据user进行处理,这里进行权
        let user = JSON.parse(body);
        console.log(user);

        const writeStrem = unzip.Extract({
          path: "../server/public",
        });
        req.pipe(writeStrem);
        req.on("end", () => {
          res.writeHead(200, {
            "Content-Type": "text/plain",
          });
          res.end("okay");
        });
      });
    });
    request.on("error", (e) => {
      console.error(e);
    });
    request.end();

  }

  const fileSys = () => {
    let matched = req.url.match(/filename=([^&]+)/);
    let filename = matched && matched[1];
    // console.log(filename);
    if (!filename) {
      return;
    }

    // let writeStream = fs.createWriteStream('../server/public/' + filename);

    let writeStream = unzip.Extract({
      path: "../server/public",
    });
    req.pipe(writeStream);

    // 与 pipe 等效
    // req.on('data', trunk => {
    //   writeStream.write(trunk);
    // })
    // req.on('end', trunk => {
    //   writeStream.end(trunk);
    // })

    req.on("end", () => {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end("okay");
    });
  };
  // fileSys();


});

server.listen(8088);

function auth(req, res) {
  //获取授权码
  let code = req.url.match(/code=([^&]+)/)[1];
  console.log("获取授权码", code);

  let state = "abc123";
  let client_id = "Iv1.04da7de61ecd6c5a";
  let client_secret = "0c3f4d8b2258a1e92e0e3cae4bb27091313fe3da";
  let redirect_uri = encodeURIComponent(`http://${host}:8088/auth`);

  let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`;

  const options = {
    hostname: "github.com",
    port: 443,
    path: `/login/oauth/access_token?${params}`,
    method: "POST",
  };

  const request = https.request(options, (response) => {
    response.on("data", (d) => {
      console.log(d.toString());
      let result = d.toString().match(/access_token=([^&]+)/);
      if (result) {
        let token = result[1]; //access token
        console.log("access_token", token);
        res.writeHead(200, {
          token: token,
          "Content-Type": "text/html",
        });
        res.end(
          `<a href="http://localhost:8080/publish?token=${token}">publish</a>`
        );
      } else {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("error");
      }
    });
  });

  request.on("error", (e) => {
    console.error(e);
  });
  request.end();
}