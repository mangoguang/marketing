function getAjax() {
  let ajaxData = localStorage.getItem('ajaxData')
  return JSON.parse(ajaxData)
}
export {getAjax}

function btnList(names, i) {
  return names.map((item, index) => {
    return {
      name: item.name,
      status: index === i
    }
  })
}

export {btnList}