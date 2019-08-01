import {
  Request
} from '@/Request/request'
import mango from '@/js/'

import {
  http, //带token
  httpDef
} from './http'

const request = new Request()

//获取星级
export const userinfo = params => {
  return mango.getAjax('/v1/app/userinfo', params)
}


//获取星级
export const guideStar = params => {
  return request.getData({
    url: '/v2/api/4s/cert/guide/star',
    params
  })
}

/**
 *   首页 - 店长（导购）获取门店列表（username:19040049）
 * @param {*} params 
 */
export const gradeShops = params => {
  return http({
    url: '/v2/api/cert/grade/shops',
    method: 'get',
    params
  })
}

//店长（导购）获取一级和二级评分分类（username:19040049）
export const gradeCategories = params => {
  return http({
    url: '/v2/api/cert/grade/categories',
    method: 'get',
    params
  })
}

/**
 *  3 店长（导购）通过二级分类id获取三级评分分类及其评分细项（username:19040049）
 * @param {*} params 
 */
export const gradeSecondcategories = params => {
  return http({
    url: '/v2/api/cert/grade/subcategories',
    method: 'get',
    params
  })
}

/**
 *  4 上传视频或图片
 * @param {*} params 
 */
export const uploadFile = params => {
  return http({
    url: '/upload/file',
    method: 'post',
    params
  }, true)
}

/**
 *  5 店长（导购）提交打分数据（username:19040049）
 * @param {*} params 
 */
export const gradeSubmit = params => {
  return httpDef.post('/v2/api/cert/grade/submit',
    params, {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}

/**
 *  app - 经销商申请认证列表
 * @param {*} params 
 */
export const distributorList = params => {
  return http({
    url: '/v2/api/4s/cert/approve/distributor/list',
    params
  })
}

/**
 *  app - 发起申请
 * @param {*} params 
 */
export const distributorApply = params => {
  return http({
    url: '/v2/api/4s/cert/approve/distributor/apply',
    params
  })
}


/**
 *  app - 经销商申请记录列表
 * @param {*} params 
 */
export const distributorApplys = params => {
  return http({
    url: '/v2/api/4s/cert/approve/distributor/logList',
    params
  })
}


/**
 *  app - 撤销申请
 * @param {*} params 
 */
export const distributorCancel = params => {
  return http({
    url: '/v2/api/4s/cert/approve/distributor/cancel',
    params
  })
}


/**
 *  5 检查记录 - 列表
 * @param {*} params 
 */
export const checkList = params => {
  return http({
    url: '/v2/api/4s/cert/approve/distributor/checkList',
    method: 'post',
    params
  })
}