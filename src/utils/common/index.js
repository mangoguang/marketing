
let doubleDigit = (str) => {
  if (str < 10) {
    str = '0' + parseInt(str)
  }
  return str
}

export{doubleDigit}