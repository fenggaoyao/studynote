setTimeout(() => {
  console.log('s1')
})

Promise.resolve().then(() => {
  console.log('p1')
})

console.log('start')

process.nextTick(() => {
  console.log('tick')
})

setImmediate(() => {
  console.log('setimmediate')
})

console.log('end')

// start,  end, tick, p1, s1,  st