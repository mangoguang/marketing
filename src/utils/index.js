import { Request } from './request'


class IndexModel extends Request {
  // 获取首页一级分类列表
  getCategory1List() {
    return this.getData({
      url: 'http://10.11.8.250/api/train/repository/v1/category'
    })
  }
  //首页搜索接口
  getArticleSearch(keyword) {
    return this.getData({
      url: 'http://10.11.8.250/api/train/repository/v1/getRepositoryByKey',
      params: {
        key: keyword
      }
    })
  }
  //分页列表接口	 
  getCategories(categoryId) {
    return this.getData({
      url: 'http://10.11.8.250/api/train/repository/v1/getCategoryList',
      params: {
        id: categoryId 
      }
    })
  }
  //文章列表接口	 
  getArticles(obj) {
    return this.getData({
      url: 'http://10.11.8.250/api/train/repository/v1/queryByCategoryId',
      params: obj
    })
  }
  //文章详情接口
  getArticleDetail(articleId) {
    return this.getData({
      url: 'http://10.11.8.250/api/train/repository/v1/get',
      params: {
        id: articleId
      }
    })
  }
  //收藏接口
  collect(obj) {
    return this.getData({
      url: '/get/collect',
      params: obj
    })
  }
  //移除收藏接口
  remove(obj) {
    return this.getData({
      url: '/get/remove',
      params: obj
    })
  }
  //问题搜索接口
  getQuestionSearch(key) {
    return this.getData({
      url: 'http://10.11.8.250/api/question/repository/v1//getQuestionList',
      params: {
        key: key
      }
    })
  }
  //获取问题分类列表接口
  getQuestionCategoryList() {
    return this.getData({
      url: 'http://10.11.8.250/api/question/repository/v1/getCategoryList'
      // params: {
      //   id: id
      // }
    }) 
  }
  //常见问题列表接口
  questionList(id) {
    return this.getData({
      url: 'http://10.11.8.250/api/question/repository/v1//getQuestionList',
      params: {
        categoryId: id  //  问题分类id
      }
    })
  }
  //常见问题详情接口
  questionDetail(id) {
    return this.getData({
      url: 'http://10.11.8.250/api/question/repository/v1//getQuestionList',
      params: {
        id: id
      }
    })
  }
}

export { IndexModel }