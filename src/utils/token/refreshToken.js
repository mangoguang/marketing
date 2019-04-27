import {IndexModel} from '../index'
const indexModel = new IndexModel()
function refreshToken() {
  return new Promise((resolve, reject) => {
    // 获取本地token
    let token = JSON.parse(localStorage.getItem('token'))
    if (!token) this.$router.push({path: '/Login'})
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
        // 成功刷新token
        resolve(true)
        // this.$root.token = data
      } else {
        // 如果刷新令牌无法使用，则跳转登陆页面重新登录。
        this.$router.push({path: '/Login'})
        // 刷新令牌失效
        resolve(true)
      }
    })
  })
}

export default refreshToken