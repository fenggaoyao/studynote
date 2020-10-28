const cron = require('node-cron')

const http = require("http")
let i = 0
cron.schedule("1/* * * * *", function () {
    console.log("hello cron")
    i++
})


const server = http.createServer((req, res) => {
    console.log('request received');
    console.log(Date(), req.headers)
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.setHeader('server', 'node.js http server');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('X-Foo', 'bar');


    res.end(`<!DOCTYPEhtml><html lang="en" maaa=a><head><metacharset="utf-8"/><title>HypertextTransferProtocol</title><style>body{font-size:100px;}</style></head><body><h1>${i}</h1> </body></html>`)

    //res.end("ok")


});
server.listen(8088)