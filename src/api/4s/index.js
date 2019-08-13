import {
  Request
} from '@/Request/request'
import mango from '@/js/'

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
 *  首页 - 店长（导购）获取所有一级分类、所有门店、当前门店星级
 * @param {*} params 
 */
export const gradeHome = params => {
  return mango.getAjax('/v2/api/cert/grade/home', params)
}


/**
 *  店长（导购）通过一级分类获取二级评分分类
 * @param {*} params 
 */
export const secondcategories = params => {
  return mango.getAjax('/v2/api/cert/grade/secondcategories', params)
}