import Common from './common'
import sha1 from 'js-sha1'

class Mango extends Common {
  constructor() {
    super()
    this.name = 'my name is mango'
  }

  // 参数加密
  getSign(arr, token) {
    let str = ''
    for (let i = 0; i < arr.length; i++) {
      str = str === '' ? `${arr[i][0]}=${arr[i][1]}` : `${str}&${arr[i][0]}=${arr[i][1]}`
    }
    console.log('string11', str)
    return sha1.hex(str + token)
  }
}

export default new Mango()