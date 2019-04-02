import axios from 'axios'
//let baseUrl = 'https://mobiletest.derucci.net/consumer-admin'
 let baseUrl = 'http://10.11.8.250'
// let baseUrl = 'http://10.11.8.229'
// let baseUrl = 'http://172.16.8.216'
// let baseUrl = 'http://10.11.8.7'
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
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
export {Request}
