import {
  Request
} from '../Request/request'
import mango from '../js/'


class IndexModel extends Request {
  //获取令牌
  getToken(account, password) {
    return mango.getPostAjax({
      path: '/api/token',
      data: {
        grant_type: 'password', //固定填 password
        username: account, //登录账号
        password: password //MD5(密码)
      }
    })
  }
  //刷新令牌
  refreshToken(reToken) {
    return mango.getPostAjax({
      path: '/api/token',
      data: {
        grant_type: 'refresh_token',
        refresh_token: reToken
      }
    })
  }
  //知识库
  //获取首页轮播图
  getIndexSlider(classify) {
    return this.getData({
      url: '/api/train/repository/v1/adverts',
      params: {
        classify: classify
      }
    })
  }
  // 获取首页一级分类列表
  getCategory1List(classify) {
    return this.getData({
      url: '/api/train/repository/v1/category',
      params: {
        classify: classify,
        level: 1
      }
    })
  }
  //知识库首页置顶文章接口
  getTopArt(account, classify) {
    return this.getData({
      url: '/api/train/repository/v1/getTopRepository',
      params: {
        classify: classify,
        account: account
      }
    })
  }
  //首页搜索接口
  getArticleSearch(keyword, account, classify) {
    return this.getData({
      url: '/api/train/repository/v1/getRepositoryByKey',
      params: {
        key: keyword,
        account: account,
        classify: classify //1代表金管家2代表学院
      }
    })
  }
  //分页列表接口	 
  getCategories(categoryId) {
    return this.getData({
      url: '/api/train/repository/v1/getCategoryList',
      params: {
        id: categoryId
      }
    })
  }
  //文章列表接口	 
  getArticles(obj) {
    return this.getData({
      url: '/api/train/repository/v1/queryByCategoryId',
      params: obj
    })
  }
  //文章详情接口
  getArticleDetail(articleId, account) {
    return this.getData({
      url: '/api/train/repository/v1/get',
      params: {
        id: articleId,
        account: account
      }
    })
  }
  //问题收藏接口
  collect(type, id, account) {
    return this.getData({
      url: '/api/user/collect/v1/collect',
      params: {
        type: type,
        id: id,
        account: account
      }
    })
  }
  //移除收藏接口
  remove(type, id, account) {
    return this.getData({
      url: '/api/user/collect/v1/cancelCollect',
      params: {
        type,
        id,
        account
      }
    })
  }
  //问题搜索接口
  getQuestionSearch(key, account) {
    return this.getData({
      url: '/api/question/repository/v1//getQuestionList',
      params: {
        key: key,
        account: account,
        page: 1,
        limit: 200
      }
    })
  }
  //获取问题分类列表接口
  getQuestionCategoryList() {
    return this.getData({
      url: '/api/question/repository/v1/getCategoryList'
    })
  }
  //常见问题列表接口
  questionList(id, page, limit) {
    return this.getData({
      url: '/api/question/repository/v1//getQuestionList',
      params: {
        categoryId: id, //  问题分类id
        page: page,
        limit: limit
      }
    })
  }
  //常见问题详情接口
  questionDetail(id, account) {
    return this.getData({
      url: '/api/question/repository/v1/get',
      params: {
        id: id,
        account: account
      }
    })
  }

