class MyTransformCode{
  constructor() {
    this.packageHeaderLen = 4
    this.serialNum = 0
    this.serialLen = 2
  }

  // 编码
  encode(data, serialNum) {
    const body = Buffer.from(data)

    // 01 先按照指定的长度来申请一片内存空间做为 header 来使用
    const headerBuf = Buffer.alloc(this.packageHeaderLen)

    // 02 
    headerBuf.writeInt16BE(serialNum || this.serialNum)

    headerBuf.writeInt16BE(body.length, this.serialLen)

    if (serialNum == undefined) {
      this.serialNum++
    }

    return Buffer.concat([headerBuf, body])
  }

  // 解码
  decode(buffer) {
    const headerBuf = buffer.slice(0, this.packageHeaderLen)
    const bodyBuf = buffer.slice(this.packageHeaderLen)

    return {
      serialNum: headerBuf.readInt16BE(),
      bodyLength: headerBuf.readInt16BE(this.serialLen),
      body: bodyBuf.toString()
    }
  }

  // 获取包长度的方法
  getPackageLen(buffer) {
    if (buffer.length < this.packageHeaderLen) {
      return 0
    } else {
      return this.packageHeaderLen + buffer.readInt16BE(this.serialLen)
    }
  }
}

module.exports = MyTransformCode