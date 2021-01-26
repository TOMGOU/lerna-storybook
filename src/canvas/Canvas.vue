<template>
  <div class="home">
    <canvas id="canvas" width=940  height=500></canvas>
  </div>
</template>

<script>
import './canvas.css';
import {
  fillAutoWrapText,
  strokeAutoWrapText,
  fillRoundRect,
  strokeRoundRect,
  fillArrowCircle,
  strokeArrowCircle,
} from '../../packages/custom-canvas-api/index.js';
export default {
  name: 'my-canvas',

  props: {
    label: {
      type: String,
      required: true,
    }
  },

  mounted() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ff00ff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = 'bold 28px serif';
    if (this.label === 'fillAutoWrapText') ctx.fillText('fillAutoWrapText', 150, 10);
    if (this.label === 'strokeAutoWrapText') ctx.fillText('strokeAutoWrapText', 150, 10);
    if (this.label === 'fillRoundRect') ctx.fillText('fillRoundRect', 150, 10);
    if (this.label === 'strokeRoundRect') ctx.fillText('strokeRoundRect', 150, 10);
    if (this.label === 'fillArrowCircle') ctx.fillText('fillArrowCircle', 150, 10);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#fff';
    ctx.textBaseline = 'top';
    const text = '当然啦，除上面的场景文字识别外，历史悠久的手写体的识别到现在还是一件具有挑战的课题，在深度学习的浪潮下，手写体的识别已经前进了一大步，但是尚且没达到印刷体识别那种可以商用的地步，所以啊，OCR的研究还得不断地进行下去。\r';
    if (this.label === 'fillAutoWrapText') fillAutoWrapText(ctx, text, 20, 80, 300, 50, '20px PingFang-SC-Heavy');
    if (this.label === 'strokeAutoWrapText') strokeAutoWrapText(ctx, text, 20, 80, 300, 50, '20px PingFang-SC-Heavy', 5);
    if (this.label === 'fillRoundRect') fillRoundRect(ctx, 20, 80, 300, 300);
    if (this.label === 'strokeRoundRect') strokeRoundRect(ctx, 20, 80, 300, 300);
    if (this.label === 'fillArrowCircle') fillArrowCircle(ctx, 200, 230, 150, 0.05, 40);
  }
};
</script>