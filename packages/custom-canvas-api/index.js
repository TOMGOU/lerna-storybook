/**
 * @description 带圆角的矩形轨迹
 * @param { object } ctx canvas对象
 * @param { number } x 矩形起点x坐标
 * @param { number } y 矩形起点y坐标
 * @param { number } width 矩形起点y坐标
 * @param { number } height 矩形起点y坐标
 * @param { number } radius 圆角大小
 */
const drawRoundRectPath = (ctx, x, y, width, height, radius = 10) => {
  ctx.beginPath()
  // 从右下角顺时针绘制，弧度从0到1/2PI
  ctx.arc(x + width - radius, y + height - radius, radius, 0, Math.PI / 2)
  // 矩形下边线
  ctx.lineTo(x + radius, y + height)
  // 左下角圆弧，弧度从1/2PI到PI
  ctx.arc(x + radius, y + height - radius, radius, Math.PI / 2, Math.PI)
  // 矩形左边线
  ctx.lineTo(x, y + radius)
  // 左上角圆弧，弧度从PI到3/2PI
  ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2)
  // 上边线
  ctx.lineTo(x + width - radius, y)
  // 右上角圆弧
  ctx.arc(x + width - radius, y + radius, radius, Math.PI * 3 / 2, Math.PI * 2)
  // 右边线
  ctx.lineTo(x + width, y + height - radius)
  ctx.closePath()
  ctx.clip()
}

/**
 * @description 带圆角的填充矩形
 * @param { object } ctx canvas对象
 * @param { number } x 矩形起点x坐标
 * @param { number } y 矩形起点y坐标
 * @param { number } width 矩形起点y坐标
 * @param { number } height 矩形起点y坐标
 * @param { number } radius 圆角大小
 * @param { string } fillColor 填充颜色
 */
export const fillRoundRect = (ctx, x, y, width, height, radius = 10, fillColor = '#fff') => {
  // 圆的直径必然要小于矩形的宽高
  if (2 * radius > width || 2 * radius > height) { return false }
  ctx.save()
  drawRoundRectPath(ctx, x, y, width, height, radius)
  typeof ctx.setFillStyle === 'function' ? ctx.setFillStyle(fillColor) : ctx.fillStyle = fillColor
  ctx.fill()
  ctx.restore()
}

/**
 * @description 带圆角的划线矩形
 * @param { object } ctx canvas对象
 * @param { number } x 矩形起点x坐标
 * @param { number } y 矩形起点y坐标
 * @param { number } width 矩形起点y坐标
 * @param { number } height 矩形起点y坐标
 * @param { number } radius 圆角大小
 * @param { string } strokeColor 边框颜色
 */
export const strokeRoundRect = (ctx, x, y, width, height, radius = 10, strokeColor = '#fff') => {
  // 圆的直径必然要小于矩形的宽高
  if (2 * radius > width || 2 * radius > height) { return false }
  ctx.save()
  drawRoundRectPath(ctx, x, y, width, height, radius)
  typeof ctx.setStrokeStyle === 'function' ? ctx.setStrokeStyle(strokeColor) : ctx.strokeStyle = strokeColor
  ctx.stroke()
  ctx.restore()
}

/**
 * @description 带箭头的填充圆
 * @param { object } ctx canvas对象
 * @param { number } x 圆心x坐标
 * @param { number } y 圆心y坐标
 * @param { number } r 圆半径
 * @param { number } angle 箭头角度
 * @param { number } len 箭头长度
 * @param { string } fillColor 填充颜色
 */
export const fillArrowCircle = (ctx, x, y, r, angle = 0.1, len = 20, fillColor = '#fff') => {
  ctx.beginPath()
  ctx.arc(x, y, r, angle * Math.PI, (2 - angle) * Math.PI)
  ctx.lineTo(x + r + len, y)
  ctx.closePath()
  ctx.save()
  typeof ctx.setFillStyle === 'function' ? ctx.setFillStyle(fillColor) : ctx.fillStyle = fillColor
  ctx.fill()
  ctx.restore()
}

/**
 * @description 带箭头的划线圆
 * @param { object } ctx canvas对象
 * @param { number } x 圆心x坐标
 * @param { number } y 圆心y坐标
 * @param { number } r 圆半径
 * @param { number } angle 箭头角度
 * @param { number } len 箭头长度
 * @param { string } strokeColor 轮廓颜色
 */
