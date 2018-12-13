<template>
  <div class="dealHeader" :style="{'height':`${height}vw`,'marginTop':`${marginTop}vw`}">
    <div class="backicon" @click="goBack()">
      <img src="../../../assets/imgs/backicon.png" alt="">
    </div>
    <div class="personalMsg">
      <div class="via"></div>
      <div class="content">
        <div class="name">
          <span>{{ propsName || username }}</span>
          <span>|</span>
          <span>{{ (propsSex == 0 || sex == 0) ?'女':'男'}}</span>
        </div>
        <div class="phoneNumber">
          <span>{{ propsPhone || phone }}</span>
          <div class="phone-icon">
            <!-- <a href="tel:1599999999"> -->
              <img src="../../../assets/imgs/call.png" alt="电话">
            <!-- </a>  -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'

export default {
  props: ['propsName', 'propsPhone', 'propsSex'],
  data(){
    return{
      height:'',
      marginTop:'',
      username:'',
      sex:'',
      phone:''
    }
  },
  created(){
    this.isIPhoneX()
    this.username = this.$route.query.username 
    this.sex = this.$route.query.sex
    this.phone = this.$route.query.phone
  },
  methods:{
    goBack(){
      this.$router.back(-1)
    },
    isIPhoneX : function(fn){
      var u = navigator.userAgent;
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isIOS) {        
        if ((screen.height == 812 && screen.width == 375) || (screen.height == 896 && screen.width == 414)) {
          this.height = '54.4'
          this.marginTop = '-5.86'
        }else{
          this.height = '49.26'
        } 
      }else{
        this.height = '49.26'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dealHeader{
  width: 100vw;
  background: url('../../../assets/imgs/viaBg1.png') no-repeat center;
  background-size: 100% 100%;
  .backicon{
    padding: 4.26vw;
    padding-top: 10.3vw;
    img{
      width: 2.66vw;
      height: 4.66vw;
    }
  }
  .personalMsg{
    margin-left: 6.93vw;
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 4.266vw;
    .via{
      background: url('../../../assets/imgs/dealVia.png') no-repeat center;
      background-size: 100% 100%;
      width: 16vw;
      height: 16vw;
    }
    .content{
      margin-left: 5.6vw;
      .phoneNumber{
        display: flex;
        .phone-icon{
          padding-left: 2vw;
          padding-right: 4vw;
          img{
            width: 3.06vw;
            height: 3.06vw;
          } 
        }
      }
    }
  }
}
</style>
