import { Request } from './request'

class IndexModel extends Request {
  getCustomerList(obj) {
    return this.getData({
      url: '/v3/app/customer/list',
      data: obj
    })
  }
}

export { IndexModel }