// 将日期格式2018-01-01改成2018年01月01日
function turnDate(date) {
  if (date) {
    let arr = date.split('-')
    if (arr.length > 1) {
      return `${arr[0]}年${arr[1]}月${arr[2]}日`
    } else {
      return date
    }
  }
}
export { turnDate }


// 将日期格式2018年01月01日改成2018-01-01
let returnDate = (date) => {
  if (date) {
    if (date.indexOf('年') !== -1) {
      return date.replace(/年/, "-").replace(/月/, "-").replace(/日/, "")
    } else {
      return date
    }
  }
}
export { returnDate }

// 过滤无用参数，传type值时，为客户需求参数，否则为客户描述参数
let turnParams = (obj, type) => {
  let temp = {}
  for (let key in obj) {
    if (obj[key] || obj[key] === 0) {
      // 如果是生日参数，则进行格式转换
      temp[`${type || 'details'}.${key}`] = key === 'birthday' ? returnDate(obj[key]) : obj[key]
    }
  }
  return temp
}
export { turnParams }

let filterObj = (obj) => {
  let temp = {}
  for (let key in obj) {
    if (obj[key]) {
      temp[key] = obj[key]
    }
  }
  return temp
}
export { filterObj }

//深度拷贝
function deepclone(origin, target) {
  var target = target || {},
    toStr = Object.prototype.toString,
    arrStr = "[object Array]";
  for (var prop in origin) {
    if (origin.hasOwnProperty(prop)) {
      if (origin[prop] !== 'null' && typeof (origin[prop]) == 'object') {
        target[prop] = (toStr.call(origin[prop]) == arrStr) ? [] : {}
        deepclone(origin[prop], target[prop])
      } else {
        target[prop] = origin[prop]
      }
    }
  }
  return target
}

export { deepclone }

function explainType(arr, type) {
  let len = arr.length
  for (var i = 0; i < len; i++) {
    if (arr[i].code === type) {
      return arr[i].name
    }
  }
}
export { explainType }

//base64转化成formdata
function changeFormData(url) {
  let bytes = window.atob(url.split(",")[1]);
  let temp = new ArrayBuffer(bytes.length);
  let ia = new Uint8Array(temp);
  for (var i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  //Blob对象
  return new Blob([temp], { type: "image/jpeg" }); //type为图片的格式
}

export {changeFormData}

//获取选项
function setSlot(type) {
  let arr = []
    type.forEach((item,index) => {
      arr[index] = item.name
    });
    return arr
}
export {setSlot}
//根据val获取对应的code
function getCode(val,typeList) {
  let code;
  typeList.forEach((item,index) => {
    if(item.name === val) {
      code = item.code
    }
  })
  return code
}
export {getCode}
//根据code获取对应的val
function getVal(code,typeList) {
  let val;
  typeList.forEach((item,index) => {
    if(item.code === code) {
      val = item.name
    }
  })
  return val
}
export {getVal}