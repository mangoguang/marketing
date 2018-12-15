// 过滤无用参数，传type值时，为客户需求参数，否则为客户描述参数
let turnParams = (obj, type) => {
  let temp = {}
  for (let key in obj) {
    if (obj[key]) {
      // 如果是生日参数，则进行格式转换
      temp[`${type || 'details'}.${key}`] = key === 'birthday' ? this.returnDate(obj[key]) : obj[key]
    }
  }
  return temp
}
export {turnParams}