  //图库
  //品牌集合
  getBrand(account) {
    return this.getData({
      url: '/api/product/v1/brand',
      params: {
        account: account
      }
    })
  }
  //热门推荐//产品分类（幕思）
  MusiCategory() {
    return this.getData({
      url: '/api/product/v1/category'
    })
  }
  //品牌的产品列表
  brandCategory(brand) {
    return this.getData({
      url: '/api/product/v1/product/category',
      params: {
        brand: brand
      }
    })
  }
  //轮播图接口
  getAdvert(brand) {
    return this.getData({
      url: '/api/product/v1/advert',
      params: {
        brand: brand
      }
    })
  }
  //品牌介绍接口
  brandIntroduce(brand) {
    return this.getData({
      url: '/api/product/v1/introduce',
      params: {
        brand: brand
      }
    })
  }
  //搜索接口
  getProductList(key, account) {
    return this.getData({
      url: '/api/product/v1/product/list',
      params: {
        key: key,
        account: account
      }
    })
  }
  //筛选接口
  fliterList(obj) {
    return this.getData({
      url: '/api/product/v1/product/list',
      params: obj
    })
  }
  //收藏/分享接口
  galleryCollect(obj) { //3收藏，4分享
    return this.getData({
      url: '/api/user/collect/v1/collect',
      params: obj
    })
  }
  //取消收藏/分享
  galleryCancelCollect(obj) {
    return this.getData({
      url: '/api/user/collect/v1/cancelCollect',
      params: obj
    })
  }
  //产品详情
  productList(obj) {
    return this.getData({
      url: '/api/product/v1/product/details',
      params: obj
    })
  }
  //获取收藏文章/问题/产品接口
  getCollect(obj) {
    return this.getData({
      url: '/api/user/collect/v1/getcollect',
      params: obj
    })
  }
  //合成海报上传接口
  postImg(url) {
    return this.getPostData({
      url: '/upload/file',
      data: {
        dataFile: url
      }
    })
  }
  //获取个人日报概览数据
  getDailyData(obj) {
    return this.getTokenData({
      url: '/v2/app/daily',
      params: obj
    })
  }
  //获取用户个人数据
  getUserInfo(obj) {
    return mango.getAjax('/api/app/userinfo', obj)
  }

  //统一app和crm账号
  merge(obj) {
    return mango.getAjax('/v1/app//update/user/account', obj, 'post')
  }

  /* 
    报表模块 
  */
  //获取总体销售额
  getSalesData(obj) {
    // return mango.getAjax('/v1/app/userinfo', obj)
  }

  /* 
    工作模块 
  */
  //获取个人日报
  getDailyReport(obj) {
    return mango.getAjax('/v3/app/daily', obj)
  }
  //获取单日总结安排
  getCurMonthData(obj) {
    return mango.getAjax('/v3/app/summarize/list', obj)
  }
  //保存总结与计划
  savePlan(obj) {
    return mango.getAjax('/v3/app/summarize/update', obj, 'post')
  }
  //获取订单列表
  getOrderList(obj) {
    return mango.getAjax('/v3/app/order/list', obj)
  }
  getOrderDetails(orderId) {
    return mango.getAjax('/v3/app/order', {
      orderId: orderId
    })
  }
  /* 
    客户管理模块
  */
  getCusotmerList(obj) {
    return mango.getAjax('/v3/app/customer/list', obj)
  }
  getCusotmerList2(obj) {
    return mango.getAjax('/v3/app/customer/listbyuserId', obj)
  }
  //获取参考系
  getArea(type) {
    return mango.getAjax('/v2/app/reference', {
      type: type
    })
  }
  //获取地址列表
  getAddressList(id) {
    return mango.getAjax('/v2/app/address/list', {
      customerId: id
    })
  }
  //获取地址详情
  getAddress(id) {
    return mango.getAjax('/v2/app/address', {
      addressId: id
    })
  }

  //更新地址
  updateAddress(obj) {
    return mango.getAjax('/v2/app/address/update', obj, 'post')
  }
  //更新地址状态
  updateAddressStatus(obj) {
    return mango.getAjax('/v2/app/address/status', obj, 'post')
  }
  //保存反馈信息
  feedback(obj, key, jsonData) {
    return mango.getFormAjax('/v2/api/feedback', obj, key, jsonData)
    //return mango.port+'/v2/app/feedback';
  }
  //保存反馈信息
  getProduct(key) {
    return mango.getAjax('/v2/app/product', {
      key: key
    })
  }

  //获取参考系
  getType(type) {
    return mango.getAjax('/v2/app/reference', {
      type: type
    })
  }
  //获取省市区
  getCity(type, code) {
    return mango.getAjax('/v1/api/public/address', {
      type: type,
      parentCode: code
    })
  }
  //新建客户
  newCustomer(obj, type) {
    return mango.getAjax('/v3/app/customer/update', obj, type)
  }
  //保存游客
  getVisitor(obj, type) {
    return mango.getAjax('/v3/app/customer/tourist', obj, type)
  }
  //编辑客户信息
  updataCustomer(obj) {
    return mango.getAjax('/v3/app/customer/update', obj, 'post')
  }
  //获取客户详情
  getCustomerDetails(id) {
    return mango.getAjax('/v3/app/customer/details', {
      type: 'order',
      customerId: id
    })
  }
  //更新意向
  updateOpportunity(obj, key, jsonData) {
    return mango.getFormAjax('/v3/app/opportunity/update', obj, key, jsonData)
  }

