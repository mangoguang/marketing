import {
  caseUrl
} from '@/api/baseUrl'
import {
  http
} from '@/api/http'

//根据用户账号查询用户收藏的案例
export const collectlist = params => {
  return http({
    url: caseUrl + '/v1/api/goodCase/collectlist',
    method: 'get',
    params
  })
}

//我的案例
export const goodCaseList = params => {
  return http({
    url: caseUrl + '/v1/api/goodCase/list',
    method: 'get',
    params
  })
}

//删除案例
export const goodCaseDelete = params => {
  return http({
    url: caseUrl + '/v1/api/goodCase/delete',
    method: 'get',
    params
  })
}

//根据案例id查看详情
export const goodCaseDetails = params => {
  return http({
    url: caseUrl + '/v1/api/goodCase/details',
    method: 'get',
    params
  })
}