import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)



export var router = new VueRouter({
  routes: [{
    path: '/ReportForms',
    name: 'ReportForms',
    component: resolve => require(['../pages/ReportForms'], resolve)
  },{
    path: '/Login',
    name: 'Login',
    component: resolve => require(['../pages/login'], resolve)
  }, {
    /***报表模块***/
    path: '/brand',
    name: 'Brand',
    component: resolve => require(['../pages/charts/Brand/brand'], resolve)
  }, {  // 销售
    path: '/sales',
    name: 'Sales',
    component: resolve => require(['../pages/charts/Sales/sales'], resolve)
  },{
    path: '/areaStoreSales',
    name: '/AreaStoreSales',
    component: resolve => require(['../pages/charts/Sales/areaStoreSales'],resolve)
  },{
    path: '/storeSales',
    name: 'StoreSales',
    component: resolve => require(['../pages/charts/Sales/storeSales'], resolve)
  },{
    path: '/personalSales',
    name: '/PersonalSales',
    component: resolve => require(['../pages/charts/Sales/personalSales'],resolve)
  },{  // 铁三角
    path: '/audioTechnica',
    name: '/AudioTechnica',
    component: resolve => require(['../pages/charts/AudioTechnica/audioTechnica'],resolve)
  },{
    path: '/personal',
    name: '/Personal',
    component: resolve => require(['../pages/charts/AudioTechnica/personal'],resolve)
  },{
    path: '/areaEffectiveness',
    name: '/AreaEffectiveness',
    component: resolve => require(['../pages/charts/AreaEffectiveness/areaEffectiveness'],resolve)
  },{
    path: '/peopleWork',
    name: '/PeopleWork',
    component: resolve => require(['../pages/charts/PerCapita/PeopleWork'],resolve)
  },{
    path: '/customerSource',
    name: '/CustomerSource',
    component: resolve => require(['../pages/charts/Customer/customerSource'],resolve)
  },
  /**** 客户模块 ****/
  {
    path: '/customer',
    name: '/Customer',
    component: resolve => require(['../pages/customer'],resolve)
  },
  {
    path: '/customerInfo/:id',
    name: '/CustomerInfo',
    component: resolve => require(['../pages/customer/customerInfo'],resolve)
  },
  {
    path: '/newCustomerInfo/:id',
    name: '/NewCustomerInfo',
    component: resolve => require(['../pages/customer/newCustomerInfo'],resolve)
  },
  {
    path: '/newCustomer',
    name: 'NewCustomer',
    component: resolve => require(['../pages/customer/newCustomer'], resolve)
  },
  {
    path: '/dealDetails',
    name: '/dealDetails',
    component: resolve => require(['../pages/customer/dealDetails'],resolve)
  },
  {
    path: '/trackDetails',
    name: '/trackDetails',
    component: resolve => require(['../pages/customer/trackDetails'],resolve)
  },
  {
    path: '/newTrack',
    name: '/newTrack',
    component: resolve => require(['../pages/customer/newTrack'],resolve)
  },
  {
    path: '/newCustomerDemand/:customerId',
    name: '/newCustomerDemand',
    component: resolve => require(['../pages/customer/newCustomerDemand'],resolve)
  },
  {
    path: '/changeDemand',
    name: '/changeDemand',
    component: resolve => require(['../pages/customer/changeDemand'],resolve)
  },
  {
    path: '/enquiryInfo',
    name: '/enquiryInfo',
    component: resolve => require(['../pages/customer/enquiryInfo'],resolve)
  },
  {
    path: '/searchResult',
    name: '/searchResult',
    component: resolve => require(['../pages/customer/searchResult'],resolve),
    meta: {        
      isUseCache: false,  // 这个字段的意思稍后再说      
      keepAlive: true  // 通过此字段判断是否需要缓存当前组件  
    }
  },
  /****个人模块****/
  {
    path: '/',
    name: '/Personal',
    component: resolve => require(['../pages/Personal/personalMsg'],resolve)
  },
  {
    path: '/dailyPaper',
    name: '/dailyPaper',
    component: resolve => require(['../pages/Personal/dailyPaper'],resolve)
  },
  {
    path: '/ForgetPwd',
    name: '/ForgetPwd',
    component: resolve => require(['../pages/ForgetPwd'],resolve)
  },{
    path: '/ResetPwd',
    name: '/ResetPwd',
    component: resolve => require(['../pages/ResetPwd'],resolve)
  },
  //金管家模块
  {
    path: '/msManage',
    name: '/msManage',
    component: resolve => require(['../pages/msManage/msIndex'],resolve)
  },
  {
    path: '/policy',
    name: '/policy',
    component: resolve => require(['../pages/msManage/policy'],resolve)
  },
  {
    path: '/story',
    name: '/story',
    component: resolve => require(['../pages/msManage/story'],resolve)
  },
  {
    path: '/service',
    name: '/service',
    component: resolve => require(['../pages/msManage/service'],resolve)
  },
  {
    path: '/question',
    name: '/question',
    component: resolve => require(['../pages/msManage/question'],resolve)
  }
],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {  
      // console.log(324242,savedPosition)      
      return savedPosition    
    } else {      
      if (from.meta.keepAlive) {        
          from.meta.savedPosition = document.body.scrollTop;      
      }        
      return { x: 0, y: to.meta.savedPosition || 0 }    
    }  
  }
})

