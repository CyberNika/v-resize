<template>
  <div id="app">
    <header>
      <h1>v-resize</h1>

      <p>
        <span class="description">适用于 Vue 2.0 的使元素大小可伸缩的指令。</span>
        <iframe
          class="gh-star"
          scrolling="0"
          width="170px"
          height="20px"
          src="https://ghbtns.com/github-btn.html?user=XBT1&repo=v-resize&type=star&count=true" frameborder="0" >
        </iframe>
      </p>
    </header>

    <div class="usage">
      <h3>用法</h3>
      <a class="usage-link" href="https://github.com/XBT1/v-resize/blob/master/README.md">安装 &amp 使用</a>
    </div>

    <main class="showground">
      <h3>示例<span class="showground-title-description">（其中括号内的为盒子布局，与本指令无关）</span></h3>

      <div class="example">
        <h4 class="example-title">默认（居中）</h4>

        <div class="box border-right border-bottom" style="margin-left: auto; margin-right: auto;" v-resize>
          默认支持右 & 下两边拖拽
        </div>
      </div>

      <div class="example">
        <h4 class="example-title">默认（左对齐）</h4>

        <div class="box border-right border-bottom" style="margin-left: 20px;" v-resize>
          默认支持右 & 下两边拖拽
        </div>
      </div>

      <div class="example">
        <h4 class="example-title">回调函数 & 增大识别区域（左对齐）</h4>

        <div class="box border-right border-bottom" style="margin-left: 20px; border-width: 20px;" v-resize="callbackOptions">
          打开控制台查看回调函数 & 增大识别区域至 20px
        </div>
      </div>

      <div class="example large">
        <h4 class="example-title">左上侧（绝对定位）</h4>

        <div class="box border-left border-top" style="position: absolute; right: 20px; bottom: 20px;" v-resize="leftTopOptions">
          左 & 上两边拖拽
        </div>
      </div>

      <div class="example large">
        <h4 class="example-title">四个方向（flex 水平垂直居中）</h4>

        <div class="flex-center">
          <div class="box border-right border-left border-top border-bottom" v-resize="allDirectionOptions">
            四个方向拖拽
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'App',

    data () {
      return {
        leftTopOptions: {
          directions: ['top', 'left'],
        },
        allDirectionOptions: {
          directions: ['top', 'left', 'bottom', 'right'],
        },
        callbackOptions: {
          onResize (params) {
            console.log(params)
          },
          zoneSize: 20,
        },
      }
    },
  }
</script>

<style scoped>
  #app {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 20px;
    overflow: auto;
  }

  .usage-link {
    color: #46a0fc;
    border-bottom: 1px solid #46a0fc;
    text-decoration: none;
  }

  .usage-link:hover {
    opacity: 0.8;
  }

  .description {
    line-height: 20px;
    vertical-align: middle;
  }

  .gh-star {
    margin-left: 8px;
    vertical-align: middle;
  }

  .showground {
    margin-bottom: 20px;
  }

  .showground-title-description {
    color: #666;
    font-weight: normal;
    font-size: 0.8em;
  }

  .example {
    position: relative;
    margin-bottom: 5px;
    border-radius: 2px;
    background-color: #46a0fc;
    text-align: center;
    color: #fff;
    overflow: hidden;
  }

  .example.large {
    height: 300px;
  }

  .example-title {
    margin: 0;
    height: 42px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    line-height: 42px;
  }

  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 260px;
    margin-bottom: 20px;
  }

  .box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    width: 440px;
    height: 100px;
    border: 4px solid orange;
    background-color: orange;
    font-size: 0.9em;
    box-sizing: border-box;
  }

  .box.border-top {
    border-top-color: #333;
  }

  .box.border-bottom {
    border-bottom-color: #333;
  }

  .box.border-left {
    border-left-color: #333;
  }

  .box.border-right {
    border-right-color: #333;
  }
</style>

<style>
  html, body {
    height: 100%;
  }

  body {
    margin: 0;
    color: #333;
  }
</style>
