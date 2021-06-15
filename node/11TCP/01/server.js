const net = require('net')

// 创建服务端实例
const server = net.createServer()

const PORT = 1234
const HOST = 'localhost'

server.listen(PORT, HOST)

server.on('listening', () => {
  console.log(`服务端已经开启在 ${HOST}: ${PORT}`)
})

// 接收消息 回写消息
server.on('connection', (socket) => {
  socket.on('data', (chunk) => {
    const msg = chunk.toString()
    console.log(msg)

    // 回数据
    socket.write(Buffer.from('您好' + msg))
  })
})

server.on('close', () => {
  console.log('服务端关闭了')
})

server.on('error', (err) => {
  if (err.code == 'EADDRINUSE') {
    console.log('地址正在被使用')
  }else{
    console.log(err)
  }
})