  //获取意向详情
  getOpportunity(id) {
    return mango.getAjax('/v3/app/opportunity', {
      opportunityId: id
    })
  }

  //关闭意向
  closeOpportunity(obj) {
    return mango.getAjax('/v3/app/opportunity/close', obj, 'post')
  }

  //新建跟踪记录
  updateTrackrecord(obj, key, jsonData) {
    return mango.getFormAjax('/v3/app/trackrecord/update', obj, key, jsonData)
  }


  //编辑客户//新建客户
  updateCustomer(obj, key, jsonData) {
    return mango.getFormAjax('/v3/app/customer/update', obj, key, jsonData)
  }
  /* 
    个人模块  
  */

  //修改密码
  changePassword(obj, type) {
    return mango.getAjax('/v1/app/password', obj, type)
  }
  //检查姓氏是否存在
  checkLastName(obj) {
    return mango.getAjax('/v2/app/check/lastname', obj)
  }
  //检查手机或微信是否存在
  checkCustomer(obj) {
    return mango.getAjax('/v3/app/customer/check', obj)
  }
  //门店店长-门店客户
  getStoreCustomer(obj) {
    return mango.getAjax('/v3/app/customers', obj)
  }
  //门店店长-根据用户id获取工作台报表（id为店长时查询报表数据为门店总数据）
  getDailyStoreReport(obj) {
    return mango.getAjax('/v3/app/staffDaily', obj)
  }
  //门店店长-获取员工列表
  getEmployeeList(obj) {
    return mango.getAjax('/v3/app/shop/employee/list', obj)
  }
  //经销商-获取门店列表
  getShopList(obj) {
    return mango.getAjax('/v3/app/boss/shop/list', obj)
  }
  //获取员工日报
  getStaffDailyList(obj) {
    return mango.getAjax('/v3/app/getstaffdailylist', obj)
  }
  //根据员工id获取所属门店工作台报表
  getPerStoreReport(obj) {
    return mango.getAjax('/v3/app/shopworkbenchbyuser', obj)
  }
  //获取员工个人日报信息
  getPerDaily(obj) {
    return mango.getAjax('/v3/app/getdaily', obj)
  }
  //根据门店id获取门店工作台报表
  getPerStore(obj) {
    return mango.getAjax('/v3/app/shopworkbench', obj)
  }
  //根据门店id获取门店员工列表
  getStoreEmployeeList(obj) {
    return mango.getAjax('/v3/app/shopuser', obj)
  }
  //查询工作计划
  getPlanList(obj) {
    return mango.getAjax('/v3/app/workplan/workplanlist', obj)
  }
  //查询客户列表
  getCustomerList(obj) {
    return mango.getAjax('/v3/app/customers2', obj)
  }
  //查询客户意向列表
  getOppList(obj) {
    return mango.getAjax('/v3/app/customer/opportunitylist', obj)
  }
  //保存工作计划
  saveWorkPlan(obj, key, jsonData) {
    return mango.getFormAjax('/v3/app/workplan/save', obj, key, jsonData)
  }
  //根据工作计划id查看详情
  getPlanDetail(id) {
    return mango.getAjax('/v3/app/workplan/workplandetail', {
      id: id
    })
  }
  //修改工作计划
  updateWorkPlan(obj, key, jsonData) {
    return mango.getFormAjax('/v3/app/workplan/update', obj, key, jsonData)
  }
  //查询公告列表
  getNoticeList(obj) {
    return mango.getAjax('/v3/app/notice/noticelist', obj)
  }
  //查询公告详情
  getNoticedDetail(obj) {
    return mango.getAjax('/v3/app/notice/noticedetail', obj)
  }
}

export {
  IndexModel
}
export const indexModel = new IndexModel()