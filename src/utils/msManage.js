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

