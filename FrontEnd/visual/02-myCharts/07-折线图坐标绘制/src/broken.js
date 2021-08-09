export function drawAxis() {
  const defaultParam = this.defaultParam
  const ctx = this.ctx
  const pad = defaultParam.padding
  const bottomPad = 30
  const wd = defaultParam.wd
  const ht = defaultParam.ht
  const data = defaultParam.data

  // 绘制坐标系
  ctx.save()
  ctx.beginPath()
  ctx.lineWidth = 2
  ctx.strokeStyle = defaultParam.styles.borderColor
  ctx.moveTo(pad, pad)
  ctx.lineTo(pad, ht - bottomPad)
  ctx.lineTo(wd - pad, ht - bottomPad)
  ctx.stroke()
  ctx.closePath()


  // 绘制文字刻度 
  for (let i = 0; i < data.length; i++) {
    ctx.beginPath()
    ctx.fillStyle = '#333'
    ctx.textAlign = 'center'
    ctx.font = defaultParam.fontSize + ' Microsoft YaHei'
    ctx.fillText(data[i].xVal, i * (defaultParam.wid / data.length - 1) + defaultParam.x, ht - 10)
    ctx.closePath()
  }

  ctx.restore()
}