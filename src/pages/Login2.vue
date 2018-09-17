<template>
  <div class="login2" :style="{background:bgcolors}"> 
    <div class="topBar" :style="{background:topBarcolors}">
      <tips-error :style="{display:display}"></tips-error>
      <tips-web :style="{display:display1}"></tips-web>
      <div class="line" :style="{background:lineTopcolors}"></div>
      <div class="sriangle" :style="{'border-bottom-color':bgcolors,'border-right-color':bgcolors}"></div>
    </div>
  <div class="login" :style="{background:bgcolors}">
    <div class="box" :style="{background:bgcolors}">
      <h1 :style="{color:titlecolors}">Hi,欢迎使用慕思营销助手</h1>
      <form >
        <ul>
          <li>
            <label for="account" v-bind:class='`${usname}`'><span :style="{color:unamecolors}">账号</span></label>
            <input id="account" type="text"  v-bind:class="`${username}`"
              v-on:focus='focusName()'  @blur="blurName()"
              v-model="ruleForm.user" maxlength="15" autocomplete="off" 
              :style="{'border-bottom-color':inputLinecolors,color:inputcolors}">
          </li>
          <li>
            <label for="password" v-bind:class='`${upwd}`'><span :style="{color:unamecolors}">密码</span></label>
            <input id="password" type="password"  v-bind:class="`${userpassword}`"
              @focus ='focusPwd()'  @blur="blurPwd()"
              v-model="ruleForm.pwd" maxlength="15" :style="{'border-bottom-color':inputLinecolors}"> 
          </li>
          <li class="tips clearfix">
            <input type="checkbox" id="remember" name="remember" value='remember' 
            v-model="checked" >
            <label for="remember" class="rem"></label>
            <label for="remember"><div class="rempwd" :style="{color:unamecolors}">记住密码</div></label>
            <div class="forgetpwd" :style="{color:unamecolors}" @click="forgetPwd">忘记密码?</div>
          </li>
          <li>
            <button type="button" @click="submitForm('ruleForm')" 
            :style="{background:submitcolors,color:logincolors}">登录</button>
          </li>
        </ul>
      </form>
    </div>
  </div>
   <div class="wechatLogin" :style="{background:bgcolors}">
      <div class="wechatText" >
        <hr>
        <span>第三方账号登录</span>
        <hr>
      </div>
      <div class="wechat-icon"></div>
    </div>
    <div class="changeColor1" @click="changeColor1" >主题1</div>
    <div class="changeColor2" @click="changeColor2" >主题2</div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import mango from '../js'
import axios from 'axios'
import md5 from 'js-md5'
import tipsError from '../components/charts/tipsError'
import tipsWeb from '../components/charts/tipsWeb'

