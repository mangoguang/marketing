import {
  Request
} from '@/Request/request'
import mango from '@/js/'

import {
  http, //带token
  httpDef
} from '../http'

const request = new Request()

//登录
export const loginAcount = params => {
  return http({
    url: '/api/token',
    method: 'post',
    params
  })
}


//获取用户信息
export const userinfo = params => {
  return http({
    url: '/api/app/userinfo',
    method: 'get'
  })
}


//获取星级
export const guideStar = params => {
  return request.getData({
    url: '/api/4s/cert/guide/star',
    params
  })
}

/**
 *   首页 - 店长（导购）获取门店列表（username:19040049）
 * @param {*} params 
 */
export const gradeShops = params => {
  return http({
    url: '/api/cert/grade/shops',
    method: 'get',
    params
  })
}

//店长（导购）获取一级和二级评分分类（username:19040049）
export const gradeCategories = params => {
  return http({
    url: '/api/cert/grade/categories',
    method: 'get',
    params
  })
}

/**
 *  3 店长（导购）通过二级分类id获取三级评分分类及其评分细项（username:19040049）
 * @param {*} params 
 */
export const gradeSubcategories = params => {
  return http({
    url: '/api/cert/grade/subcategories',
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
    url: '/api/upload/file',
    method: 'post',
    params
  }, true)
}

/**
 *  4 上传视频或图片
 * @param {*} params 
 */
export const uploadFiles = params => {
  return http({
    url: '/api/upload/files',
    method: 'post',
    params
  }, true)
}

/**
 *  5 店长（导购）提交打分数据（username:19040049）
 * @param {*} params 
 */
export const gradeSubmit = params => {
  return httpDef.post('/api/cert/grade/submit',
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
    url: '/api/4s/cert/approve/distributor/list',
    params
  })
}

/**
 *  app - 发起申请
 * @param {*} params 
 */
export const distributorApply = params => {
  return http({
    url: '/api/4s/cert/approve/distributor/apply',
    params
  })
}


/**
 *  app - 经销商申请记录列表
 * @param {*} params 
 */
export const distributorLogList = params => {
  return http({
    url: '/api/4s/cert/approve/distributor/logList',
    params
  })
}


/**
 *  app - 撤销申请
 * @param {*} params 
 */
export const distributorCancel = params => {
  return http({
    url: '/api/4s/cert/approve/distributor/cancel',
    params
  })
}


/**
 *  5 检查记录 - 列表
 * @param {*} params 
 */
export const distributorshops = params => {
  return http({
    url: '/api/cert/checklog/distributorshops',
    method: 'get',
    params
  })
}

/**
 *  2  督导获取门店历史检查记录（username:19040139）
 * @param {*} params 
 */
export const checklogs = params => {
  return http({
    url: '/api/cert/checklog/checklogs',
    method: 'get',
    params
  })
}

/**
 * 6 检查记录 - 评星结果
 * @param {*} params 
 */
export const resultList = params => {
  return http({
    url: '/api/4s/cert/approve/distributor/resultList',
    method: 'post',
    params
  })
}

/**
 * 获取门店历史记录一级分类列表（username:19040139）
 * @param {*} params 
 */
export const checkcategories = params => {
  return http({
    url: '/api/cert/checklog/checkcategories',
    method: 'get',
    params
  })
}


/**
 * 获取门店详细星级评分（username:19040139）
 * @param {*} params 
 */
export const checkloginfo = params => {
  return http({
    url: '/api/cert/checklog/checkloginfo',
    method: 'get',
    params
  })
}

/**
 * 获取评分标准项列表（username:19040139）
 * @param {*} params 
 */
export const checklogStandards = params => {
  return http({
    url: '/api/cert/checklog/standards',
    method: 'get',
    params
  })
}

/**
 * 获取评分标准项扣分明细（username:19040139）
 * @param {*} params 
 */
export const checklogStandardinfo = params => {
  return http({
    url: '/api/cert/checklog/standardinfo',
    method: 'get',
    params
  })
}


/**
 * app - 评星情况 -  进度弹框，认证进度
 * @param {*} params 
 */
export const getApproveFlowInfo = params => {
  return http({
    url: '/api/4s/cert/approve/getApproveFlowInfo',
    method: 'get',
    params
  })
}

/**
 * 验收评分 - 门店检查列表  - 检查详情 - 获取各星级评分详情
 * @param {*} params 
 */
export const starGrade = params => {
  return http({
    url: '/api/4s/cert/approve/approveCheckLog/starGrade',
    method: 'post',
    params
  })
}

/**
 * 验收评分 - 门店检查列表  - 检查详情 - 获取下拉框
 * @param {*} params 
 */
export const gradeDetailList = params => {
  return http({
    url: '/api/4s/cert/approve/approveCheckLog/gradeDetailList',
    method: 'post',
    params
  })
}

/**
 * 验收评分 - 门店检查列表  - 检查详情 - 获取细项扣分详情
 * @param {*} params 
 */
export const gradeDetailInfo = params => {
  return http({
    url: '/api/4s/cert/approve/approveCheckLog/gradeDetailInfo',
    method: 'post',
    params
  })
}