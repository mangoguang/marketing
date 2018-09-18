<template> 
  <div class="forgetPwd">
    <div class="banner">
      <img src="../assets/imgs/banner1.png" alt="头部背景" class="img1">
      <img src="../assets/imgs/banner2.png" alt="头部背景" class="img2">
    </div>
    <div class="content">
    <h1>验证了手机号方可修改密码哟~</h1>
    <form>
      <ul>
        <li>
         <label for="account" v-bind:class='`${phoneNum}`'><span>请输入手机号</span></label>
         <input id="account" type="number"  v-bind:class="`${inputPNum}`"
          v-on:focus='focusNum()'  @blur="blurNum()"
          v-model="changePwd.num">
        </li>
        <li class="getCode">
          <input @click="getCode" v-model="getCodeValue"  type="text" readonly>
        </li>
        <li>
          <label for="code" v-bind:class='`${vfCode}`'><span>验证码</span></label>
          <input id="code" type="number"  v-bind:class="`${inputCode}`"
            @focus ='focusCode()'  @blur="blurCode()"
            v-model="changePwd.pwd" maxlength="15"> 
        </li>
        <li>
          <button type="button" @click="submitForm('changePwd')" class="submit">确认</button>
        </li>                    
      </ul>
    </form>
  </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import port from '../js/variable'
import 'mint-ui/lib/style.css'
import {Indicator} from 'mint-ui'

