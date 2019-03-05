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
      url: '/get/articleSearch',
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
  //常见问题列表接口
  questionList(id) {
    return this.getData({
      url: '/get/questionList',
      params: {
        questionCategoryId: id  //  问题分类id
      }
    })
  }
  //常见问题详情接口
  questionDetail(id) {
    return this.getData({
      url: '/get/questionDetail',
      params: {
        questionId: id
      }
    })
  }

  //test
  test() {
    return this.getData({
      url: 'http://10.11.8.250/api/train/repository/v1/get',
      params: {
        id: '1102757829179252738'
      }
    })
  }



  getList () {
    return this.getData({
      url: 'http://10.11.8.7/api/train/repository/v1/get',
      params: {
        id: '1038252893971357698 '
      }
    })
  }
  rotateSaveInfo() {
    return this.getPostData({
      url: '',
      data: {

      }
    })
  }
}

export { IndexModel }