export default {
  name: 'login',
  components: {
    // MyChart
    tipsError,
    tipsWeb
  },
  data () {
    return {
      height: document.documentElement.clientHeight,
      username:'userName',
      userpassword:'userPassword',
      usname:'usname',
      upwd:'upwd',
      ruleForm:{
        user:'',
        pwd:''
      },
      checked:true,
      topBarcolors:'#e1e1e1',
      bgcolors:'#fff',
      lineTopcolors:'#020202',
      titlecolors:'#010101',
      unamecolors:'#909090',
      inputLinecolors:'#ccc',
      inputcolors:'#262628',
      submitcolors:'#363636',
      logincolors:'#eff9fd',
      display:'none',
      display1:'none'
    }
   
  },
  props:[
    'nweP' //更改后的密码。
  ],
  mounted(){
    console.log(this.nweP)
    let obj = {
      name: 'guang',
      age: '26',
      work: 'qianduan'
    }
    mango.getSign(obj)
    // console.log(mango.getSign1)
    //获取缓存
     this.getAccountMsg();
      if(this.ruleForm.user.length){
        this.username = 'userName1'
        this.usname = 'usname2'
        this.userpassword = 'userPassword1'
        this.upwd = 'upwd2'
      }else{
        this.usname = 'usname3'
        this.upwd = 'upwd3'
      }
  },
  computed: {

  },
  methods:{
    changeColor1:function(){
      this.topBarcolors = '#e1e1e1'
      this.bgcolors = '#fff'
      this.lineTopcolors = '#020202'
      this.titlecolors = '#010101'
      this.unamecolors = '#909090'
      this.inputLinecolors = '#ccc'
      this.inputcolors = '#262628'
      this.submitcolors = '#363636'
      this.logincolors = '#eff9fd'
    },
    changeColor2:function(){
      this.topBarcolors = '#39424b'
      this.bgcolors = '#2e353d'
      this.lineTopcolors = '#fff'
      this.titlecolors = '#fefefe'
      this.unamecolors = '#95999c'
      this.inputLinecolors = '#2b323a'
      this.inputcolors = '#fff'
      this.submitcolors = '#f8f8f8'
      this.logincolors = '#2e353d'
    },
     //光标获得焦点，失去焦点触发的事件。
    focusName : function(){
      if(this.ruleForm.user.length){
        this.username = 'userName1'
        this.usname = 'usname2'
      }else{
        this.username = 'userName1'
        this.usname = 'usname1'
      }  
    },
    focusPwd : function(){
      if(this.ruleForm.pwd.length){
        this.userpassword = 'userPassword1'
        this.upwd = 'upwd2'
      }else{
        this.userpassword = 'userPassword1'
        this.upwd = 'upwd1'
      }
    },
    blurName:function(){
      if(this.ruleForm.user.length){
        this.username = 'userName1'
        this.usname = 'usname2'
      }else{
        this.username = 'userName'
        this.usname = 'usname'
      }
    },
    blurPwd:function(){
      if(this.ruleForm.pwd.length){
        this.userpassword = 'userPassword1'
        this.upwd = 'upwd2'
      }else{
        this.userpassword = 'userPassword'
        this.upwd = 'upwd'
      }
    },
    //去除input输入框的左边空格
    trimStr: function(str) {
      return str.replace(/(^\s*)/g, "")
    }, 
    //提交时如果勾选记住密码，则缓存账号密码。否则清除缓存。
    submitForm(formName) {
      let _this = this
      if (this.checked) {
        this.setAccountMsg(this.ruleForm.user, this.ruleForm.pwd);
        
      } else {
        this.setAccountMsg('', '');
      }
        getApi()
        _this.display = 'none'
        _this.display1 = 'none'
      //登陆接口
       function getApi() {
        let Name = _this.ruleForm.user
        let Pwd = _this.ruleForm.pwd
        const url = `${mango.port}app/login.api`
      // return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: url,
        headers: {
          'UUID': 'e10adc3949ba59abbe56e057f20f883e'
        },
        params: {
          // account: '18080001',
          account:Name,
          password: md5(Pwd)
        }
      })
        .then((res) => {
          let status = res.data.status  
          if(res.status == 200){    //状态200，请求成功
            if(status == 0){           //如果为0，账号或密码错误，出现弹框。
            console.log('密码或账号错误',res.status)
            _this.display = 'block' 
            }else{                    //账号密码正确，跳转页面。
              console.log('正确')  
              res = res.data.data
              let ajaxData = `{
                "tenantId": "${res.tenantId}",
                "token": "${res.token}",
                "uuid": "${res.uuid}"
              }`
              localStorage.setItem("ajaxData", ajaxData)
              _this.$router.push({ path: '/ReportForms' })
            }
          }else{  //状态不为200，请求失败
            console.log(res.status)
            _this.display1 = 'block'
          }
        
        })
       }
  },
  setAccountMsg(uname, upwd) {
      let string = `{"name":" ${uname}", "pwd": "${upwd}"}`
      localStorage.setItem('accountMsg', string)
    },
    //读取cookie
    getAccountMsg: function() {
      let accountMsg = localStorage.getItem('accountMsg')
      let oldaccountMsg = JSON.parse(accountMsg)
      // console.log(oldaccountMsg)
      // console.log('获取本地缓存的账号信息', oldaccountMsg['name'],oldaccountMsg['pwd'])
      //去除空格
      let trimName = this.trimStr(oldaccountMsg['name'])
      this.ruleForm.user = trimName
      this.ruleForm.pwd = oldaccountMsg['pwd']
    },
    forgetPwd:function(){
      this.$router.push({path:'/ForgetPwd'})
    }
  }
}
</script>


