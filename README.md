# v-resize

[![NPM version][badge-npm-version]][url-npm]
[![Node version][badge-node-version]][url-npm]
[![NPM download][badge-npm-download]][url-npm]
![Dependencies][badge-dependencies]
![License][badge-license]

[![NPM][image-npm]][url-npm]

适用于 Vue 2.0 的使元素大小可缩放的指令。

## 安装

```bash
$ yarn add v-resize # npm i -S v-resize
```

## 在线示例

https://xbt1.github.io/v-resize

![演示](./examples/images/example.gif)

## 使用

一个简单的例子

```javascript
import VResize from 'v-resize'

export default {
  directives: {
    resize: VResize,
  },

  data () {
    return {
      options: {
        onResize (params) {
          console.log(params)
        },
        directions: ['right', 'bottom'],
      },
    }
  }
}
```

```html
<template>
  <div v-resize="options">
    拖拽缩放
  </div>
</template>
```

详细示例见[例子](./examples)

## 选项

`v-resize="options"`，`options: object` 见下

| 参数        | 说明              | 类型    | 可选值/说明 | 默认值      |
| ---------- | ----------------- | ------ | ----- | ---------- |
| resizableClass  | 可拖拽时的 class | String | -- | vrz-resizable |
| draggedClass  | 鼠标按下时的 class | String | -- | vrz-dragged |
| resizingClass  | 缩放时的 class | String | -- | vrz-resizing |
| directions  | 可拖拽缩放的方向 | Array | ['top', 'bottom', 'left', 'right'] | ['bottom', 'right'] |
| zoneSize  | 识别区域大小 | Number | -- | 4 |
| onResize  | 缩放时的回调 | Funtion | params: object | -- |

`onResize` 回调参数解释

- direction: 缩放的方向
  - `top`
  - `bottom`
  - `left`
  - `right`
  - `left-top`
  - `bottom-right`
  - `right-top`
  - `bottom-left`
- target: 绑定的元素
- event: `mousemove` 事件

## 开发

```bash
$ yarn install
$ yarn dev
```

## 构建

```bash
$ yarn build:package # 构建 npm 包
$ yarn build:example # 构建示例站点
$ yarn build # build:package & build:example
```

## 更新日志

详见 [releases][url-releases]


[badge-npm-version]: https://img.shields.io/npm/v/v-resize.svg
[badge-node-version]: https://img.shields.io/node/v/v-resize.svg
[badge-npm-download]: https://img.shields.io/npm/dt/v-resize.svg
[badge-license]: https://img.shields.io/github/license/xbt1/v-resize.svg
[badge-dependencies]: https://img.shields.io/david/dev/xbt1/v-resize.svg

[url-npm]: https://npmjs.org/package/v-resize
[url-dependencies]: https://david-dm.org/vkbansal/v-resize
[url-releases]: https://github.com/XBT1/v-resize/releases

[image-npm]: https://nodei.co/npm/v-resize.png
