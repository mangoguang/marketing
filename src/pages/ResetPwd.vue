<template>
  <div class="resetPwd" :style="{'margin-top':`${myStyle.fgPwdTop}vw`}">
    <mybanner :title='title' />
    <div class="banner">
      <img src="../assets/imgs/banner1.png" alt="头部背景" class="img1">
      <img src="../assets/imgs/banner2.png" alt="头部背景" class="img2">
    </div>
    <div class="content">
      <h1>新密码要记得哦~</h1>
      <form>
        <ul>
          <li 
          is='myinput'
          :type='type'
          :labelContent='labelContent'
          v-model="inputValue1">
          </li>
          <li 
          is='myinput'
          :type='type'
          :labelContent='labelContent1'
          v-model="inputValue2">
          </li>
          <li>
            <btn
              @touchend.native="submitForm('resetForm')"
              :text='text'>
            </btn>
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
import btn from '../components/btn'
import myinput from '../components/myInput'
import mybanner from '../components/banner'
export default {
  components:{btn,myinput,mybanner},
  data () {
    return {
      height: document.documentElement.clientHeight,
      text:'确认修改',
      type:'password',
      labelContent:'新密码',
      labelContent1:'确认新密码',
      inputValue1:'',
      inputValue2:'',
      title:'修改密码'
 
    }
  },
  props:['myStyle'],
  mounted(){
    let obj = {
      name: 'guang',
      age: '26',
      work: 'qianduan'
    }
    mango.getSign(obj)
    // console.log(mango.getSign1)
  },
  methods:{
    submitForm:function(){
      //如果密码两次相同，保存新的密码。跳转到登录页面。密码加密。
      let newPwd = this.inputValue1
      if(newPwd !== ''){
        let md5NewPwd = md5(newPwd)
        let affirmPwd = md5(this.inputValue2)
        if(md5NewPwd === affirmPwd){
          this.getApi()
          this.$router.push({path:'/'})
          // console.log('yes')
        }else{
          alert('两次输入的密码不一致')
        }
      }else{
        alert('请输入密码')
      }
    },//发起请求，后台修改密码。
       getApi:function() {
        mango.loading('open')
        const url = 'http://10.11.8.7:8086/app/login.api'
        let affirmPwd = md5(this.inputValue2)
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
          newpassword:affirmPwd
        }
      })
        .then((res) => {
          mango.loading('close')
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

.resetPwd{
  font-family: PINGPANG;
  height: 100vh;
  background: #fff;
  .banner{
    width: 100vw;
    height: 16.466vw;
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
  }
}

</style>
