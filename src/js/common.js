import sha1 from 'js-sha1'
import axios from 'axios'
import { Indicator } from 'mint-ui'

export default class Common {
  constructor() {
    // this.port = 'https://agency.derucci.com/'
    // this.port = 'http://172.16.11.123/'
    // this.port = 'http://10.11.8.181/'
    this.port = 'http://10.11.8.7:8086/'
    this.path = `${this.port}v1/app/report/`
    this.v2path = `${this.port}v2/app/`
    this.version = 'web'
  }
  // 如果输出年份顺序不对，则重新排序
  sortYears(res) {
    if (res.series && res.series[0]) {
      if (res.series[0].name < res.series[1].name) {
        let temp = res.series[0]
        res.series[0] = res.series[1]
        res.series[1] = temp
      }
    }
  }
  //根据对象属性，进行数组对象的排序
  compare(property) {
    return function(obj1, obj2) {
      let [val1, val2] = [obj1[property], obj2[property]]
      if (val1 < val2) {
        return -1
      } else if (val1 > val2) {
        return 1
      } else {
        return 0
      }
    }
  }
  // 使用冒泡排序法，对对象多个关联数组进行排序
  sortArrs(obj) {
    let [series, newSeries, yAxisData, idsData] = [obj.series, [], obj.yAxisData, obj.idsData]
    // let [series1, series2, yAxisData, idsData] = [obj.series[0].data, obj.series[0].data, obj.yAxisData, obj.idsData]
    if (series) {
      // console.log(`series数据是有效的。长度为${series.length}`)
      for (let i = 0; i < series.length; i++) {
        newSeries[i] = series[i].data
      }
    }
    for (let i = 0; i < newSeries[0].length; i++) {
      for (let j = 0; j < newSeries[0].length - i; j++) {
        if (parseInt(newSeries[0][j]) > parseInt(newSeries[0][j + 1])) {
          let [tempSeries, tempYAxisData] = [[], yAxisData[j]]
          // 对series参数的两个数组进行排序
          for (let k = 0; k < series.length; k++) {
            tempSeries[k] = newSeries[k][j]
            newSeries[k][j] = newSeries[k][j + 1]
            newSeries[k][j + 1] = tempSeries[k]
          }
          // 对yAxisData参数进行排序
          yAxisData[j] = yAxisData[j + 1]
          yAxisData[j + 1] = tempYAxisData
          // 如果存在店铺id数据，则对店铺id数据进行排序。
          if (idsData) {
            let tempIdsData = idsData[j]
            idsData[j] = idsData[j + 1]
            idsData[j + 1] = tempIdsData
          }
        }
      }
    }
  }
  // 参数加密
  getSign(obj, token) {
    // 对象排序
    function sortObj(obj) {
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
    obj = sortObj(obj)
    let str = ''
    for (let key in obj) {
      console.log(obj[key])
      if (obj[key] || (obj[key] === 0 || obj[key] === '0')) {
        str = str === '' ? `${key}=${obj[key]}` : `${str}&${key}=${obj[key]}`
      }
    }
    console.log('生成的sign字符串', str)
    return sha1.hex(str + token)
  }
  getAjax(_vue, port, params, pathVersion,type) {
    let _this = this
    return new Promise((resolve, reject) => {
      const url = `${pathVersion === 'v2' ? this.v2path : this.path}${port}`
      let sign = this.getSign(params, _vue.ajaxData.token)
      // console.log('header参数', _vue, sign)
      this.loading('open')
      let loadingTimeOut = setTimeout(function() {
        _this.loading('close')
        clearTimeout(loadingTimeOut)
      }, 10000)
      axios({
        method: type,
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
  // 转换时间戳，以2018-08-30的格式返回
  indexTime(date) {
    if (!date) {
      date = new Date()
    }
    let tempArr = date.toLocaleDateString().split('/')
    // let tempArr = date.toLocaleDateString().split('/').slice(0, 2)
    // 安卓打包的时候，数组顺序是反序的，故需要改回来即年份在前。
    if (parseInt(tempArr[0]) < parseInt(tempArr[2])) {
      let temp = tempArr[0]
      tempArr[0] = tempArr[1]
      tempArr[1] = temp
      tempArr.reverse()
    }
    tempArr = tempArr.slice(0, 2)
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
  //获取时间
  indexTimeB(date){
    if(date){
      date = date.toLocaleDateString().split('/')
      let b  = date.join('-')
      let a = date[0] + '年' + date[1] + '月' + date[2] + '日'
      return [a,b]
    }
  }
  btnList(names, i) {
    return names.map((item, index) => {
      return {
        name: item,
        status: index === i
      }
    })
  }
  changeBtnStatus(arr, i) {
    arr.forEach((element, index) => {
      element.status = i === index
    })
  }
}