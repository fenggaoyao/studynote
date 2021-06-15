const http = require('http')

// 创建服务端
let server = http.createServer((req, res) => {
  // 针对于请求和响应完成各自的操作
  console.log('1111')
})
server.listen(1234, () => {
  console.log('server is running......')
})