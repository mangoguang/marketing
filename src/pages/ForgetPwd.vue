<template> 
  <div class="forgetPwd" :style="{'margin-top':`${myStyle.fgPwdTop}vw`}">
    <mybanner :title='title'/>
    <div class="banner">
      <img src="../assets/imgs/banner1.png" alt="头部背景" class="img1">
      <img src="../assets/imgs/banner2.png" alt="头部背景" class="img2">
    </div>
    <div class="content">
    <h1>验证了手机号方可修改密码哟~</h1>
    <form>
      <ul>
        <li 
          is='myinput'
          :type='type'
          :labelContent='getPhoneNum'
          v-model="inputValue1">
        </li>
        <li class="getCode">
          <input 
            @touchend="getCode"
            v-model="getCodeValue"  
            type="text" 
            readonly>
        </li>
         <li 
          is='myinput'
          :type='type'
          :labelContent='verificationCode'
          v-model="inputValue2">
          </li>
        <li>
          <btn 
          @touchend.native="submitForm('changePwd')"
          :text='text'>
          </btn>
        </li>                    
      </ul>
    </form>
  </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import mango from '../js'
import axios from 'axios'
import port from '../js/variable'
import 'mint-ui/lib/style.css'
import {Indicator} from 'mint-ui'
import btn from '../components/btn'
import myinput from '../components/myInput'
import mybanner from '../components/banner'

export default {
components:{btn,myinput,mybanner},
data () {
    return {
      height: document.documentElement.clientHeight,
      getCodeValue:'获取验证码',
      text:'确认',
      type:'number',
      getPhoneNum:'请输入手机号',
      verificationCode:'验证码',
      inputValue1:'',
      inputValue2:'',
      title:'忘记密码'
      
    }
  },
  props:['myStyle'],
  methods:{
    submitForm:function(){
    if (!port.key) {
      return
    }
    port.key = false
    let _this = this        
    if (port.testPhone(this.inputValue1)) { // 检测手机格式
      if (port.verifyPhone) {    //验证验证码
        port.verifyPhone(this.inputValue1, this.inputValue2).then(function(result) {
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
      port.sendPhoneVerify(this.inputValue1).then(function(res){
        if(res){   
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

.forgetPwd{
  // font-family: PINGPANG;
  background:#fff;
  height: 100vh;
  .banner{
    width: 100vw;
    height:  16.466vw;
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
    margin-top:15.46vw; 
    h1{
      font-size: 4vw;
      text-align: center;
      color:#010101;
      line-height: 6.4vw;
    }
    ul{
      position: relative;
      .getCode{
        position: absolute;
        top: -.4vw;
        right: 0; 
        input{
          font-size: 3.46vw;
          color: #666;
          width: 25vw;
          border: 1px solid #e1e1e1;
          text-align: center;
          line-height: 7vw;
          border-radius: 2.66vw;
          background: #f8f8f8;
          outline: none
        }
        
      }
    }
  }
}


</style>
