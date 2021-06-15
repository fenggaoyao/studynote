const EventEmitter = require('events')

const ev = new EventEmitter()

ev.on('事件1', () => {
  console.log('事件1执行了')
})

ev.on('事件1', () => {
  console.log('2222')
})

ev.emit('事件1')
