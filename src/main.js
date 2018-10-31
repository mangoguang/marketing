// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
<<<<<<< HEAD
import mango from './js'
import api from './js/api.js'
=======
import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})
VueTouch.config.swipe = {
  threshold: 100, 
  direction: 'horizontal'//手指左右滑动距离
}
>>>>>>> a4748f557a306682176a64e9cc959ff4877d8395
import {
  router
} from './router/index.js'

<<<<<<< HEAD
// console.log('api对象：', window.$api.appId)
=======

>>>>>>> a4748f557a306682176a64e9cc959ff4877d8395
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