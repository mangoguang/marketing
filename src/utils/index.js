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