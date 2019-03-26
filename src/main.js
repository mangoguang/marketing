// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import mango from './js'
import api from './js/api.js'
import VueTouch from 'vue-touch'
import 'mint-ui/lib/style.min.css'
import '../mockjs/index' 	
Vue.config.devtools = true
Vue.use(VueTouch, {name: 'v-touch'})
VueTouch.config.swipe = {
  threshold: 100, 
  direction: 'horizontal'//手指左右滑动距离
}
import {
  router
} from './router/index.js'
// 添加rem计算
(function (doc, win) {
  var docEl = doc.documentElement
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  var recalc = function () {
    var clientWidth = docEl.clientWidth
    if (!clientWidth) return
    docEl.style.fontSize = 100 * (clientWidth / 375) + 'px'
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
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