export const strokeArrowCircle = (ctx, x, y, r, angle = 0.1, len = 20, strokeColor = '#fff') => {
  ctx.beginPath()
  ctx.arc(x, y, r, angle * Math.PI, (2 - angle) * Math.PI)
  ctx.lineTo(x + r + len, y)
  ctx.closePath()
  ctx.save()
  typeof ctx.setStrokeStyle === 'function' ? ctx.setStrokeStyle(strokeColor) : ctx.strokeStyle = strokeColor
  ctx.stroke()
  ctx.restore()
}

/**
 * @description 文字自动换行计算
 * @param { object } obj 参数对象
 * @param { object } obj.ctx canvas对象
 * @param { number } obj.widthLimit 换行宽度
 * @param { string } obj.text 文字内容
 * @param { string } obj.font 字体
 */
export const textWrap = (obj) => {
  const { ctx, widthLimit, text, font } = obj
  const result = [0]
  if (text.length === 0) {
    return result
  }
  ctx.font = font
  text.split('').forEach((item, index) => {
    let currentWidth = ctx.measureText(text.substring(result[result.length - 1], index)).width
    // 回车换行处理
    if (/[\r\n]/.test(text[index]) && index !== text.length - 1) {
      result.push(index + 1)
    }
    if (currentWidth > widthLimit) {
      result.push(index)
    }
  })
  // 最后字符处理
  result.push(text.length)
  return result
}

/**
* @description 自动换行填充文字(可带省略号)
* @param { object } ctx canvas对象
* @param { string } text 文字内容
* @param { number } x 文字起点x坐标
* @param { number } y 文字起点y坐标
* @param { number } widthLimit 文字换行宽度
* @param { number } lineHeight 文字行高
* @param { string } font 文字字体
* @param { number } lines 超出省略号显示的文字行数
* @returns { object } info 返回对象
* @returns { number } info.x 新的起点x坐标
* @returns { number } info.y 新的起点y坐标
* @returns { number } info.rows 文字行数
*/
export const fillAutoWrapText = (ctx, text, x, y, widthLimit, lineHeight = 30, font = '20px PingFang-SC-Heavy', lines) => {
  const result = textWrap({
    ctx,
    widthLimit,
    text,
    font,
  })
  const newText = (result.length > lines + 1) && lines ? text.substring(0, result[lines] - 1) + '...' : text
  const newResult = lines ? result.filter((item, index) => index <= lines).map((item, index) => index === lines ? item + 2 : item) : result
  if (result.length - 1) {
    newResult.reduce((pre, cur, index) => {
      ctx.fillText(newText.substring(pre, cur), x, y + lineHeight * (index - 1), widthLimit)
      return cur
    })
  }
  const info = {
    x, 
    y: (newResult.length - 1) * lineHeight + y,
    rows: newResult.length - 1
  }
  return info
}

/**
* @description 自动换行中空文字(可带省略号)
* @param { object } ctx canvas对象
* @param { string } text 文字内容
* @param { number } x 文字起点x坐标
* @param { number } y 文字起点y坐标
* @param { number } widthLimit 文字换行宽度
* @param { number } lineHeight 文字行高
* @param { string } font 文字字体
* @param { number } lines 超出省略号显示的文字行数
* @returns { object } info 返回对象
* @returns { number } info.x 新的起点x坐标
* @returns { number } info.y 新的起点y坐标
* @returns { number } info.rows 文字行数
*/
export const strokeAutoWrapText = (ctx, text, x, y, widthLimit, lineHeight = 30, font = '20px PingFang-SC-Heavy', lines) => {
  const result = textWrap({
    ctx,
    widthLimit,
    text,
    font,
  })
  const newText = (result.length > lines + 1) && lines ? text.substring(0, result[lines] - 1) + '...' : text
  const newResult = lines ? result.filter((item, index) => index <= lines).map((item, index) => index === lines ? item + 2 : item) : result
  if (result.length - 1) {
    newResult.reduce((pre, cur, index) => {
      ctx.strokeText(newText.substring(pre, cur), x, y + lineHeight * (index - 1), widthLimit)
      return cur
    })
  }
  const info = {
    x, 
    y: (newResult.length - 1) * lineHeight + y,
    rows: newResult.length - 1
  }
  return info
}
