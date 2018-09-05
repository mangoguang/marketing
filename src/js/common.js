import sha1 from 'js-sha1'

export default class Common {
  constructor() {
    this.path = 'http://10.11.8.7:8086/v1/app/report/'
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
  getAjax(url, params) {
    return new Promise((resolve, reject) => {

    })
  }
}