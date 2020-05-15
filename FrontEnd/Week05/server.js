const http=require("http")

const server=http.createServer((req,res)=>{
    console.log('request received');
    console.log(req.headers)
    res.setHeader('Content-Type','text/html');
    res.setHeader('X-Foo','bar');
    res.writeHead(200,{'Content-Type':'text/plain'})
    //res.end("ok")
    res.end('<!DOCTYPEhtml><htmllang="en"><head><metacharset="utf-8"/><title>HypertextTransferProtocol</title><style>body{font-size:100px;}</style></head><body><h1>helloworld</h1></body></html>')

    // res.end(`
    // <!DOCTYPE html>
    // <html lang="en">
    // <head>
    //   <meta charset="utf-8" />
    //   <title>Hypertext Transfer Protocol</title>
    //   <style>
    //     body { font-size: 100px; }
    //   </style>
    // </head>
    // <body>
    //   <h1>hello world</h1>
    // </body>
    // </html>
    //   `);
});
server.listen(8088)