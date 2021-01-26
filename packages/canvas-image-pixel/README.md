## Installation

The easiest way to install custom-canvas-api is with [`npm`][npm].

[npm]: https://www.npmjs.com/

```sh
npm install canvas-image-pixel
```

## example
[`demo`][demo]

[demo]: https://tomgou.github.io/canvas-example/www/index.html#/about

## Components

Currently, it only includes several methods: reflection, reverse, blur, curtain, gray and mosaic. And all these methods can be combined by compose function.

### Usage ### 
```
import { compose, reflectionLeftRight, reflectionUpDown, blueColor } from 'canvas-image-pixel';

const canvas = document.getElementById("canvas");
const cxt = canvas.getContext("2d");
const img = document.getElementById("img");
cxt.drawImage(img, 0, 0, 960, 442);
const imgData = cxt.getImageData(0, 0, 960, 442);
cxt.putImageData(compose(reflectionLeftRight, reflectionUpDown, blueColor)(imgData), 970, 452);
```
