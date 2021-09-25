process.env.VUE_ENV = 'server'
const isProd = process.env.NODE_ENV === 'production'

const fs = require('fs')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const WebpackDevMiddleware = require('webpack-dev-middleware')
const WebpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config')
const favicon = require('serve-favicon')
const resolve = file => path.resolve(__dirname, file)
const compiler = webpack(config)

const app = express()

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0
})

app.use(WebpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true }
}))

app.use(WebpackHotMiddleware(compiler, {
  log: console.log
}))

app.use(favicon('./public/logo.png'))
app.use('/public', serve('./public'))

const port = process.env.PORT || 8080
const host = process.env.HOST || '172.16.57.153'
app.listen(port, host, () => {
  console.log(`server started at ${host}:${port}`)
})