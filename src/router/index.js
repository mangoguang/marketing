import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export var router = new VueRouter({
  routes: [{
    path: '/',
    name: 'Home',
    component: resolve => require(['../pages/home'], resolve)
  }, {
    path: '/child',
    name: 'Child',
    component: resolve => require(['../pages/child'], resolve)
  }]
})