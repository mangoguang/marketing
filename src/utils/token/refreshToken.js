import {IndexModel} from '../index'
const indexModel = new IndexModel()
function refreshToken() {
  return new Promise((resolve, reject) => {
    // 获取本地token
    let token = JSON.parse(localStorage.getItem('token')) || {}
    if (!token) {
      toLogin()
    }
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
        toLogin()
        // 刷新令牌失效
        resolve(true)
      }
    })
    .catch(error => {
      toLogin()
      console.log('重新登陆', this.$router, error)
    })
  })

  function toLogin() {
    // 如果刷新令牌无法使用，则跳转登陆页面重新登录。
    let len = window.history.length
    window.history.back(-len)
    window.history.replaceState(null, '登录', 'http://localhost:8080/#/Login')
    window.history.go(0)
  }
}

export default refreshToken