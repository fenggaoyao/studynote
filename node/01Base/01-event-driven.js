const EventEmitter = require('events')

const myEvent = new EventEmitter()

myEvent.on('事件1', () => {
  console.log('事件1执行了')
})

myEvent.on('事件1', () => {
  console.log('事件1-2执行了')
})

myEvent.emit('事件1')