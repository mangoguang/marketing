import { Request } from './request'
import mango from '../js'
class IndexModel extends Request {
  //获取客户列表
  getType(type) {
    return mango.getAjax('/v2/app/reference', {
      type: type
    })
  }
}

export { IndexModel }