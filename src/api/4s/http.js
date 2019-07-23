import {
  baseUrl
} from '@/js/common'

import axios from 'axios'
import qs from 'qs'
import {
  Indicator,
  Toast
} from 'mint-ui'
import {
  getSign
} from '@/utils/tools.js'

import {
  router
} from '@/router'

axios.defaults.timeout = 500000
let token = JSON.parse(localStorage.getItem('token')) || {}
axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}
axios.defaults.baseURL = baseUrl
if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line
  axios.defaults.baseURL = 'https://agency.derucci.com'
}

// http request 拦截器
axios.interceptors.request.use((config) => {
    config.data = qs.stringify(config.data)
    Indicator.open({
      text: '数据请求中...',
      spinnerType: 'fading-circle'
    });

    return config
  },
  error => {
    Indicator.close();
    Toast('数据请求失败');
    return Promise.resolve(error)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    Indicator.close();
    return response.data
  },
  error => {
    Indicator.close();
    if (error.response.status == 510) {
      router.push({
        path: '/Login'
      })
    }
    return Promise.reject(error)
  }
)

//默认
export const httpDef = axios

//需要token
export const http = (options) => {
  axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    "Authorization": `Bearer ${token.access_token}`,
    'sign': getSign(options.params, token.access_token)
  }
  return axios(options)
}