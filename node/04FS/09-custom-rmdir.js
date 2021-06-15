const { dir } = require('console')
const fs = require('fs')
const path = require('path')

/**
 * 需求：自定义一个函数，接收一个路径，然后执行删除
 * 01 判断当前传入的路径是否为一个文件，直接删除当前文件即可
 * 02 如果当前传入的是一个目录，我们需要继续读取目录中的内容，然后再执行删除操作
 * 03 将删除行为定义成一个函数，然后通过递归的方式进行复用
 * 04 将当前的名称拼接成在删除时可使用的路径
 */
function myRmdir (dirPath, cb) {
  // 判断当前 dirPath 的类型
  fs.stat(dirPath, (err, statObj) => {
    if (statObj.isDirectory()) {
      // 目录---> 继续读取
      fs.readdir(dirPath, (err, files) => {
        let dirs = files.map(item => {
          return path.join(dirPath, item)
        })
        let index = 0
        function next () {
          if (index == dirs.length) return fs.rmdir(dirPath, cb)

          let current = dirs[index++]

          myRmdir(current, next)
        }

        next()
      })
    } else {
      // 文件---> 直接删除
      fs.unlink(dirPath, cb)
    }
  })
}

myRmdir('tmp', () => {
  console.log('删除成功了')
})