<style lang="scss" scoped> 
@font-face {
  font-family: 'PINGPANG';
  src: url('../assets/font/PingFang Regular.ttf');
}
.clearfix::after{
  content:'';
  display: block;
  clear: both;
}
.login2{
  font-family: 'PINGPANG';
  .topBar{
    width: 100vw;
    height: 44vw;
    background: #e1e1e1;
    box-sizing: border-box;
    padding-top: 22vw;
    position: relative;
    .sriangle{
      border-top: 11vw solid transparent;
      border-bottom: 11vw solid #fff;
      border-right: 50vw solid #fff;
      border-left: 50vw solid transparent;
      box-sizing: border-box;
    }
    .line{
      width: 14.66vw;
      height: .8vw;
      background-color: #020202;
      position: absolute;
      top: 32.93vw;
      left: 42.66vw;
    }
  }
  .login{
    background: #fff;
  .box{
    width: 80vw;
    height: 69.2vw;
    margin: 0 auto;
    margin-top:8.133vw; 
    h1{
      font-size: 4vw;
      text-align: center;
      color:#010101;
      line-height: 6.4vw;
    }
    ul{
      position: relative;
      .usname,.upwd{
        span {
        font-size: 4vw;
        letter-spacing: 5px;
        color: #909090;   
        line-height: 10vw;
        }
      }
      //span位置
      .usname{
        position: absolute;
        left: 1px;
        top: -4px;
        animation: moveDown .5s;
        @keyframes moveDown {
          from{
            top: -6.5vw;
          }
          to{
            top: -4px;
          }
        }
        }
      .usname1{
        position: absolute;
        left: 1px;
        top: -6.5vw;
        animation: moveUP .5s;
        @keyframes moveUP {
          from{
            top: 5px;
          }
          to{
            top: -6.5vw;
          }
        }
        span{
          color: #bebebe;
          font-size:3.2vw;
          letter-spacing: 4px; 
        }
      }
      .usname2{
       position: absolute;
       left: 1px;
       top: -6.5vw;
        span{
          color: #909090;
          font-size:3.2vw;
          letter-spacing: 4px; 
        }
      }
      .usname3{
        position: absolute;
        left: 1px;
        top: -4px;
         span{
          font-size: 4vw;
          letter-spacing: 5px;
          color: #909090;   
          line-height: 10vw; 
        }
      }
      .upwd{
        position: absolute;
        left: 1px;
        top: 17.2vw;
        animation: moveDown1 .5s;
        @keyframes moveDown1 {
          from{
            top: 12vw;
          }
          to{
            top: 17.2vw;
          }
        }
      }
      .upwd1{
        position: absolute;
        left: 1px;
        top: 12vw;
        animation: moveUp1 .5s;
        @keyframes moveUp1 {
          from{
            top: 17.2vw;
          }
          to{
            top: 12vw;
          }
        }
        span{
          color: #bebebe;
          font-size:3.2vw;
          letter-spacing: 4px; 
        }
        }
       .upwd2{
        position: absolute;
        left: 1px;
        top: 12vw;
         span{
          color: #bebebe;
          font-size:3.2vw;
          letter-spacing: 4px; 
        }
        }
       .upwd3{
        position: absolute;
        left: 1px;
        top: 17.2vw;
        span{
          font-size: 4vw;
          letter-spacing: 5px;
          color: #909090;   
          line-height: 10vw; 
        }
       }
      .userName,.userPassword{
        display: block;
        border-bottom: 1px solid #ccc;
        width: 80vw;
        height: 8vw;
        font-size: 4vw;
        margin-top: 10vw;
        color: #262628
      }
      .userName1{
        display: block;
        border-bottom: 2px solid #ccc;
        width: 80vw;
        height: 8vw;
        font-size: 4vw;
        margin-top: 10vw;
        color: #262628;     
        }
      .userPassword1{
        display: block;
        border-bottom: 2px solid #ccc;
        width: 80vw;
        height: 8vw;
        font-size: 4vw;
        margin-top: 10vw;
        color: #262628;
      }
      //按钮
      .tips{
        margin-top: 2vw;
        font-size: 3.7vw;
        color: #909090;
        letter-spacing: 2px;
        [type="checkbox"] {
          display: none;
          }
        .rem{
          display: inline-block;
          position: relative;
          width: 4.8vw;
          height: 4.8vw;
          background-color: #eeeeee;
          box-shadow: 0px 1px 1px 0px 
            rgba(0, 0, 0, 0.2), 
            inset 0px 0px 1px 0px 
            rgba(0, 0, 0, 0.2);
          border: solid 1px #d2d2d2;
          border-radius: 100%;
          margin-top: .8vw;
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
        .rempwd{
          float: left;
        }
        .forgetpwd{
          float: right;
          text-decoration: underline;
        }
      }
      button {
        width: 100%;
        height: 13.1vw;
        background-color: #363636;
        box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.5);
        border-radius: 1.3vw;
        font-family: "MicrosoftYaHei";
        font-size: 4.5vw;
        letter-spacing: 5px;
        color: #eff9fd;
        margin-top: 6vw;
      }
    }
  }
  }
   .wechatLogin{
      margin-top: 13.33vw;
      padding: 0 4vw;
      .wechatText{
        display: flex;
        justify-content: space-between;
        color: #909090;
        font-size: 3.2vw;
        hr{
          width:24vw;
          border: none;
          border-bottom: 1px solid #e1e1e1;
          height: 4px;
        }
      }
      .wechat-icon{
        width: 9.06vw;
        height: 9.06vw;
        margin: 0 auto;
        margin-top: 6.53vw;
        background: url(../assets/imgs/wechat.png) no-repeat center;
        background-size: 100% 100%
      }
    }
    .changeColor1{
     width: 20vw;
     height: 10vw;
     text-align: center;
     line-height: 10vw;
     background: #e1e1e1;
     border-radius: 4px;
    }
    .changeColor2{
     width: 20vw;
     height: 10vw;
     text-align: center;
     line-height: 10vw;
     background: #2e353d;
     border-radius: 4px;
    }
}
</style>
