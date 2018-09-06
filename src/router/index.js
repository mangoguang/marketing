import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export var router = new VueRouter({
  routes: [{
    path: '/Login',
    name: 'Login',
    component: resolve => require(['../pages/login'], resolve)
  }, {
    path: '/home',
    name: 'Home',
    component: resolve => require(['../pages/home'], resolve)
  }, {
    path: '/sales',
    name: 'Sales',
    component: resolve => require(['../pages/sales'], resolve)
  },{
    path: '/',
    name: 'Login2',
    component: resolve => require(['../pages/Login2'], resolve)
  },{
    path: '/ReportForms',
    name: 'ReportForms',
    component: resolve => require(['../pages/ReportForms'], resolve)
  }]
  
})