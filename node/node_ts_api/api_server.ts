// 需求：希望有一个服务，可以依据请求的接口内容返回相应的数据
import express from 'express'
import { DataStore } from './data'

// console.log(DataStore.list)

const app = express()

app.get('/', (req, res) => {
  // res.end('1122')
  res.json(DataStore.list)
})

app.listen(8080, () => {
  console.log('服务已经开启了')
})