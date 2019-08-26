function getAjax() {
  let ajaxData = localStorage.getItem('ajaxData')
  return JSON.parse(ajaxData)
}
export { getAjax }

function btnList(names, i) {
  if(names) {
    return names.map((item, index) => {
      return {
        name: item.name,
        status: index === i
      }
    })
  }
}

export { btnList }

function myBtnList(names, i) {
  if(names) {
    return names.map((item, index) => {
      return {
        name: item.name,
        aliasBrand: item.aliasBrand,
        status: index === i
      }
    })
  }
}

export { myBtnList }

function fliterItem(str) {
  switch (str) {
    case '综合':
      return 0;
    case '最新发布':
      return 1;
    case '价格↑':
      return 2;
    case '价格↓':
      return 3;
    case '收藏数':
      return 4;
  }
}

export {fliterItem}