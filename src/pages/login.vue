<template>
  <div class="login">
    <div :class="`${myStyle.loginFix}`"></div>
    <div class="topBar">
      <tips-error :style="{display:display}"></tips-error>
      <tips-web :style="{display:display1}"></tips-web>
      <div class="line"></div>
      <div class="sriangle"></div>
    </div>
    <div class="login">
      <div class="box">
        <div class="welcome">Hi,</div>
        <h1>欢迎使用慕思营销助手</h1>
        <form>
          <ul>
            <li
              is="myinput"
              :type="type1"
              :labelContent="account"
              v-model.trim="inputValue1"
              autocomplete="off"
              :Msg="nameMsg"
            ></li>
            <li
              is="myinput"
              :type="type2"
              :labelContent="pwd"
              v-model.trim="inputValue2"
              :Msg="pwdMsg"
            ></li>
            <li class="tips clearfix">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                value="remember"
                v-model="checked"
              >
              <label for="remember" class="rem"></label>
              <label for="remember">
                <div class="rempwd">记住密码</div>
              </label>
              <div class="forgetpwd" @touchend="forgetPwd">忘记密码?</div>
            </li>
            <li>
              <btn @click.native="submitForm()" :text="text" class="myBtn"></btn>
            </li>
          </ul>
        </form>
      </div>
    </div>
    <div class="wechatLogin">
      <div class="wechatText">
        <hr>
        <span>第三方账号登录</span>
        <hr>
      </div>
      <div class="wechat-icon"></div>
    </div>
    <footer></footer>
  </div>
</template>

