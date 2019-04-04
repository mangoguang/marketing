import {IndexModel} from '../index'
const indexModel = new IndexModel()
function refreshToken() {
  // 获取本地token
  let token = JSON.parse(localStorage.getItem('token'))
  if (!token) return
  // 刷新token
  indexModel.refreshToken(token.refresh_token).then(res => {
    let data = res.data
    if(data) {
      // 获取当前时间戳
      Object.assign(data, {
        account: token.account,
        pwd: token.pwd
      })
      // 转成字符串
      let str = JSON.stringify(data)
      // 存储到本地
      localStorage.setItem('token', str)
      this.$root.token = data
    }
  })
}

export default refreshToken