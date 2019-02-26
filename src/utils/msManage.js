//匹配关键字（title）
function fuzzyQuery(list, keyWord) {
  var arr = [];
  if(keyWord === '' || null) {
    arr = []
  }else {
    for (var i = 0; i < list.length; i++) {
      if (list[i].title.match(keyWord) != null) {
        arr.push(list[i].title);
      }
    }
  }
  return arr;
}

export {fuzzyQuery}

//匹配的关键字高亮
function changeColor(resultsList, keyword){
  resultsList.map((item, index) => {
    if (keyword && keyword.length > 0) {
      let replaceReg = new RegExp(keyword, 'g')
      let replaceString ='<span style="color: #ff2d55">' + keyword + '</span>'
      resultsList[index] = item.replace(replaceReg,replaceString)}
    })
    let list = resultsList
    return list
}

export { changeColor }

function setLocalStorage(obj, parmasName) {
  let storage = window.localStorage;
  let objStr = JSON.stringify(obj);
  storage.setItem(parmasName, objStr);
}

export { setLocalStorage }

function getLocalStorage(parmasName) {
  let storage = window.localStorage;
  return JSON.parse(storage.getItem(parmasName))
}

export { getLocalStorage }

//跳转页面带参数
function skipNewPage(route, url, parmas) {
  route.push({
    path: url,
    query: parmas
  })
}

export {skipNewPage}

//移除数组中指定的一项
function removeItem(arr, item) {
  let newArr = []
  let index = 0
  for(let i in arr) {
    if(arr[i] != item) {
      newArr.push(arr[i])
      newArr[index ++] = arr[i]
    }
  }
  return newArr
}

export {removeItem}

function addItem(arr, item) {
  let newArr = []
  let index = 0
  for(let i in arr) {
    if(arr[i] != item) {
      newArr.push(arr[i])
      newArr[index ++] = arr[i]
    }
  }
  if(newArr.length == arr.length) {
    newArr = [...newArr, item]
  }
  return newArr
}

export {addItem}