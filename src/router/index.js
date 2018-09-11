import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export var router = new VueRouter({
  routes: [{
    path: '/Login',
    name: 'Login',
    component: resolve => require(['../pages/login'], resolve)
  }, {
    path: '/brand',
    name: 'Brand',
    component: resolve => require(['../pages/Brand/brand'], resolve)
  }, {
    path: '/sales',
    name: 'Sales',
    component: resolve => require(['../pages/Sales/sales'], resolve)
  },{
    path: '/',
    name: 'Login2',
    component: resolve => require(['../pages/Login2'], resolve)
  },{
    path: '/ReportForms',
    name: 'ReportForms',
    component: resolve => require(['../pages/ReportForms'], resolve)
  },{
    path: '/storeSales',
    name: 'StoreSales',
    component: resolve => require(['../pages/Sales/storeSales'], resolve)
  },{
    path: '/ForgetPwd',
    name: '/ForgetPwd',
    component: resolve => require(['../pages/ForgetPwd'],resolve)
  },{
    path: '/ResetPwd',
    name: '/ResetPwd',
    component: resolve => require(['../pages/ResetPwd'],resolve)
  },{
    path: '/areaStoreSales',
    name: '/AreaStoreSales',
    component: resolve => require(['../pages/Sales/areaStoreSales'],resolve)
  },{
    path: '/areaEffectiveness',
    name: '/AreaEffectiveness',
    component: resolve => require(['../pages/AreaEffectiveness/areaEffectiveness'],resolve)
  },{
    path: '/audioTechnica',
    name: '/AudioTechnica',
    component: resolve => require(['../pages/AudioTechnica/audioTechnica'],resolve)
  }]
})