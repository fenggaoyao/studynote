const EventEmitter = require('events')

const ev = new EventEmitter()

// on 
/* ev.on('事件1', () => {
  console.log('事件1执行了---2')
})

ev.on('事件1', () => {
  console.log('事件1执行了')
})

// emit
ev.emit('事件1')
ev.emit('事件1') */

// once 
/* ev.once('事件1', () => {
  console.log('事件1执行了')
})
ev.once('事件1', () => {
  console.log('事件1执行了--2')
})

ev.emit('事件1')
ev.emit('事件1') */

// off
/* let cbFn = (...args) => {
  console.log(args)
}
ev.on('事件1', cbFn) */

/* ev.emit('事件1')
ev.off('事件1', cbFn) */
// ev.emit('事件1', 1, 2, 3)

/* ev.on('事件1', function () {
  console.log(this)
})
ev.on('事件1', function () {
  console.log(2222)
})

ev.on('事件2', function () {
  console.log(333)
})

ev.emit('事件1') */

const fs = require('fs')

const crt = fs.createReadStream()
crt.on('data')