import { Request } from './request'


class IndexModel extends Request {
  // 获取首页一级分类列表
  getCategory1List() {
    return this.getData({
      url: '/get/category1List'
    })
  }
  //首页搜索接口
  getArticleSearch(keyword) {
    return this.getData({
      // url: '/get/articleSearch',
      url: 'http://10.11.8.250/api/train/repository/v1/getRepositoryByKey',
      params: {
        key: keyword
      }
    })
  }
  //分页列表接口	      //传list的时候顺序问题！！！
  getCategories(type, categoryId) {
    return this.getData({
      url: '/get/categories',
      params: {
        type: type,//article/question,  //  article:文章分类，question：问题分类
        categoryId: categoryId  //  一级分类id（此参数文章分类的时候才需要，问题分类不需要传）
      }
    })
  }
  //文章列表接口	  //scategory1Id: 'servicePolicy',  //  一级分类代码，必须 category2Id,category3Id
  getArticles(obj) {
    return this.getData({
      url: '/get/articles',
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
    }) 
  }
  //常见问题列表接口
  questionList(id) {
    return this.getData({
      // url: '/get/questionList',
      url: 'http://10.11.8.250/api/question/repository/v1//getQuestionList',
      params: {
        categoryId: id  //  问题分类id
      }
    })
  }
  //常见问题详情接口
  questionDetail(id) {
    return this.getData({
      // url: '/get/questionDetail',
      url: 'http://10.11.8.250/api/question/repository/v1//getQuestionList',
      params: {
        id: id
      }
    })
  }

  //test
  test() {
    return this.getData({
      url: 'http://10.11.8.250/api/question/repository/v1/getCategoryList',
      params: {
        // id: "1098130239495827458"
      }
    })
  }



}

export { IndexModel }