<template>
  <div class="resetPwd">
    <div class="banner">
      <img src="../assets/imgs/banner1.png" alt="头部背景" class="img1">
      <img src="../assets/imgs/banner2.png" alt="头部背景" class="img2">
    </div>
    <div class="content">
    <h1>新密码要记得哦~</h1>
    <form>
      <ul>
        <li>
         <label for="account" v-bind:class='`${newpwd}`'><span>新密码</span></label>
         <input id="account" type="password"  v-bind:class="`${inputPwd}`"
          v-on:focus='focusPwd()'  @blur="blurPwd()"
          v-model="resetForm.Pwd" maxlength="20">
        </li>
        <li>
          <label for="code" v-bind:class='`${newPwd}`'><span>确认新密码</span></label>
          <input id="code" type="password"  v-bind:class="`${inputNewPwd}`"
            @focus ='focusCode()'  @blur="blurCode()"
            v-model="resetForm.pwd" maxlength="20"> 
        </li>
        <li>
          <button type="button" @click="submitForm('resetForm')" class="submit">确认</button>
        </li>                    
      </ul>
    </form>
  </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import VueRouter from "vue-router";
import mango from "../js";
import md5 from 'js-md5'

export default {
  data () {
    return {
      height: document.documentElement.clientHeight,
      inputPwd:'inputPwd',
      inputNewPwd:'inputNewPwd',
      newpwd:'newpwd',
      newPwd:'newPwd',
      resetForm:{
        Pwd:'',
        pwd:''
      }
      
    }
  },
  mounted(){
    let obj = {
      name: 'guang',
      age: '26',
      work: 'qianduan'
    }
    mango.getSign(obj)
    // console.log(mango.getSign1)
    //去除开头动画
     if(this.resetForm.Pwd.length){

    }else{
      this.newpwd = 'newpwd3'
      this.newPwd = 'newPwd3'
    }
  },
  computed: {
    
  },
  methods:{
     //光标获得焦点，失去焦点触发的事件。
    focusPwd : function(){
      if(this.resetForm.Pwd.length){
        this.inputPwd = 'inputPwd1'
        this.newpwd = 'newpwd2'
      }else{
        this.inputPwd = 'inputPwd1'
        this.newpwd = 'newpwd1'
      }  
    },
    focusCode : function(){
      if(this.resetForm.pwd.length){
        this.inputNewPwd = 'inputNewPwd1'
        this.newPwd = 'newPwd2'
      }else{
        this.inputNewPwd = 'inputNewPwd1'
        this.newPwd = 'newPwd1'
      }
    },
    blurPwd:function(){
      if(this.resetForm.Pwd.length){
        this.inputPwd = 'inputPwd1'
        this.newpwd = 'newpwd2'
      }else{
        this.inputPwd = 'inputPwd'
        this.newpwd = 'newpwd'
      }
    },
    blurCode:function(){
      if(this.resetForm.pwd.length){
        this.inputNewPwd = 'inputNewPwd1'
        this.newPwd = 'newPwd2'
      }else{
        this.inputNewPwd = 'inputNewPwd'
        this.newPwd = 'newPwd'
      }
    },
    submitForm:function(){
      //如果密码两次相同，保存新的密码。跳转到登录页面。
      let p = md5(this.resetForm.Pwd)
      let newp = md5(this.resetForm.pwd)
      if(p !== ''){
        if(p === newp){
          this.$emit('newPwd',p)
         this.getApi()
          this.$router.push({path:'/'})
          console.log('yes')
        }else{
          alert('两次输入的密码不一致')
        }
      }else{
        alert('请输入密码')
      }
    },//发起请求，后台修改密码。
       getApi:function() {
        const url = 'http://10.11.8.7:8086/app/login.api'
        let newp = md5(this.resetForm.pwd)
      // return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: url,
        headers: {
          'UUID': 'e10adc3949ba59abbe56e057f20f883e'
        },
        params: {
          account: '18080001',
          password:'e10adc3949ba59abbe56e057f20f883e',
          newpassword:newp
        }
      })
        .then((res) => {
          if (res.data) {
            res = res.data.data
            console.log(res)
            // let ajaxData = `{
            //   "tenantId": "${res.tenantId}",
            //   "token": "${res.token}",
            //   "uuid": "${res.uuid}"
            // }`
            // localStorage.setItem("ajaxData", ajaxData)
           
            // let obj = JSON.parse(ajaxData)
          }
        })
       }

  }
};
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
.resetPwd{
  font-family: 'PINGPANG';
  height: 100vh;
  background: #fff;
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
      .newpwd,.newPwd{
        font-size: 4vw;
        letter-spacing: .66vw;
        color: #909090;   
        line-height: 11.6vw;  
      }
      //span位置
      .newpwd{
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
      .newpwd1{
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
      .newpwd2{
       position: absolute;
       left: 1px;
       top: -6.5vw;
        span{
          color: #bebebe;
          font-size:3.2vw;
          letter-spacing: 4px; 
        }
      }
      .newpwd3{
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
      .newPwd{
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
      .newPwd1{
        position: absolute;
        left: 1px;
        top: 12vw;
        color: #bebebe;
        font-size:3.2vw;
        letter-spacing: .53vw; 
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
       .newPwd2{
        position: absolute;
        left: 1px;
        top: 12vw;
         span{
          color: #bebebe;
          font-size:3.2vw;
          letter-spacing: 4px; 
        }
        }
       .newPwd3{
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
      .inputPwd,.inputNewPwd{
        display: block;
        border-bottom: 1px solid #ccc;
        width: 80vw;
        height: 8vw;
        font-size: 4vw;
        margin-top: 10vw;
        color: #262628
      }
      .inputPwd1{
        display: block;
        border-bottom: 2px solid #ccc;
        width: 80vw;
        height: 8vw;
        font-size: 4vw;
        margin-top: 10vw;
        color: #262628;     
        }
      .inputNewPwd1{
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
      letter-spacing: 5px;
      color: #eff9fd;
      margin-top: 6vw;
    }
  }
}

</style>
