import axios from 'axios'
//let baseUrl = 'https://op.derucci.com'
let baseUrl = 'https://mobiletest.derucci.net/consumer-admin'
//let baseUrl = 'http://10.11.8.17'
//let baseUrl = 'http://172.16.4.201'
//let baseUrl = 'http://10.11.8.250'
// let baseUrl = 'http://10.11.8.229'
// let baseUrl = 'http://172.16.8.216'
// let baseUrl = 'http://10.11.8.7'
// let baseUrl = 'http://10.12.0.117'
//let baseUrl = 'http://172.16.10.107'
// let baseUrl = 'http://10.11.8.250:8088'
let token = JSON.parse(localStorage.getItem('token'))
export {baseUrl}
class Request {
  getData ({ url, params, method = 'GET' }) {
    return new Promise((resolve, reject) => {
      axios({
        url: baseUrl + url,
        params: params,
        method: method
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  getPostData ({url, data}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: baseUrl + url,
        data: data,
        transformRequest: [function(data) {
          let ret = ''
          for(let it in data) {
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

  getTokenData ({ url, params, method = 'GET' }) {
    console.log('token123', token)
    return new Promise((resolve, reject) => {
      axios({
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
}
export {Request}
