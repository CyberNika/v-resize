<template>
  <div id="app">
    <div class="box" v-resize>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {
      }
    }
  }
</script>

<style scoped>
  .box {
    width: 300px;
    height: 200px;
    border: 1px solid orange;
  }
</style>

<style>
  html, body {
    height: 100%;
  }
</style>
