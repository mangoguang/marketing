import { Request } from './request'

class IndexModel extends Request {
  // 模拟获取抽奖类型
  // getAwardList() {
  //   return this.getData({
  //     url: '/good/seller',
  //   })
  // }
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