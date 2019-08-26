import sha1 from 'js-sha1'
// 参数加密
export function getSign(obj, token) {

  let [temp, arr] = [{},
    []
  ]
  for (let key in obj) {
    arr.push(key)
  }
  arr = arr.sort()
  for (let i in arr) {
    temp[arr[i]] = obj[arr[i]]
  }

  obj = temp
  let str = ''
  for (let key in obj) {
    if (obj[key] || (obj[key] === 0 || obj[key] === '0')) {
      str = str === '' ? `${key}=${obj[key]}` : `${str}&${key}=${obj[key]}`
    }
  }
  // console.log('生成的sign字符串', str)
  return sha1.hex(str + token)
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  let timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

export function geMonthLastDay() {

  var date = new Date();
  var currentMonth = date.getMonth();
  var nextMonth = ++currentMonth;
  var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
  var oneDay = 1000 * 60 * 60 * 24;
  return new Date(nextMonthFirstDay - oneDay);
}