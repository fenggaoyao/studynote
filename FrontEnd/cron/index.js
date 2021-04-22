const cron = require('node-cron')
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const vm = require('vm')
const exec = require('child_process').execSync


const http = require("http")

cron.schedule("1/* * * * *", async function () {
    await exec("node f.js >> result.txt");
})


const server = http.createServer((req, res) => {
    console.log('request received');
    console.log(Date(), req.headers)
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.setHeader('server', 'node.js http server');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('X-Foo', 'bar');


    res.end(`<!DOCTYPEhtml><html lang="en" maaa=a><head><metacharset="utf-8"/><title>HypertextTransferProtocol</title><style>body{font-size:100px;}</style></head><body><h1>hello</h1> </body></html>`)

    //res.end("ok")


});
server.listen(8088)