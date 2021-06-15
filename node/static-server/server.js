const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const mime = require('mime')

const server = http.createServer((req, res) => {
  // console.log('请求进来了')
  // 1 路径处理
  let {pathname, query} = url.parse(req.url)
  pathname = decodeURIComponent(pathname)
  let absPath = path.join(__dirname, pathname)
  // console.log(absPath)
  // 2 目标资源状态处理
  fs.stat(absPath, (err, statObj) => {
    if(err) {
      res.statusCode = 404
      res.end('Not Found')
      return
    }
    if (statObj.isFile()) {
      // 此时说明路径对应的目标是一个文件，可以直接读取然后回写
      fs.readFile(absPath, (err, data) => {
        res.setHeader('Content-type', mime.getType(absPath) + ';charset=utf-8')
        res.end(data)
      })
    } else {
      fs.readFile(path.join(absPath, 'index.html'), (err, data) => {
        res.setHeader('Content-type', mime.getType(absPath) + ';charset=utf-8')
        res.end(data)
      })
    }
  })
})
server.listen(1234, () => {
  console.log('server is start.....')
})