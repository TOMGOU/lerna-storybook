/**
 * @description compose函数!
 * @param { array } fns 函数名(从左到右按顺序执行)
 */
export const compose = (...fns) => {
  return fns.reverse().reduce((fn1, fn2) => {
    return (...args) => {
      if (typeof fn1(...args) === 'function' && typeof fn2(...args) === 'function') {
        return fn2()(fn1()(...args))
      } else if (typeof fn1(...args) === 'function' && typeof fn2(...args) !== 'function') {
        return fn2(fn1()(...args))
      } else if (typeof fn1(...args) !== 'function' && typeof fn2(...args) === 'function') {
        return fn2()(fn1(...args))
      } else {
        return fn2(fn1(...args))
      }
    }
  })
}

/**
 * @description 上下倒影
 * @param { ImageData } imgData 图像对象
 * @param { number } num 处理后图像的高度
 * @returns { ImageData } 处理后的图像对象
 */
export const reflectionUpDown = (imgData, num = imgData.height) => {
  const data = imgData.data.map((item, index, arr) => {
    if (index < num * 4 * imgData.width) {
      const rows = Math.ceil(index / (4 * imgData.width))
      const columnResidue = Math.ceil((index % (imgData.width * 4)) / 4)
      const rgbaResidue = index % 4
      return arr[(imgData.height - rows) * 4 * imgData.width + columnResidue * 4 + rgbaResidue]
    }
  })
  return new ImageData(data, imgData.width, imgData.height);
}

/**
 * @description 左右镜像
 * @param { ImageData } imgData 图像对象
 * @param { number } num 处理后图像的高度
 * @returns { ImageData } 处理后的图像对象
 */
export const reflectionLeftRight = (imgData, num = imgData.height) => {
  const data = imgData.data.map((item, index, arr) => {
    if (index < num * 4 * imgData.width) {
      const columns = Math.ceil(index % (4 * imgData.width) / 4)
      const rows = Math.ceil(index / (4 * imgData.width))
      const rgbaResidue = index % 4
      return arr[rows * 4 * imgData.width + (imgData.width - columns) * 4 + rgbaResidue]
    }
  })
  return new ImageData(data, imgData.width, imgData.height);
}

/**
 * @description 反向
 * @param { ImageData } imgData 图像对象
 * @returns { ImageData } 处理后的图像对象
 */
export const reverse = (imgData) => {
  const data = imgData.data.map((item, index) => {
    if ( index % 4 !== 3) return 255 - item
    return item
  })
  return new ImageData(data, imgData.width, imgData.height);
}
 
/**
 * @description 红色提取
 * @param { ImageData } imgData 图像对象
 * @returns { ImageData } 处理后的图像对象
 */
export const redColor = (imgData) => {
  const data = imgData.data.map((item, index) => {
    if ( index % 4 === 0) return 255
    return item
  })
  return new ImageData(data, imgData.width, imgData.height);
}
 
/**
 * @description 绿色提取
 * @param { ImageData } imgData 图像对象
 * @returns { ImageData } 处理后的图像对象
 */
export const greenColor = (imgData) => {
  const data = imgData.data.map((item, index) => {
    if ( index % 4 === 1) return 255
    return item
  })
  return new ImageData(data, imgData.width, imgData.height);
}

/**
 * @description 蓝色提取
 * @param { ImageData } imgData 图像对象
 * @returns { ImageData } 处理后的图像对象
 */
export const blueColor = (imgData) => {
  const data = imgData.data.map((item, index) => {
    if ( index % 4 === 2) return 255
    return item
  })
  return new ImageData(data, imgData.width, imgData.height);
}

/**
 * @description 模糊
 * @param { ImageData } imgData 图像对象
 * @returns { ImageData } 处理后的图像对象
 */
export const blur = (imgData) => {
  const data = imgData.data.map((item, index, arr) => {
    if (index % 4 !== 3 & index > 3) return (arr[index - 4] + item + arr[index + 4]) / 3
    return item
  })
  return new ImageData(data, imgData.width, imgData.height);
}

/**
 * @description 模糊(固定10次)
 * @param { ImageData } imgData 图像对象
 * @returns { ImageData } 处理后的图像对象
 */
export const blurBackup = (num = 10) => imgData => {
  const fun = imgdata => {
    return imgdata.map((item, index, arr) => {
      if (index % 4 !== 3 & index > 3) return (arr[index - 4] + item + arr[index + 4]) / 3
      return item
    })
  }
  const fns = []
  for (let i = 0; i < num; i++) {
    fns.push(fun)
  }
  const data = compose(...fns)(imgData.data)
  return new ImageData(data, imgData.width, imgData.height);
}

/**
 * @description 门帘
 * @param { ImageData } imgData 图像对象
 * @param { number } num 门帘间隔距离
 * @returns { ImageData } 处理后的图像对象
 */
export const curtain = (num = 10) => imgData => {
  const data = imgData.data.map((item, index) => {
    const intFloor = Math.floor(index / 4)
    // if (intFloor % num >= 0 && intFloor % num <= 10) return 0
    if (intFloor % num === 0) return 0
    return item
  })
  return new ImageData(data, imgData.width, imgData.height);
}

/**
 * @description 灰度
 * @summary gray color = 0.299 × red color + 0.578 × green color + 0.114 * blue color
 * @param { ImageData } imgData 图像对象
 * @returns { ImageData } 处理后的图像对象
 */
export const gray = (imgData) => {
  const data = imgData.data.map((item, index, arr) => {
    const _num = Math.floor(index / 4) * 4
    if ( index % 4 !== 3) return 0.299 * arr[_num] + 0.578 * arr[_num + 1] + 0.114 * arr[_num + 2]
    return item
  })
  return new ImageData(data, imgData.width, imgData.height);
}

/**
 * @description 马赛克
 * @param { ImageData } imgData 图像对象
 * @param { number } num 马赛克单元大小
 * @returns { ImageData } 处理后的图像对象
 */
export const mosaic = (num = 10) => imgData => {
  const data = imgData.data.map((item, index, arr) => {
    const rows = Math.floor(index / (num * 4 * imgData.width))
    const columns = Math.floor(index % (4 * imgData.width) / (4 * num))
    if (index % 4 === 0) return arr[(rows * imgData.width + columns) * 4 * num]
    if (index % 4 === 1) return arr[(rows * imgData.width + columns) * 4 * num + 1]
    if (index % 4 === 2) return arr[(rows * imgData.width + columns) * 4 * num + 2]
    if (index % 4 === 3) return arr[(rows * imgData.width + columns) * 4 * num + 3]
  })
  return new ImageData(data, imgData.width, imgData.height);
}