import Vue from 'vue'
import App from './App.vue'
import VResize from '../src'

Vue.directive(VResize.name, VResize)

new Vue({
  el: '#app',
  render: h => h(App)
})
