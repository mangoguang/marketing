import { Request } from './request'


class IndexModel extends Request {
  // 获取首页一级分类列表
  getCategory1List() {
    return this.getData({
      url: '/api/train/repository/v1/category'
    })
  }
  //首页搜索接口
  getArticleSearch(keyword,account) {
    return this.getData({
      url: '/api/train/repository/v1/getRepositoryByKey',
      params: {
        key: keyword,
        account: account
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
        account:account
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
  questionList(id) {
    return this.getData({
      url: '/api/question/repository/v1//getQuestionList',
      params: {
        categoryId: id  //  问题分类id
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
}

export { IndexModel }