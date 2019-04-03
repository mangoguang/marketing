import { Request } from '../Request/request'


class IndexModel extends Request {
  //获取令牌
  getToken(account,password) {
    return this.getPostData({
      url: '/oauth/token',
      data: {
        grant_type:'password',        //固定填 password
        username: account,   //登录账号
        password: password    //MD5(密码)
      }
    })
  }
  //刷新令牌
  refeshToken(reToken) {
    return this.getPostData({
      url: '/oauth/token',
      data: {
        grant_type:'refresh_token',  
        refresh_token: reToken
      }
    })
  }
  // 获取首页一级分类列表
  getCategory1List() {
    return this.getData({
      url: '/api/train/repository/v1/category',
      params: {
        classify: 1,
        level: 1
      }
    })
  }
  //知识库首页置顶文章接口
  getTopArt(account) {
    return this.getData({
      url: '/api/train/repository/v1/getTopRepository',
      params: {
        classify: 1,
        account: account
      }
    })
  }
  //首页搜索接口
  getArticleSearch(keyword,account) {
    return this.getData({
      url: '/api/train/repository/v1/getRepositoryByKey',
      params: {
        key: keyword,
        account: account,
        classify:1        //1代表金管家2代表学院
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
        account:account,
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
  questionList(id,page,limit) {
    return this.getData({
      url: '/api/question/repository/v1//getQuestionList',
      params: {
        categoryId: id,  //  问题分类id
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
  galleryCollect(obj) {        //3收藏，4分享
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
  productList(id, account) {
    return this.getData({
      url: '/api/product/v1/product/details',
      params: {
        productId: id,
        account: account
      }
    })
  }
  //获取收藏文章/问题/产品接口
  getCollect(obj){
    return this.getData({
      url:'/api/user/collect/v1/getcollect',
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
  
}

export { IndexModel }