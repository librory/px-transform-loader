# 简介

将 css 中 px 转换为 rem 的 loader

# 使用方法

```js
const pxTransformLoader = require('px-transform-loader')

module: {
  rules: [
    {
      test: /\.css$/,
      loader: pxTransformLoader,
      options: {
        rootPx: 12,
        precision: 4,
        roundingMethod: 'round', //round:四舍五入 enter:进一
        min: 2
      }
    }
  ]
}
```

# 参数说明

参数名 | 作用 | 默认值
:-|:-|:-
rootPx | 设置根元素的px值 | 12
precision | 精度 | 4
roundingMethod | 舍入方法（round：四舍五入；enter：进一） | round
min | 最小转换值（类似于1px的border，一般不希望被转换） | 2
