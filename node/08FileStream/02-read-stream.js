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
    this.readOffset = 0

    this.open()

    this.on('newListener', (type) => {
      if (type === 'data') {
        this.read()
      }
    })
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
  read() {
    if (typeof this.fd !== 'number') {
      return this.once('open', this.read)
    }

    let buf = Buffer.alloc(this.highWaterMark)

    fs.read(this.fd, buf, 0, this.highWaterMark, this.readOffset, (err, readBytes) => {
      if (readBytes) {
        this.readOffset += readBytes
        this.emit('data', buf)
        this.read()
      } else {
        this.emit('end')
        this.close()
      }
    })
  }
  close() {
    fs.close(this.fd, () => {
      this.emit('close')
    })
  }
}

let rs = new MyFileReadStream('test.txt')

/*rs.on('open', (fd) => {
  console.log('open', fd)
})

rs.on('error', (err) => {
  console.log(err)
}) */

rs.on('data', (chunk) => {
  console.log(chunk)
})

rs.on('close', () => {
  console.log('close')
})

rs.on('end', () => {
  console.log('end')
})



