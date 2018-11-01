import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export var router = new VueRouter({
  routes: [{
    path: '/',
    name: 'ReportForms',
    component: resolve => require(['../pages/ReportForms'], resolve)
  },{
    path: '/Login',
    name: 'Login',
    component: resolve => require(['../pages/Login'], resolve)
  }, {
    path: '/brand',
    name: 'Brand',
    component: resolve => require(['../pages/Brand/brand'], resolve)
  }, {  // 销售
    path: '/sales',
    name: 'Sales',
    component: resolve => require(['../pages/Sales/sales'], resolve)
  },{
    path: '/areaStoreSales',
    name: '/AreaStoreSales',
    component: resolve => require(['../pages/Sales/areaStoreSales'],resolve)
  },{
    path: '/storeSales',
    name: 'StoreSales',
    component: resolve => require(['../pages/Sales/storeSales'], resolve)
  },{
    path: '/personalSales',
    name: '/PersonalSales',
    component: resolve => require(['../pages/Sales/personalSales'],resolve)
  },{  // 铁三角
    path: '/audioTechnica',
    name: '/AudioTechnica',
    component: resolve => require(['../pages/AudioTechnica/audioTechnica'],resolve)
  },{
    path: '/personal',
    name: '/Personal',
    component: resolve => require(['../pages/AudioTechnica/personal'],resolve)
  },{
    path: '/ReportForms',
    name: 'ReportForms',
    component: resolve => require(['../pages/ReportForms'], resolve)
  },{
    path: '/ForgetPwd',
    name: '/ForgetPwd',
    component: resolve => require(['../pages/ForgetPwd'],resolve)
  },{
    path: '/ResetPwd',
    name: '/ResetPwd',
    component: resolve => require(['../pages/ResetPwd'],resolve)
  },{
    path: '/areaEffectiveness',
    name: '/AreaEffectiveness',
    component: resolve => require(['../pages/AreaEffectiveness/areaEffectiveness'],resolve)
  },{
    path: '/peopleWork',
    name: '/PeopleWork',
    component: resolve => require(['../pages/PerCapita/PeopleWork'],resolve)
  },{
    path: '/customerSource',
    name: '/CustomerSource',
    component: resolve => require(['../pages/Customer/customerSource'],resolve)
  }]
})