function checkLogin() {
  let token = localStorage.getItem('token')
  if (!token) toLogin()
}

export {checkLogin}


function toLogin() {
  let url = location.href
  let index = url.indexOf('#/')
  let loginUrl = url.substring(0, index + 2) + 'Login'
  // 如果刷新令牌无法使用，则跳转登陆页面重新登录。
  let len = window.history.length
  window.history.back(-len)
  window.history.replaceState(null, '登录', loginUrl)
  window.history.go(0)
}

export default toLogin