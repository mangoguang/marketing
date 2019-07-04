import Vue from 'vue'
import VueRouter from 'vue-router'
const index = () => import('../pages/index')
const ReportForms = () => import('../pages/ReportForms')
const Login = () => import('../pages/login')

//客户模块
const Customer = () => import('../pages/customer')
const customerInfo = () => import('../pages/customer/customerInfo')
const newCustomerInfo = () => import('../pages/customer/newCustomerInfo')
const newCustomer = () => import('../pages/customer/newCustomer')
const dealDetails = () => import('../pages/customer/dealDetails')
const trackDetails = () => import('../pages/customer/trackDetails')
const newTrack = () => import('../pages/customer/newTrack')
const newCustomerDemand = () => import('../pages/customer/newCustomerDemand')
const changeDemand = () => import('../pages/customer/changeDemand')
const enquiryInfo = () => import('../pages/customer/enquiryInfo')
const searchResult = () => import('../pages/customer/searchResult')
const newIntention = () => import('../pages/customer/newCustomer/newIntention')

//个人模块
const personalMsg = () => import('../pages/Personal/personalMsg')
const dailyPaper = () => import('../pages/Personal/dailyPaper')
const ForgetPwd = () => import('../pages/ForgetPwd')
const ResetPwd = () => import('../pages/ResetPwd')
const aboutUs = () => import('../pages/aboutUs')
const personalData = () => import('../pages/personalData')
const feedback = () => import('../pages/Personal/feedback')
const security = () => import('../pages/Personal/security/index')
const resetMyPwd = () => import('../pages/Personal/security/resetPwd')

//图库模块
const gallery = () => import('../pages/Gallery/index')
const gSearch = () => import('../pages/Gallery/search')
const productDetails = () => import('../pages/Gallery/productDetails')
const productList = () => import('../pages/Gallery/productList')
const recommend = () => import('../pages/Gallery/recommend')
const share = () => import('../pages/Gallery/share')
const preShare = () => import('../pages/Gallery/preShare')

//店长模块
const storeCustomer = () => import('../pages/customer/storeCustomer')
const employeeList = () => import("../pages/work/employeeList")
const storeDailyReport = () => import('../pages/work/storeDailyReport')
const employeeDailyReport = () => import('../pages/work/employeeDailyReport')
//经销商模块
const shopList = () => import("../pages/work/shopList")
const shopDetail = () => import("../pages/work/storeDetail")
const employeeDetail = () => import("../pages/work/employeeDetail")
const workPlan  = () => import("../pages/work/workPlan")
const newWorkPlan = () => import("../pages/work/newWorkPlan")
const searchCustomer = () => import("../pages/work/searchCustomer")
const searchIntention = () => import("../pages/work/searchIntention")


//4S模块
const index4s = () => import('../pages/4S/index/index')
const record = () => import('../pages/4S/record/record')
const recordDetails = () => import('../pages/4S/record/recordDetails')
const itemDetails = () => import('../pages/4S/record/itemDetails')
const starCheck = () => import('../pages/4S/starCheck/')
const checkTip = () => import('../pages/4S/starCheck/checkTip')
const check = () => import('../pages/4S/starCheck/check')
const recordJxs = () => import('../pages/4S/record/recordJxs')
const judgeStar = () => import('../pages/4S/judgeStar/judgeStar')
const starCheckW = () => import('../pages/4S/starCheckWrapper/starCheckW')
const searchIndex = () => import('../pages/4S/search')
const starAtest = () => import('../pages/4S/starAtest/starAtest')

Vue.use(VueRouter)




