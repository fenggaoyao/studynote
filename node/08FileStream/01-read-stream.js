const fs = require('fs')
const EventEmitter = require('events')

class MyFileReadStream extends EventEmitter{
  constructor(path, options = {}) {
    super()
    this.path = path
    this.flags = options.flags || "r"
    this.mode = options.mode || 438
    this.autoClose = options.autoClose || true 
    this.start = options.start || 0
    this.end = options.start 
    this.highWaterMark = options.highWaterMark || 64 * 1024 

    this.open()
  }
  open() {
    // 原生 open 方法来打开指定位置上的文件
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) {
        this.emit('error', err)
      }
      this.fd = fd
      this.emit('open', fd)
    })
  }
}

let rs = new MyFileReadStream('test.txt')

rs.on('open', (fd) => {
  console.log('open', fd)
})

rs.on('error', (err) => {
  console.log(err)
})
