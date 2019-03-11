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
  //金管家模块-我的收藏
  {
    path: '/collectList',
    name: '/collectList',
    component: resolve => require(['../pages/Personal/msManage/collect'],resolve)
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
    path: '/question',
    name: '/question',
    component: resolve => require(['../pages/msManage/question'],resolve)
  },
  //首页搜索
  {
    path: '/search',
    name: '/search',
    component: resolve => require(['../pages/msManage/search'],resolve)
  },
  //文章详情
  {
    path: '/articleDetails',
    name: '/articleDetails',
    component: resolve => require(['../pages/msManage/articleDetails'],resolve)
  },
  //常见问题详情
  {
    path: '/questionDetail',
    name: '/questionDetail',
    component: resolve => require(['../pages/msManage/questionDetail'],resolve)
  },
  //营销助手图库主页
  {
    path: '/gallery',
    name: 'index',
    component: resolve => require(['../pages/Gallery/index'],resolve)
  },
  //搜索页
  {
    path: '/gSearch',
    name: 'gSearch',
    component: resolve => require(['../pages/Gallery/search'],resolve)
  },
  //产品详情
  {
    path: '/productDetails',
    name: 'productDetails',
    component: resolve => require(['../pages/Gallery/productDetails'],resolve)
  },
  //产品列表
  {
    path: '/productList',
    name: 'productList',
    component: resolve => require(['../pages/Gallery/productList'],resolve)
  },
  //介绍页
  {
    path: '/recommend',
    name: 'recommend',
    component: resolve => require(['../pages/Gallery/recommend'],resolve)
  },
  //搜索结果详情
  {
    path: '/productResult',
    name: 'productResult',
    component: resolve => require(['../pages/Gallery/productResult'],resolve)
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

