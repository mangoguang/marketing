//匹配关键字
function fuzzyQuery(list, keyWord) {
  var arr = [];
  if(keyWord === '' || null) {
    arr = []
  }else {
    for (var i = 0; i < list.length; i++) {
      if (list[i].match(keyWord) != null) {
        arr.push(list[i]);
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