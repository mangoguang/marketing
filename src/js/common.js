import sha1 from 'js-sha1'
import axios from 'axios'

export default class Common {
  constructor() {
    // this.port = 'http://172.16.11.127/'
    this.port = 'http://10.11.8.7:8086/'
    this.path = `${this.port}v1/app/report/`
  }
  // 对象排序
  sortObj(obj) {
    let [temp, arr] = [{}, []]
    for (let key in obj) {
      arr.push(key)
    }
    arr = arr.sort()
    for (let i in arr) {
      temp[arr[i]] = obj[arr[i]]
    }
    return temp
  }
  // 参数加密
  getSign(obj, token) {
    obj = this.sortObj(obj)
    let str = ''
    for (let key in obj) {
      str = str === '' ? `${key}=${obj[key]}` : `${str}&${key}=${obj[key]}`
    }
    // console.log('生成的sign字符串', str)
    return sha1.hex(str + token)
  }
  getAjax(_vue, port, params) {
    let _this = this
    return new Promise((resolve, reject) => {
      const url = `${this.path}${port}`
      let sign = this.getSign(params, _vue.ajaxData.token)
      // console.log('header参数', _vue, sign)
      axios({
        method: 'get',
        url: url,
        headers: {
          'token': _vue.ajaxData.token,
          'UUID': _vue.ajaxData.uuid,
          'sign': sign
        },
        params: params
      })
      .then((res) => {
        if (res.data) {
          resolve(res.data)
        } else {
          resolve(false)
        }
      })
    })
  }
}