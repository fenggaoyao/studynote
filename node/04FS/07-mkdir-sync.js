const fs = require('fs')
const path = require('path')

/**
 * 01 将来调用时需要接收类似于 a/b/c ，这样的路径，它们之间是采用 / 去行连接
 * 02 利用 / 分割符将路径进行拆分，将每一项放入一个数组中进行管理  ['a', 'b', 'c']
 * 03 对上述的数组进行遍历，我们需要拿到每一项，然后与前一项进行拼接 /
 * 04 判断一个当前对拼接之后的路径是否具有可操作的权限，如果有则证明存在，否则的话就需要执行创建
 */

function makeDirSync (dirPath) {
  let items = dirPath.split(path.sep)
  for(let i = 1; i <= items.length; i++) {
    let dir = items.slice(0, i).join(path.sep)
    try {
      fs.accessSync(dir)
    } catch (err) {
      fs.mkdirSync(dir)
    }
  }
}

makeDirSync('a\\b\\c')