import {
  caseUrl
} from '@/api/baseUrl'
import {
  http,
  upload
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

//根据案例id查看详情
export const cancelCollect = params => {
  return http({
    url: caseUrl + '/v1/api/user/collect/v1/cancelCollect',
    method: 'get',
    params
  })
}

//获取城市阿里
export const getIpCity = params => {
  return http({
    url: 'https://ip.taobao.com/service/getIpInfo.php',
    method: 'get',
    params
  })
}

//获取所有有效品牌
export const brandList = params => {
  return http({
    url: caseUrl + '/api/good/brand/list',
    method: 'get',
    params
  })
}

//获取所有有效品类
export const categoryList = params => {
  return http({
    url: caseUrl + '/api/good/category/list',
    method: 'get',
    params
  })
}

//获取所有有效品类
export const getNames = params => {
  return http({
    url: caseUrl + '/v1/api/goodCase/getnames',
    method: 'get',
    params
  })
}