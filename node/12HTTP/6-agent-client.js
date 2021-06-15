const http = require('http')

// http.get({
//   host: 'localhost', 
//   port: 1234, 
//   path: '/?a=1'
// }, (res) => {
  
// })

let options = {
  host: 'localhost', 
  port: 1234, 
  path: '/?a=1', 
  method: 'POST', 
  headers:{
    // 'Content-type': 'application/json'
    'Content-type': 'application/x-www-form-urlencoded'
  }
}

let req = http.request(options, (res) => {
  let arr = []
  res.on('data', (data) => {
    arr.push(data)
  })
  res.on('end', () => {
    console.log(Buffer.concat(arr).toString())
  })
})
// req.end('拉勾教育')
// req.end('{"name":"lg"}')
req.end('a=1&b=2')