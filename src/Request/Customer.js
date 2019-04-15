import { Request } from './request'
import mango from '../js'
class IndexModel extends Request {
  //获取客户列表
  getCustomerList(obj) {
    return mango.getAjax('/v3/app/customer/list', obj)
  }
}

export { IndexModel }