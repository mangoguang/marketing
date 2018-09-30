import axios from 'axios'
import sha1 from 'js-sha1'
import mango from '../js'

let init = (function() {
  let key = true

  function Port() {
    let [_this, path] = [this, 'http://10.11.8.7:8086/']
    // let [_this, path] = [this, 'http://10.11.8.7:80/']
    // 接口路径
    this.path = `${path}api/vip/v1/`
    this.publicPath = `${path}api/public/v1/`
    this.secretKey = '477a1d7cc03d21d5abce55ec12170d33'
    this.appId = 'wx877a7e37b0de0a87'
    this.key = true

    // 发送手机验证码
    this.sendPhoneVerify = (phone, url = `${this.publicPath}sendsns`) => {
      if (!key) {
        return
      }
      key = false
      let _this = this
      let promise = new Promise(function(resolve, reject) {
        if (_this.testPhone(phone)) {
          let timestamp = _this.getTimestamp()
          if (_this.token) {
            _this.token.then(function(token) {
              let arr = [
                ['phone', phone],
                ['secretKey', _this.secretKey],
                ['timestamp', timestamp]
              ]
              let sign = _this.getSign(arr)
              mango.loading('open')
              axios({
                method: 'post',
                url: url,
                headers: {
                  'Authorization': token
                },
                params: {
                  phone: phone,
                  secretKey: _this.secretKey,
                  timestamp: timestamp,
                  sign: sign
                }
              })
              .then(function (response) {
                
                key = true
                let data = response.data
                if (data.status) {
                  alert('验证码发送成功。')
                  resolve(true)
                } else {
                  alert(data.msg)
                }
              })
              // .catch(function (error) {
              //   console.log(error)
              // })
            })
            .catch(function (error) {
              mango.loading('close')
              if (error) {
                key = true
                alert('获取token失败！')
              } else {
                key = true
                alert('获取token失败！')
              }
            })
          } else {key = true
            alert('token promise未定义。')
          }
        } else {
          mango.loading('close')
          key = true
          alert('请输入正确的手机号码！')
          return
        }
      })
      return promise
    }

    // 校验手机
    this.verifyPhone = (phone, verifyCode, url) => {
      let [_this, timestamp] = [this, this.getTimestamp()]
      if (!url) {
        url = `${this.publicPath}verifySnsCode`
      }
      let promise = new Promise(function(resolve, reject) {
        // 获取token
        if (_this.token) {
          _this.token.then(function(token) {
            let arr = [
              ['phone', phone],
              ['secretKey', _this.secretKey],
              ['timestamp', timestamp],
              ['verifyCode', verifyCode]
            ]
            let sign = _this.getSign(arr)
            axios({
              method: 'post',
              url: url,
              headers: {
                'Authorization': token
              },
              params: {
                phone: phone,
                verifyCode: verifyCode,
                secretKey: _this.secretKey,
                timestamp: timestamp,
                verifyCode: verifyCode,
                sign: sign
              }
            })
            .then(function (response) {
              resolve(response.data)
            })
            .catch(function (error) {
              if (error) {
                alert('验证失败！')
              } else {
                alert('验证失败！')
              }
            })
          })
          // .catch(function (error) {
          //   alert('获取token失败！')
          // })
        } else {
          alert('token promise未定义。')
        }
      })
      return promise
    }

    // 校验手机格式
    this.testPhone = (phone) => {
      const phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
      return phoneReg.test(phone)
    }

    // 校验人名
    this.testName = (name) => {
      const nameReg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
      return nameReg.test(name)
    }

    // 获取时间戳
    this.getTimestamp = () => {
      let date = new Date()
      let timestamp = date.getTime()
      return timestamp
    }

    // 参数加密
    this.getSign = (arr) => {
      let str = ''
      for (let i = 0; i < arr.length; i++) {
        str = str === '' ? `${arr[i][0]}=${arr[i][1]}` : `${str}&${arr[i][0]}=${arr[i][1]}`
      }
      return sha1.hex(str)
    }

    // 获取token码
    this.token = (function() {
      let promise = new Promise(function(resolve, reject) {
        axios({
          method: 'post',
          url: 'https://derucci.net/app/token.api',
          params: {
            key: '994061370314006529',
            secretKey: _this.secretKey
          }
        })
        .then((response) => {
          if (response) {
            resolve(response.data.token)
          }
        }).catch((error) => {
          if (error) {
            alert('token获取失败！')
          }
        })
      })
      return promise
    }())

    // 获取url参数
    this.getQueryString = (name) => {
      let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    }

  }
  Port.prototype.test = () => {
    console.log(11, 'success')
  }
  return new Port()
}())
export default init