export default {
data () {
    return {
      height: document.documentElement.clientHeight,
      inputPNum:'inputPNum',
      inputCode:'inputCode',
      phoneNum:'phoneNum',
      vfCode:'vfCode',
      changePwd:{
        num:'',
        pwd:''
      } ,
      getCodeValue:'获取验证码' 
      
    }
  },
  mounted(){
    //去除开头动画
    if(this.changePwd.num.length){
      this.inputPNum = 'inputPNum1'
      this.phoneNum = 'phoneNum2'
      this.inputCode = 'inputCode1'
      this.vfCode = 'vfCode2'
    }else{
      this.phoneNum = 'phoneNum3'
      this.vfCode = 'vfCode3'
    }
  },
  computed: {
    
  },
  methods:{
     //光标获得焦点，失去焦点触发的事件。
    focusNum : function(){
      if(this.changePwd.num.length){
        this.inputPNum = 'inputPNum1'
        this.phoneNum = 'phoneNum2'
      }else{
        this.inputPNum = 'inputPNum1'
        this.phoneNum = 'phoneNum1'
      }  
    },
    focusCode : function(){
      if(this.changePwd.pwd.length){
        this.inputCode = 'inputCode1'
        this.vfCode = 'vfCode2'
      }else{
        this.inputCode = 'inputCode1'
        this.vfCode = 'vfCode1'
      }
    },
    blurNum:function(){
      if(this.changePwd.num.length){
        this.inputPNum = 'inputPNum1'
        this.phoneNum = 'phoneNum2'
      }else{
        this.inputPNum = 'inputPNum'
        this.phoneNum = 'phoneNum'
      }
    },
    blurCode:function(){
      if(this.changePwd.pwd.length){
        this.inputCode = 'inputCode1'
        this.vfCode = 'vfCode2'
      }else{
        this.inputCode = 'inputCode'
        this.vfCode = 'vfCode'
      }
    },
    submitForm:function(){
    if (!port.key) {
      return
    }
    port.key = false
    let _this = this        
    if (port.testPhone(this.changePwd.num)) { // 检测手机格式
      if (port.verifyPhone) {    //验证验证码
        port.verifyPhone(this.changePwd.num, this.changePwd.pwd).then(function(result) {
          port.key = true
          let data = result.status
          if (result.status) {
            console.log(data)
            console.log('验证成功')
           _this.$router.push({path:'/ResetPwd'})  //验证成功后跳转重置密码
          } else {
            alert(result.msg)
          }
        }).catch(function(error){
          console.log(error)
        })
      } else {
        alert('请重新打开页面！')
      }
    } else {
      alert('手机格式错误！')
      port.key = true
      return
    }   
     

    },
    //发送手机验证码
    getCode:function(){
      let that = this
      //发送验证码等请求回来时候的动画特效
      Indicator.open({
          spinnerType:'fading-circle'
        })
      port.sendPhoneVerify(this.changePwd.num).then(function(res){
        if(res){   
          //验证码发送成功后倒计时120s后才可以重新发送
          //关闭动画
          Indicator.close()
          var num = 120
          var timer = setInterval(function(){
            num -- 
            that.getCodeValue = num + 's后重新获取'
            if(num === 0){
              that.getCodeValue = '获取验证码'
              clearInterval(timer)
            }
          },1000)
        }
      }).catch(function(error){
        console.log(error)
      })
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
.forgetPwd{
  font-family: 'PINGPANG';
  background:#fff;
  height: 100vh;
  .login{
    background: #fff;
  }
  .banner{
    width: 100vw;
    height: 23vw;
    position: relative;
    .img1{
      position: absolute;
      width: 100vw;
      top: -23vw;
      left: 0;
    }
    .img2{
      position: absolute;
      width: 100vw;
      top: -23vw;
      right: 0;
    }
  }
  .content{
    width: 80vw;
    margin: 0 auto;
    margin-top:7.73vw; 
    h1{
      font-size: 4vw;
      text-align: center;
      color:#010101;
      line-height: 6.4vw;
    }
    ul{
      position: relative;
      .phoneNum,.vfCode{
        font-size: 4vw;
        letter-spacing: .66vw;
        color: #909090;   
        line-height: 11.6vw;  
      }
      .getCode{
        position: absolute;
        top: 0;
        right: 0; 
        input{
          font-size: 3.46vw;
          color: #666;
          width: 25vw;
          height:7.46vw ;
          border: 1px solid #e1e1e1;
          text-align: center;
          line-height: 7.46vw;
          border-radius: 2.66vw;
          background: #f8f8f8;
        }
        
      }
      //span位置
      .phoneNum{
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
      .phoneNum1{
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
          letter-spacing: .66vw;
        }
      }
      .phoneNum2{
       position: absolute;
       left: 1px;
       top: -6.5vw;
        span{
          color: #bebebe;
          font-size:3.2vw;
          letter-spacing: .66vw; 
        }
      }
      .phoneNum3{
        position: absolute;
        left: 1px;
        top: -4px;
         span{
          font-size: 4vw;
          letter-spacing: .66vw;
          color: #909090;   
          line-height: 10vw; 
        }
      }
      .vfCode{
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
      .vfCode1{
        position: absolute;
        left: 1px;
        top: 12vw;
        color: #bebebe;
        font-size:3.2vw;
        letter-spacing: .66vw; 
        animation: moveUp1 .5s;
        @keyframes moveUp1 {
          from{
            top: 17.2vw;
          }
          to{
            top: 12vw;
          }
        }
        }
       .vfCode2{
        position: absolute;
        left: 1px;
        top: 12vw;
         span{
          color: #bebebe;
          font-size:3.2vw;
          letter-spacing: .66vw; 
        }
        }
       .vfCode3{
        position: absolute;
        left: 1px;
        top: 17.2vw;
        span{
          font-size: 4vw;
          letter-spacing: .66vw;
          color: #909090;   
          line-height: 10vw; 
        }
       }
      .inputPNum,.inputCode{
        display: block;
        border-bottom: 1px solid #ccc;
        width: 80vw;
        height: 8vw;
        font-size: 4vw;
        margin-top: 10vw;
        color: #262628
      }
      .inputPNum1{
        display: block;
        border-bottom: 2px solid #ccc;
        width: 80vw;
        height: 8vw;
        font-size: 4vw;
        margin-top: 10vw;
        color: #262628;     
        }
      .inputCode1{
        display: block;
        border-bottom: 2px solid #ccc;
        width: 80vw;
        height: 8vw;
        font-size: 4vw;
        margin-top: 10vw;
        color: #262628;
      }
    }
    .submit {
      width: 100%;
      height: 13.1vw;
      background-color: #363636;
      border-radius: 1.3vw;
      font-family: "MicrosoftYaHei";
      font-size: 4.5vw;
      letter-spacing: .66vw;
      color: #eff9fd;
      margin-top: 6vw;
    }
  }
}


</style>
