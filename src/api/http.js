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

if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line
  // axios.defaults.baseURL = 'https://agency.derucci.com'
  axios.defaults.baseURL = 'https://mobiletest.derucci.net/cd-sys-web'

}

let token = JSON.parse(localStorage.getItem('token')) || {}
let instance = axios.create({
  baseURL: 'https://mobiletest.derucci.net',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    "Authorization": `Bearer ${token.access_token}`,
    'sign': token.access_token // getSign(options.params, token.access_token)
  },
  showLoading: true,
  timeout: 3000
})

// axios.defaults.timeout = 500000

// axios.defaults.headers = {
//   'Content-Type': 'application/x-www-form-urlencoded'
// }
// axios.defaults.baseURL = 'https://mobiletest.derucci.net' // baseUrl
// if (process.env.NODE_ENV === 'production') {
//   // eslint-disable-next-line
//   // axios.defaults.baseURL = 'https://agency.derucci.com'
//   axios.defaults.baseURL = 'https://mobiletest.derucci.net/cd-sys-web'

// }

// http request 拦截器
instance.interceptors.request.use((config) => {
    if (config.headers['Content-Type'] == 'application/x-www-form-urlencoded') {
      config.data = qs.stringify(config.data)
    }
    if (config.headers['Content-Type'] == 'application/json') {
      config.data = JSON.stringify(config.data)
    }
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
instance.interceptors.response.use(
  response => {
    Indicator.close();
    return response.data
  },
  error => {
    Indicator.close();
    if (error && error.response && error.response.status == 510) {
      router.push({
        path: '/Login'
      })
    } else {
      Toast('请求失败，请检查网络')
    }
    return Promise.reject(error)
  }
)

//默认的
export const http = instance

//需要token


// export const http = (options, isFile) => {

//   axios.defaults.headers = {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     "Authorization": `Bearer ${token.access_token}`,
//     'sign': getSign(options.params, token.access_token)
//   }
//   if (isFile) {
//     var instance = axios.create()
//     return instance.post(options.url, options.params);

//   }
//   return axios(options)
// }