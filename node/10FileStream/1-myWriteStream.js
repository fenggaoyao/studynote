const fs = require('fs')
const EventsEmitter = require('events')
const Queue = require('./linkedlist')

class MyWriteStream extends EventsEmitter{
  constructor(path, options={}) {
    super()
    this.path = path
    this.flags = options.flags || 'w'
    this.mode = options.mode || 438
    this.autoClose = options.autoClose || true 
    this.start = options.start || 0
    this.encoding = options.encoding || 'utf8'
    this.highWaterMark = options.highWaterMark || 16*1024

    this.open()
  }
  open() {
    // 原生 fs.open 
    fs.open(this.path, this.flags, (err, fd) => {
      if (err) {
        this.emit('error', err)
      }
      // 正常打开文件
      this.fd = fd 
      this.emit('open', fd)
    })
  }
}

const ws = new MyWriteStream('./f9.txt', {})

ws.on('open', (fd) => {
  console.log('open---->', fd)
})