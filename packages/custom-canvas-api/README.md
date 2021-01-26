

## Installation

The easiest way to install custom-canvas-api is with [`npm`][npm].

[npm]: https://www.npmjs.com/

```sh
npm install custom-canvas-api
```

## example
[`demo`][demo]

[demo]: https://tomgou.github.io/canvas-example/www/index.html#/

## Usage
```
import { fillAutoWrapText } from 'custom-canvas-api';

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle= '#000';
ctx.textBaseline = 'top';
const text = '当然啦，除上面的场景文字识别外，历史悠久的手写体的识别到现在还是一件具有挑战的课题，在深度学习的浪潮下，手写体的识别已经前进了一大步，但是尚且没达到印刷体识别那种可以商用的地步，所以啊，OCR的研究还得不断地进行下去。';
fillAutoWrapText(ctx, text, 0, 0, 300, 50, '20px PingFang-SC-Heavy');
```

## Components

Currently, it includes three special shapes: Round Rect, Arrow Circle and Auto Wrap Text.

### 1.Round Rect ### (带圆角的矩形)

**fillRoundRect**
```
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
```
**strokeRoundRect**
```
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
```

### 2.Arrow Circle ### (带箭头的圆)

**fillArrowCircle**
```
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
```
**strokeArrowCircle**
```
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
```

### 3.Auto Wrap Text ### (自动换行的文字)

**fillAutoWrapText** 【说明：未使用save和restore隔绝组件, 依赖于canvas绘制时的上下文样式】
```
/**
* @description 自动换行文字填充
* @param { object } ctx canvas对象
* @param { string } text 文字内容
* @param { number } x 文字起点x坐标
* @param { number } y 文字起点y坐标
* @param { number } widthLimit 文字换行宽度
* @param { number } lineHeight 文字行高
* @param { string } font 文字字体
* @returns { object } info 返回对象
* @returns { number } info.x 新的起点x坐标
* @returns { number } info.y 新的起点y坐标
* @returns { number } info.rows 文字行数
*/
```

**strokeAutoWrapText** 【说明：未使用save和restore隔绝组件, 依赖于canvas绘制时的上下文样式】
```
/**
* @description 自动换行文字填充
* @param { object } ctx canvas对象
* @param { string } text 文字内容
* @param { number } x 文字起点x坐标
* @param { number } y 文字起点y坐标
* @param { number } widthLimit 文字换行宽度
* @param { number } lineHeight 文字行高
* @param { string } font 文字字体
* @returns { object } info 返回对象
* @returns { number } info.x 新的起点x坐标
* @returns { number } info.y 新的起点y坐标
* @returns { number } info.rows 文字行数
*/
```
