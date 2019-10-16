import axios from 'axios'
var http = axios.create()
import {
  Indicator,
  Toast
} from 'mint-ui'
//let baseUrl = 'https://op.derucci.com'
let baseUrl = 'https://mobiletest.derucci.net/consumer-admin'
//let baseUrl = 'http://10.11.8.17:8088'
//let baseUrl = 'http://172.16.4.201'
//let baseUrl = 'http://10.11.8.250'
// let baseUrl = 'http://10.11.8.229'
// let baseUrl = 'http://172.16.8.216'
// let baseUrl = 'http://10.11.8.7'
// let baseUrl = 'http://10.12.0.117'
//let baseUrl = 'http://172.16.10.107'
// let baseUrl = 'http://10.11.8.250:8088'
let token = JSON.parse(localStorage.getItem('token') || '{}')
export {
  baseUrl
}
class Request {
  getData({
    url,
    params,
    method = 'GET'
  }) {
    return new Promise((resolve, reject) => {
      this.loading('open')
      http({
        url: baseUrl + url,
        params: params,
        method: method
      }).then(res => {
        this.loading('close')
        resolve(res.data)
      }).catch(err => {
        this.loading('close')
        reject(err)
      })
    })
  }

  getPostData({
    url,
    data
  }) {
    return new Promise((resolve, reject) => {
      http({
        method: 'post',
        url: baseUrl + url,
        data: data,
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {

        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  getTokenData({
    url,
    params,
    method = 'GET'
  }) {
    console.log('token123', token)
    return new Promise((resolve, reject) => {
      http({
        url: baseUrl + url,
        headers: {
          'Authorization': token.access_token
        },
        params: params,
        method: method
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
  loading(str) {
    if (str === 'open') {
      Indicator.open({
        text: '数据请求中...',
        spinnerType: 'fading-circle'
      })
      // let loadingTime = setTimeout(function() {
      //   Indicator.close()
      //   clearTimeout(loadingTime)
      // }, 15000)
    } else {
      Indicator.close()
    }
  }
}
export {
  Request
}