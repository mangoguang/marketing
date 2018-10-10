import sha1 from 'js-sha1'
import axios from 'axios'
import { Indicator } from 'mint-ui'

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
      this.loading('open')
      let loadingTimeOut = setTimeout(function() {
        _this.loading('close')
        clearTimeout(loadingTimeOut)
      }, 5000)
      axios({
        method: 'get',
        url: url,
        // timeout: 3000,
        headers: {
          'token': _vue.ajaxData.token,
          'UUID': _vue.ajaxData.uuid,
          'sign': sign
        },
        params: params
      })
      .then((res) => {
        _this.loading('close')
        if (res.data) {
          resolve(res.data)
        } else {
          resolve(false)
        }
      })
    })
  }
  // 加载动画
  loading(str) {
    if (str === 'open') {
      Indicator.open({
        text: '数据请求中...',
        spinnerType: 'fading-circle'
      })
      let loadingTime = setTimeout(function() {
        Indicator.close()
      }, 5000)
    } else {
      Indicator.close()
    }
  }
  // 获取当前日期，以2018-08-30的格式返回
  indexTime(date) {
    if (!date) {
      date = new Date()
    }
    let tempArr = date.toLocaleDateString().split('/').slice(0, 2)
    if (tempArr[1] < 10) {
      tempArr[1] = `0${tempArr[1]}`
    }
    return tempArr.join('-')
  }
  // 获取本地存储时间
  getLocalTime(type) {
    let time = localStorage.getItem(`${type}Time`)
    if (time) {
      return time
    } else {
      return this.indexTime()
    } 
  }
}