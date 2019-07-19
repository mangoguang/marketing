// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import mango from './js'
import api from './js/api.js'
import VueTouch from 'vue-touch'
import VueLazyload from 'vue-lazyload'

//图片预览
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
var options = {
  fullscreenEl: false, //关闭全屏按钮
  showHideOpacity: true
}
Vue.use(preview, options)

//视频组件
// import 'video.js/dist/video-js.css'

// require('video.js/dist/video-js.css')   // 这个是videoJs的样式
// require('vue-video-player/src/custom-theme.css') // 这个是vue-video-player的样式
import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
Vue.use(VideoPlayer);

import 'mint-ui/lib/style.min.css'
import './index.scss'
// import '../mockjs/index' 	
// import base from './Global/index'
// Vue.use(base)
import './Global/index'
import permission from '@/directive/permission'
Vue.use(permission)

Vue.config.devtools = true
Vue.use(VueTouch, {
  name: 'v-touch'
})
// 自定义指令
// 注册一个全局自定义指令 `v-focus`
// Vue.directive('focus', {
//   // 当被绑定的元素插入到 DOM 中时……
//   inserted: function (el) {
//     // 聚焦元素
//     el.focus()
//   }
// })
VueTouch.config.swipe = {
  threshold: 100,
  direction: 'horizontal' //手指左右滑动距离
}
Vue.use(VueLazyload)
import {
  router
} from './router/index.js'
// 添加rem计算
(function (doc, win) {
  // console.log('vue3',  Vue)

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
  window.apiready = function () {
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
    // render(createElement) {
    //   return createElement(App)
    // }
  }).$mount('#app')
}