<script>
import Vue from "vue";
import VueRouter from "vue-router";
import Vuex, { mapMutations } from "vuex";
import mango from "../js";
import axios from "axios";
import md5 from "js-md5";
import tipsError from "../components/charts/tipsError";
import tipsWeb from "../components/charts/tipsWeb";
import btn from "../components/btn";
import myinput from "../components/myInput";
import refreshToken from '../utils/token/refreshToken.js'
import {IndexModel} from '../utils/index'
const indexModel = new IndexModel()
export default {
  name: "login",
  components: {
    // MyChart
    tipsError,
    tipsWeb,
    btn,
    myinput
  },
  props: ["myStyle"],
  data() {
    return {
      height: document.documentElement.clientHeight,
      text: "登录",
      checked: true,
      display: "none",
      display1: "none",
      key: true,
      type1: "text",
      type2: "password",
      account: "账号",
      pwd: "密码",
      inputValue1: "",
      inputValue2: "",
      nameMsg: "",
      pwdMsg: ""
    };
  },
  mounted() {
    // let obj = {
    //   name: 'guang',
    //   age: '26',
    //   work: 'qianduan'
    // }
    // mango.getSign(obj)
    // console.log(mango.getSign1)
    this.$root.author = 'mangoguang'
  },
  created() {
    this.getAccountMsg();
  },
  methods: {
    ...mapMutations(['setPersonMsg']),
    //去除input输入框的左边空格
    trimStr: function(str) {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    //提交时如果勾选记住密码，则缓存账号密码。否则清除缓存。
    submitForm() {
      if (this.key) {
        //如果请求失败，只可以请求一次
        this.key = false;
        this.display = "none";
        this.display1 = "none";
        this.login(this.inputValue1, this.inputValue2)
      }
    },
    login(account, pwd) {
      // let data = {
      //     grant_type: 'password',        //固定填 password
      //     username: account,   //登录账号
      //     password: md5(pwd)    //MD5(密码)
      //   }
      // axios({
      //   method: 'post',
      //   url: 'https://mobiletest.derucci.net/cd-sys-web/oauth/token',
      //   data: data,
      //   transformRequest: [function(data) {
      //     let ret = ''
      //     for(let it in data) {
      //       ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      //     }
      //     return ret
      //   }],
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // })
      // .then((res) => {
      //     mango.loading('close')
      //     let data = res.data
      //     if(data) {
      //       // 将账号信息添加到对象
      //       Object.assign(data, {
      //         account,
      //         pwd
      //       })
      //       // 转成字符串
      //       let str = JSON.stringify(data)
      //       // 存储到本地
      //       localStorage.setItem('token', str)
      //       this.$root.token = data
      //       clearInterval(this.$root.tokenTime)
      //       this.$root.tokenTime = setInterval(() => {
      //         refreshToken.call(this)
      //       }, 7000000)
      //       // 登陆成功跳转页面
      //       this.getUserInfo()
      //     }
      // })

      indexModel.getToken(account,md5(pwd)).then(res => {
        mango.loading('close')
        let data = res.data
        if(data) {
          // 将账号信息添加到对象
          Object.assign(data, {
            account,
            pwd
          })
          // 转成字符串
          let str = JSON.stringify(data)
          // 存储到本地
          localStorage.setItem('token', str)
          this.$root.token = data
          clearInterval(this.$root.tokenTime)
          this.$root.tokenTime = setInterval(() => {
            refreshToken.call(this)
          }, 7000000)
          // 登陆成功跳转页面
          this.getUserInfo()
        }
      }) 
    },
    // 获取用户个人信息
    getUserInfo() {
      indexModel.getUserInfo().then(res => {
        res = res.data
        if (res) {
          let typename = this.getName(res.positionList)
          let ajaxData = {
            account: res.account,
            tenantId: res.tenantId,
            timestamp: Date.parse(new Date()),
            name: res.username,
            phone: res.phone,
            sex: res.sex,
            type:res.type,
            typename: typename
          }
          let shops = JSON.stringify(res.shopList)
          localStorage.setItem("shops", shops);
          localStorage.setItem('ajaxData', JSON.stringify(ajaxData))
          this.$root.ajaxData = ajaxData
          this.$router.push({ path: "/" })
        }
      })
    },
    getName(arr) {
      let name;
      arr.map(item => {
        if(item.typeName === '经销商老板') {
          name = 'boss'
        }
      })
      return name
    },
    setAccountMsg(uname, upwd) {
      let string = `{"name":" ${uname}", "pwd": "${upwd}"}`;
      localStorage.setItem("accountMsg", string);
    },
    //读取cookie
    getAccountMsg: function() {
      let accountMsg = localStorage.getItem("accountMsg");
      let oldaccountMsg = JSON.parse(accountMsg);
      if (oldaccountMsg) {
        // 去除空格
        var trimName = oldaccountMsg["name"].trim();
        var trimPwd = oldaccountMsg["pwd"].trim();
        // let trimName = this.trimStr(oldaccountMsg['name'])
        // let trimPwd = this.trimStr(oldaccountMsg['pwd'])
        this.nameMsg = trimName;
        this.pwdMsg = trimPwd;
        this.inputValue2 = trimPwd;
        this.inputValue1 = trimName;
      }
    },
    forgetPwd: function() {
      this.$router.push({ path: "/ForgetPwd" });
    },
    //登陆接口
    getApi() {
      mango.loading('open')
      var Name = _this.inputValue1
      var Pwd = _this.inputValue2 
      const url = `${mango.port}/app/login.api`
    axios({
      method: 'post',
      url: url,
      headers: {
        'UUID': 'e10adc3949ba59abbe56e057f20f883e'
      },
      timeout: 10000,
      params: {
        // account: '18080028',
        account:Name,
        password: md5(Pwd)
        // access_token: asToken
      }
    })
      .then((res) => {
        mango.loading('close')
        let status = res.data.status  
        if(res.status == 200){   //状态200，请求成功
          if(status == 0){           //如果为0，账号或密码错误，出现弹框。
          _this.display = 'block' 
          _this.key = true
          
          }else {
            //账号密码正确，跳转页面。
            res = res.data.data
            let shops = JSON.stringify(res.shopList)
            _this.$store.commit('setPersonMsg',res)
            let shopsArr = `${shops}`
            let ajaxData = `{
              "account": "${res.account}",
              "tenantId": "${res.tenantId}",
              "token": "${res.token}",
              "uuid": "${res.uuid}",
              "timestamp": "${Date.parse(new Date())}",
              "name": "${res.username}",
              "phone": "${res.mobile}",
              "sex": "${res.sex}",
              "type":"${res.type}"
            }`
              localStorage.setItem("ajaxData", ajaxData);
              localStorage.setItem("shops", shopsArr);
              if (_this.checked) {
                _this.setAccountMsg(_this.inputValue1, _this.inputValue2);
              } else {
                _this.setAccountMsg("", "");
              }
              _this.$router.push({ path: "/" });
            }
          } else {
            //状态不为200，请求失败
            console.log(res.status);
          }
        })
        .catch(function(error) {
          mango.loading("close");
          console.log("返回错误方法：", error);
          _this.display1 = "block";
          _this.key = true;
        });
      // }
    }
  }
};
</script>


<style lang="scss" scoped>
.login {
  background: #fff;
  // font-family: PINGPANG;
  position: relative;
  // height: 100vh;
  // box-sizing: border-box;
  // overflow: hidden;
  .fix {
    width: 100%;
    height: 6vw;
    background: #e1e1e1;
    position: absolute;
    left: 0;
    top: -6vw;
  }
  .topBar {
    width: 100vw;
    height: 45.06vw;
    position: relative;
    // height: 43.78vw;
    // background: #e1e1e1;
    // padding-top: 22vw;
    box-sizing: border-box;
    background: url(../assets/imgs/loginBg.png) no-repeat center;
    background-size: 100% 100%;
    margin-top: -6vw;
    .sriangle {
      // border-top: 11vw solid transparent;
      // border-bottom: 11vw solid #fff;
      // border-right: 50vw solid #fff;
      // border-left: 50vw solid transparent;
      // box-sizing: border-box;
    }
    .line {
      width: 22.66vw;
      height: 22.66vw;
      z-index: 99;
      position: absolute;
      left: 38.67vw;
      top: 32.13vw;
      background: url(../assets/imgs/login_icon.png) no-repeat center;
      background-size: 100% 100%;
      // width: 14.66vw;
      // height: 0.8vw;
      // background-color: #020202;
      // position: absolute;
      // top: 32.93vw;
      // left: 42.66vw;
    }
  }
  .login {
    background: #fff;
    .box {
      width: 80vw;
      height: 69.2vw;
      margin: 0 auto;
      padding: 8.133vw;
      .welcome {
        font-size: 8vw;
        color: #010101;
        text-align: center;
      }
      h1 {
        font-size: 4.8vw;
        text-align: center;
        color: #010101;
        line-height: 6.4vw;
        font-weight: 500;
      }
      ul {
        //按钮
        .tips {
          margin-top: 2vw;
          font-size: 3.7vw;
          color: #909090;
          letter-spacing: 2px;
          [type="checkbox"] {
            display: none;
          }
          .rem {
            display: inline-block;
            position: relative;
            width: 4.8vw;
            height: 4.8vw;
            background-color: #eeeeee;
            box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.2),
              inset 0px 0px 1px 0px rgba(0, 0, 0, 0.2);
            border: solid 1px #d2d2d2;
            border-radius: 100%;
            margin-top: 0.8vw;
            margin-right: 1.866vw;
            float: left;
            box-sizing: border-box;
          }
          [type="checkbox"]:checked + label {
            width: 4.8vw;
            height: 4.8vw;
            box-sizing: border-box;
            border: 1.2vw solid #d2d2d2;
            background-color: #363636;
          }
          .rempwd {
            float: left;
          }
          .forgetpwd {
            float: right;
            text-decoration: underline;
          }
        }
        .myBtn {
          background:rgba(0,122,255,1);
          border: .13vw solid rgba(0,93,194,1);
        }
      }
    }
  }
  .wechatLogin {
    margin-top: 13.33vw;
    padding: 0 4vw;
    .wechatText {
      display: flex;
      justify-content: space-between;
      color: #909090;
      font-size: 3.2vw;
      hr {
        width: 24vw;
        border: none;
        border-bottom: 1px solid #e1e1e1;
        height: 4px;
      }
    }
    .wechat-icon {
      width: 9.06vw;
      height: 9.06vw;
      margin: 0 auto;
      margin-top: 6.53vw;
      background: url(../assets/imgs/wechat.png) no-repeat center;
      background-size: 100% 100%;
    }
  }
  footer {
    background: url(../assets/imgs/login_db.png) no-repeat center;
    background-size: 100% 100%;
    width: 93.06vw;
    height: 29.86vw;
    position: fixed;
    bottom: 0;
    left: 3.5vw;
  }
}
</style>
