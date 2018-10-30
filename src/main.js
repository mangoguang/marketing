// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import mango from './js'
import api from './js/api.js'
import {
  router
} from './router/index.js'

// console.log('api对象：', window.$api.appId)
/* eslint-disable no-new */
if (mango.version === 'app') {
  window.apiready = function(){
    new Vue({
      el: '#app',
      router,
      template: '<App/>',
      components: {
        App
      }
    })
  }
} else {
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
      App
    }
  })
}