export var router = new VueRouter({
  routes: [{
    path: '/index',
    name: 'index',
    component: index
  },{
    path: '/ReportForms',
    name: 'ReportForms',
    component: ReportForms
  },{
    path: '/Login',
    name: 'Login',
    component: Login
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
    path: '/Personal',
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
    component: Customer
  },
  {
    path: '/customerInfo',
    name: '/CustomerInfo',
    component: customerInfo,
    meta: {        
      isUseCache: false,  // 这个字段的意思稍后再说      
      keepAlive: true  // 通过此字段判断是否需要缓存当前组件  
    }
  },
  {
    path: '/newCustomerInfo',
    name: '/NewCustomerInfo',
    component: newCustomerInfo
  },
  {
    path: '/newCustomer',
    name: 'NewCustomer',
    component: newCustomer
  },
  {
    path: '/dealDetails',
    name: '/dealDetails',
    component: dealDetails
  },
  {
    path: '/trackDetails',
    name: '/trackDetails',
    component: trackDetails
  },
  {
    path: '/newTrack',
    name: '/newTrack',
    component: newTrack
  },
  {
    path: '/newCustomerDemand/:customerId',
    name: '/newCustomerDemand',
    component: newCustomerDemand
  },
  {
    path: '/changeDemand',
    name: '/changeDemand',
    component: changeDemand
  },
  {
    path: '/enquiryInfo',
    name: '/enquiryInfo',
    component: enquiryInfo,
    meta: {        
      isUseCache: false,  // 这个字段的意思稍后再说      
      keepAlive: true  // 通过此字段判断是否需要缓存当前组件  
    }
  },
  {
    path: '/searchResult',
    name: '/searchResult',
    component: searchResult,
    meta: {        
      isUseCache: false,  // 这个字段的意思稍后再说      
      keepAlive: true  // 通过此字段判断是否需要缓存当前组件  
    }
  },
  {
    path: '/newIntention',
    name: 'newIntention',
    component: newIntention
  },
  /****个人模块****/
  {
    path: '/personalCenter',
    name: '/personalCenter',
    component: personalMsg
  },
  {
    path: '/dailyPaper',
    name: '/dailyPaper',
    component: dailyPaper
  },
  {
    path: '/ForgetPwd',
    name: '/ForgetPwd',
    component: ForgetPwd
  },{
    path: '/ResetPwd',
    name: '/ResetPwd',
    component: ResetPwd
  },{
    path: '/aboutUs',
    name: '/aboutUs',
    component: aboutUs
  },{
    path: '/personalData',
    name: '/personalData',
    component: personalData
  },
  {
    path: '/feedback',
    name: '/feedback',
    component: feedback,
    meta:{
      keepAlive:true,
      isUseCache:false
    }
  },{
    path: '/security',
    name: 'security',
    component: security
  },{
    path: '/resetMyPwd',
    name: 'resetMyPwd',
    component: resetMyPwd
  },

  {
    path: '/previewImg',
    name: '/previewImg',
    component:() => import('../pages/Personal/imgPreview')
  },
  {
    path: '/address/:customerId',
    name: 'address',
    component: () => import('../pages/Personal/address/address')
  },
  {
    path: '/addAddress/:customerId',
    name: 'addAddress',
    component: () => import('../pages/Personal/address/addAddress')
  },
  {
    path: '/selectAddress/:customerId',
    name: 'selectAddress',
    component: () => import('../pages/Personal/address/selectAddress')
  },
  {
    path: '/intentionProduct',
    name: 'intentionProduct',
    component: () => import('../pages/Personal/intention/intentionProduct')
  },
  {
    path: '/searchProduct',
    name: 'searchProduct',
    component: () => import('../pages/Personal/intention/searchProduct')
  },
  {
    path: '/followRecord',
    name: 'followRecord',
    component: () => import('../pages/Personal/intention/followRecord'),
    meta:{
      keepAlive:true,
      isUseCache:false
    }
  },
  {
    path: '/intention/:opportunityId',
    name: 'intention',
    component: () => import('../pages/Personal/intention/intention')
  },
  {
    path: '/addintention/:customerId',
    name: 'addintention',
    component: () => import('../pages/Personal/intention/addIntention'),
    meta:{
      keepAlive:false,
      isUseCache: true
    }
  },
  {
    path: '/updateintention/:customerId',
    name: 'updateintention',
    component: () => import('../pages/Personal/intention/updateIntention'),
    meta:{
      keepAlive:true,
      isUseCache: false
    }
  },
  //金管家模块-我的收藏
  {
    path: '/collectList',
    name: '/collectList',
    component: () => import('../pages/Personal/msManage/collect')
  },
  //金管家模块
  {
    path: '/msManage',
    name: '/msManage',
    component: () => import('../pages/msManage/msIndex')
  },
  {
    path: '/policy',
    name: '/policy',
    component: () => import('../pages/msManage/policy')
  },
  {
    path: '/story',
    name: '/story',
    component: () => import('../pages/msManage/story')
  },
  {
    path: '/question',
    name: '/question',
    component: () => import('../pages/msManage/question')
  },
  //首页搜索
  {
    path: '/search',
    name: '/search',
    component: () => import('../pages/msManage/search')
  },
  //文章详情
  {
    path: '/articleDetails',
    name: '/articleDetails',
    component: () => import('../pages/msManage/articleDetails')
  },
  //常见问题详情
  {
    path: '/questionDetail',
    name: '/questionDetail',
    component: () => import('../pages/msManage/questionDetail')
  },
  //营销助手图库主页
  {
    path: '/gallery',
    name: 'index',
    component: gallery
  },
  //搜索页
  {
    path: '/gSearch',
    name: 'gSearch',
    component: gSearch
  },
  //产品详情
  {
    path: '/productDetails',
    name: 'productDetails',
    component: productDetails
  },
  //产品列表
  {
    path: '/productList',
    name: 'productList',
    component: productList
  },
  //介绍页
  {
    path: '/recommend',
    name: 'recommend',
    component: recommend
  },
  //分享页
  {
    path: '/share',
    name: 'share',
    component: share
  },
  {
    path: '/preShare',
    name: 'preShare',
    component:preShare
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/home/index')
  },
  /***工作模块***/
  {
    path: '/work',
    name: 'work',
    component: () => import('../pages/work')
  },
  {
    path: '/dailyReport',
    name: 'dailyReport',
    component: () => import('../pages/work/dailyReport')
    // meta: {
    //   keepAlive: true // 需要被缓存
    // }
  },
  {
    path: '/orderSearch',
    name: 'orderSearch',
    component: () => import('../pages/work/orderSearch')
  },
  {
    path: '/orderDetail',
    name: 'orderDetail',
    component: () => import('../pages/work/orderDetail')
  },
  {
    path: '/newPlan',
    name: 'newPlan',
    component: () => import('../pages/work/newPlan')
    // meta: {
    //   keepAlive: true // 需要被缓存
    // }
  },
  //app二期迭代
  {
    path: '/chooseShop',
    name: 'chooseShop',
    component: () => import('../pages/customer/newCustomer/chooseShop')
  },
  {
    path: '/newAddress',
    name: 'newAddress',
    component: () => import('../pages/customer/newCustomer/newAddress')
  },
  //店长
  {
    path:'/storeCustomer',
    name:'storeCustomer',
    component: storeCustomer
  },
  {
    path:'/employeeList',
    name:'employeeList',
    component:employeeList
  },
  {
    path:'/storeDailyReport',
    name:'storeDailyReport',
    component:storeDailyReport
  },
  {
    path:'/employeeDailyReport/:id/:username/:date',
    name:'employeeDailyReport',
    component:employeeDailyReport,
    props:true
  },
  //经销商s
  {
    path:'/shopList',
    name:'shopList',
    component:shopList
  },
  {
    path:'/shopDetail/:id/:name',
    name:'shopDetail',
    component:shopDetail,
    props:true
  },
  {
    path:'/employeeDetail/:id/:name',
    name:'employeeDetail',
    component:employeeDetail,
    props:true
  },
  {
    path:'/workPlan',
    name:'workPlan',
    component:workPlan
  },
  {
    path:'/newWorkPlan',
    name:'newWorkPlan',
    component:newWorkPlan,
    meta:{
      keepAlive:true,
      isUseCache:false
    },
    props:(route) => ({id: route.query.id})
  },
  {
    path:'/searchCustomer',
    name:'searchCustomer',
    component:searchCustomer
  },
  {
    path:'/searchIntention',
    name:'searchIntention',
    component:searchIntention
  },
  //4s
  {
    path:'/index4s',
    name:'index4s',
    component:index4s
  },
  {
    path:'/record',
    name:'record',
    component:record
  },
  {
    path:'/recordJxs',
    name:'recordJxs',
    component:recordJxs
  },
  {
    path:'/recordDetails',
    name:'recordDetails',
    component:recordDetails
  },
  {
    path:'/itemDetails',
    name:'itemDetails',
    component:itemDetails
  },
  // 星级检查
  {
    path:'/starCheck',
    name:'starCheck',
    component: starCheck
  },
  {
    path:'/checkTip',
    name:'checkTip',
    component: checkTip
  },
  {
    path:'/check',
    name:'check',
    component: check
  },
  {
    path:'/judgeStar',
    name:'judgeStar',
    component:judgeStar
  },
  {
    path:'/starCheckW',
    name:'starCheckW',
    component:starCheckW
  },
  {
    path:'/searchIndex',
    name:'searchIndex',
    component:searchIndex
  },
  {
    path:'/starAtest',
    name:'starAtest',
    component:starAtest
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

