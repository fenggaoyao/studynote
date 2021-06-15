const net = require('net')
const MyTransform = require('./myTransform.js')

let overageBuffer = null 
let ts = new MyTransform()

const client = net.createConnection({
  host: 'localhost', 
  port: 1234
})

client.write(ts.encode('拉勾教育1'))
client.write(ts.encode('拉勾教育2'))
client.write(ts.encode('拉勾教育3'))
client.write(ts.encode('拉勾教育4'))
client.write(ts.encode('拉勾教育5'))

client.on('data', (chunk) => {
  if (overageBuffer) {
    chunk = Buffer.concat([overageBuffer, chunk])
  }
  let packageLen = 0
  while(packageLen = ts.getPackageLen(chunk)) {
    const packageCon = chunk.slice(0, packageLen)
    chunk = chunk.slice(packageLen)

    const ret = ts.decode(packageCon)
    console.log(ret)
  }
  overageBuffer = chunk
})