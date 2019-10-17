import {
  baseUrl
} from '@/api/baseUrl'

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
  axios.defaults.baseURL = 'https://mobiletest.derucci.net'

}


let instance = axios.create({
  baseURL: baseUrl,
  showLoading: true,
  timeout: 5000
})

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
export const http = (options) => {
  let token = JSON.parse(localStorage.getItem('token') || '{}')
  let header = {
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${token.access_token}`,
    'sign': token.access_token
  }
  header = Object.assign(header, options.headers)
  options.headers = header
  return instance(options)
}

export const postJson = (url, params, mheader = {}) => {
  let token = JSON.parse(localStorage.getItem('token') || '{}')
  let dheader = {
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${token.access_token}`,
    'sign': token.access_token
  }
  let headers = Object.assign(dheader, mheader)
  return instance.post(url, params, {
    headers
  })
}

export const req = instance

export const upload = (url, params) => {
  let token = JSON.parse(localStorage.getItem('token') || '{}')
  let options = {
    headers: {
      'Content-Type': 'multipart/form-data',
      "Authorization": `Bearer ${token.access_token}`,
      'sign': token.access_token
    },
    timeout: 50000
  }
  return instance.post(url, params, options);
}