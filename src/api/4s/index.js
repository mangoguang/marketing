import {
  Request
} from '@/Request/request'
import mango from '@/js/'

const request = new Request()

//获取星级
export const guideStar = params => {
  return request.getData({
    url: '/v2/api/4s/cert/guide/star',
    params
  })
}

// export const guideStar = params => {
//   return request.getData({
//     url: '/api/train/repository/v1/getTopRepository',
//     params
//   })
// }