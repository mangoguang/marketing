<template>
  <div class="dealHeader" :style="{'height':`${height}vw`,'marginTop':`${marginTop}vw`}">
    <div class="backicon" @click="goBack()">
      <img src="../../../assets/imgs/backicon.png" alt="">
    </div>
    <div class="personalMsg">
      <img :src="list.headPortrait" class='via'/>
      <div class="content">
        <div class="name">
          <span>{{ `*${list.username ? list.username.slice(1, 5) : ''}` }}</span>
          <span>|</span>
          <span>{{ (list.sex == 'Ms.') ?'女':(list.sex == 'Mr.')? '男' : '未知'}}</span>
          <!-- <span v-show='key1'>{{`***${address ? address.slice(3, 50) : ''}`}}</span> -->
        </div>
        <div class="phoneNumber">
          <span>{{ `*****${list.phone ? list.phone.slice(5, 11) : ''}` }}</span>
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
import Vuex, { mapMutations, mapState } from 'vuex'

export default {
  props: ['propsName', 'propsPhone', 'propsSex', 'list'],
  data(){
    return{
      height:'',
      marginTop:'',
      username:'',
      // sex:'',
      phone:'',
      address: '',
      key: false,
      key1: false
    }
  },
  computed: {
    ...mapState({
      dealOrderInfoDetails: state => state.dealOrderInfoDetails.dealOrderInfoDetails
    })
  },
  created(){
    if(this.propsSex === '') {
      this.key = true
      this.key1 =false
    }else {
      this.key = false
      this.key1 =true
    }
    this.isIPhoneX()
    this.username = this.$route.query.username 
    this.address = this.$route.query.address
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
      // background: url('../../../assets/imgs/dealVia.png') no-repeat center;
      // background-size: 100% 100%;
      width: 16vw;
      height: 16vw;
      border-radius:50%;
      background: rgba(255, 255, 255, 0.1)
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
      .name{
        width: 65vw;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}
</style>
