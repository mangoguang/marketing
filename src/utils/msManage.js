//匹配关键字（title）
function fuzzyQuery(list, keyWord) {
  if(!list.length) {
    return
  }
  let arr = [];
  if(keyWord === '' || null) {
    arr = []
  }else {
    for (let i = 0; i < list.length; i++) {
      if (list[i].title.match(keyWord) != null) {
        arr.push(list[i]);
      }
    }
  }
  return arr;
}

export {fuzzyQuery}

//匹配的关键字高亮	    //使用map改变原数组:resultsList
function changeColor(resultsList, keyword){
  resultsList.map((item, index) => {
    if (keyword && keyword.length > 0) {
      let replaceReg = new RegExp(keyword, 'g')
      let replaceString ='<span style="color: #ff2d55">' + keyword + '</span>'
      resultsList[index].title = item.title.replace(replaceReg,replaceString)}
    })
    return resultsList
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

//base64解码
function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

export {b64DecodeUnicode}

//正则匹配html中的img，把img中alt换成style样式
function changeImgStyle(html){
  var newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
  var match = match.replace(/alt=\"(.*)\"/gi, 'style="width: 100%;height:auto"');
  return match;
  });
  return newContent;
}

export {changeImgStyle}
