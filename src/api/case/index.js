import {
  baseUrl
} from '@/api/baseUrl'
import {
  http
} from '@/api/http'

//根据用户账号查询用户收藏的案例
export const collectlist = params => {
  return http({
    url: baseUrl + '/consumer-admin/v1/api/goodCase/collectlist',
    method: 'get',
    params
  })
}

//我的案例
export const goodCaseList = params => {
  return http({
    url: baseUrl + '/consumer-admin/v1/api/goodCase/list',
    method: 'get',
    params
  })
}

//删除案例
export const goodCaseDelete = params => {
  return http({
    url: baseUrl + '/consumer-admin/v1/api/goodCase/delete',
    method: 'get',
    params
  })
}

//根据案例id查看详情
export const goodCaseDetails = params => {
  return http({
    url: baseUrl + '/consumer-admin/v1/api/goodCase/details',
    method: 'get',
    params
  })
}

//取消用户收藏的案例
export const cancelCollect = params => {
  return http({
    url: baseUrl + '/consumer-admin/api/user/collect/v1/cancelCollect',
    method: 'get',
    params
  })
}

//用户收藏的案例
export const collect = params => {
  return http({
    url: baseUrl + '/consumer-admin/api/user/collect/v1/collect',
    method: 'get',
    params
  })
}

//获取城市阿里
// export const getIpCity = params => {
//   return http({
//     url: 'https://ip.taobao.com/service/getIpInfo.php',
//     method: 'get',
//     params
//   })
// }

//获取所有有效品牌
export const brandList = params => {
  return http({
    url: baseUrl + '/consumer-admin/api/good/brand/list',
    method: 'get',
    params
  })
}

//获取所有有效品类
export const categoryList = params => {
  return http({
    url: baseUrl + '/consumer-admin/api/good/category/list',
    method: 'get',
    params
  })
}
//.关键字模糊搜索产品型号
export const getModelno = params => {
  return http({
    url: baseUrl + '/consumer-admin/v1/api/goodCase/getmodelno',
    method: 'get',
    params
  })
}

//关键字模糊搜索产品名称
export const getNames = params => {
  return http({
    url: baseUrl + '/consumer-admin/v1/api/goodCase/getnames',
    method: 'get',
    params
  })
}

//.新增案例
export const goodCaseSave = params => {
  return http.post(
    baseUrl + '/consumer-admin/v1/api/goodCase/save',
    params, {
      timeout: 50000,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
}

//.修改案例
export const goodCaseUpdate = params => {
  return http.post(
    baseUrl + '/consumer-admin/v1/api/goodCase/update',
    params, {
      timeout: 50000,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
}

//.修改案例
export const topNames = params => {
  return http({
    url: baseUrl + '/consumer-admin/v1/api/goodCase/topNames',
    method: 'get',
    params
  })
}