function emptyData(data) {
  return data.every((item, index) => {
    return item.data.every((item, index) => {
      return item <= 0
    })
  })
}

export {emptyData}