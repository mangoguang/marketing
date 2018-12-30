import sha1 from 'js-sha1'
import axios from 'axios'
import { Indicator, Toast } from 'mint-ui'

export default class Common {
  constructor() {
    this.port = 'https://agency.derucci.com/'
    // this.port = 'http://172.16.11.123/'
    // this.port = 'http://10.11.8.181/'
    // this.port = 'http://10.11.8.7:8086/'
    // this.port = 'http://172.16.9.212/'
    this.path = `${this.port}v1/app/report/`
    this.v2path = `${this.port}v2/app/`
    this.apipath = `${this.port}v1/api/public/`
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
    for (let i = 0; i < newSeries[1].length; i++) {
      for (let j = 0; j < newSeries[1].length - i; j++) {
        if (parseInt(newSeries[1][j]) > parseInt(newSeries[1][j + 1])) {
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
      if (obj[key] || (obj[key] === 0 || obj[key] === '0')) {
        str = str === '' ? `${key}=${obj[key]}` : `${str}&${key}=${obj[key]}`
      }
    }
    // console.log('生成的sign字符串', str)
    return sha1.hex(str + token)
  }
  getAjax(_vue, port, params, pathVersion,type) {
    let _this = this
    return new Promise((resolve, reject) => {
      let thatType = type == 'post' ? 'post' : 'get'
      let url = ''
      if (pathVersion === 'v2') {
        url = `${this.v2path}${port}`
      } else if (pathVersion === 'v3') {
        url = `${this.apipath}${port}`
      } else {
        url = `${this.path}${port}`
      }
      // const url = `${pathVersion === 'v2' ? this.v2path : this.path}${port}`
      let sign = this.getSign(params, _vue.ajaxData.token)
      // console.log('header参数', _vue, sign)
      this.loading('open')
      let loadingTimeOut = setTimeout(function() {
        _this.loading('close')
        clearTimeout(loadingTimeOut)
      }, 10000)
      axios({
        method: thatType,
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
  tip(str) {
    Toast({
      message: str,
      position: 'center',
      duration: 2000
    })
  }
  // 转换时间戳，以2018-08-30的格式返回
  // type=day时，返回到日期，否则返回到月份。
  indexTime(date, type) {
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
    tempArr = type === 'day' ? tempArr.slice(0, 3) : tempArr.slice(0, 2)
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
  //获取时间   安卓和ios的时间格式不同	年月日/月日年
  indexTimeB(date){
    if(date){
      date = date.toLocaleDateString().split('/')
      var year,mouth,day,a,b
      var c = []
      date.forEach((item,index) => {
        if(item > 1000){
          year = date[index]
          if(index == 0){
            mouth = date[index + 1]
            if(mouth < 10) {
              mouth = `0${mouth}`
            }
            day = date[index + 2]
            if(day < 10) {
              day = `0${day}`
            }
            c.push(year,mouth,day)
          }else {
            mouth = date[index - 2]
            day = date[index - 1]
            if(day < 10) {
              day = `0${day}`
            }
            if(mouth < 10) {
              mouth = `0${mouth}`
            }
            c.push(year,mouth,day)
          }
        }
      })
      a = year + '年' + mouth + '月' + day + '日'
      b = c.join('-')
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
  //数组对象去重a
  getUniqueData(arr){
    if(!arr){
       return
    }
    let result = [];
    let obj = {};
    for (var i = 0; i < arr.length; i++) {
      if (!obj[arr[i].customerId]) {
        result.push(arr[i]);
        obj[arr[i].customerId] = true;
      }
    }
    return result
  }
  //过滤器
  getNewArr(a,b,c,d){     //c=y,a=series[0],b=series[1],d=ids
    var len = c.length
    var arr = []
    var arr1 = []
    var arr2 = []
    var arr3 = []
    for(var i = 0; i < len; i ++) {
      if(a[i] == 0 && b[i] == 0) {
        
      }else {
        if(d){
          arr3.push(d[i])
        }
        arr.push(c[i])
        arr1.push(a[i])
        arr2.push(b[i])
      }
    }
    return [arr,arr1,arr2,arr3]
  }
  //客户来源过滤
  getCustomerNewArr(a,b,c,d,e){     //c=series[2],a=series[0],b=series[1],d=series[3],e=y
    var len = e.length	            //arr=y,arr1=series[0],arr2=series[1],arr3=series[2],arr4=series[3]
    var arr = []
    var arr1 = []
    var arr2 = []
    var arr3 = []
    var arr4 = []
    for(var i = 0; i < len; i ++) {
      if(a[i] == 0 && b[i] == 0 && c[i] == 0 && d[i] == 0) {
        
      }else {
        arr4.push(d[i])
        arr.push(e[i])
        arr1.push(a[i])
        arr2.push(b[i])
        arr3.push(c[i])
      }
    }
    return [arr,arr1,arr2,arr3,arr4]
  }
  //时间戳比较
  compareTimeStamp(t1,t2) {
    const time1 = new Date(t1).getTime()
    const time2 = new Date(t2).getTime()
    if(time1 < time2) {
      return true
    }else {
      return false
    }
  }
}