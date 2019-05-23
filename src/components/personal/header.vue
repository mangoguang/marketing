<template>
  <div class="header" :style="{'height':`${height}vw`,'marginTop':`${marginTop}vw`}">
    <div class="compile">编辑</div>
    <div class="personalMsg">
      <!-- <div class="via" @click="go"></div> -->
      <img v-if="ajaxData.sex===1" :src="via" alt="" class="via" @click="go">
      <img v-else-if="ajaxData.sex===2" :src="svia" alt="" class="via" @click="go">
      <img v-else :src="unknow" alt="" class="via" @click="go">
      <div class="personal-content">
        <div class="name">
          <span><span v-if="ajaxData.positionList">{{ajaxData.positionList.typeName}}</span>{{ajaxData.name}}</span>
          <span>|</span>
          <span>{{ajaxData.sex === 0 ? '未知' : (ajaxData.sex === 1?'男' : '女')}}</span>
        </div>
        <div class="phoneNumber">
          <p class='shop'>{{shop}}</p>
          <p>{{ajaxData.account}}</p>
          <!-- <div class="phone-icon">
            <a href="tel:1599999999">
              <img src="../../assets/imgs/call.png" alt="电话">
            </a> 
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'

export default {
  data(){
    return{
      height:'',
      marginTop:'',
      ajaxData: {},
      shop: '',
      unknow:'./static/images/avatar.png',
      svia:'./static/images/svia.png',
      via:'./static/images/via.png'
    }
  },
  created() {
    //获取本地缓存信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    let shop = localStorage.getItem('shops')
    this.shop = JSON.parse(shop)[0].name
  },
  mounted(){
    this.isIPhoneX()
  },
  methods:{
    isIPhoneX(){
      let phone = this.phoneSize()
      if(phone === 'iphonex') {
        this.height = '54.4'
        this.marginTop = '-5.86'
      }else if(phone === 'iphone') {
        this.height = '49.26'
      }else {
        this.height = '49.26'
      }
    },
    go(){
      this.$router.push({path:'/personalData'});
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  width: 100vw;
  height: 46.26vw;
  background: url('../../assets/imgs/viaBg.png') no-repeat center;
  background-size: 100% 100%;
  position: relative;
  overflow-x:hidden;
  .compile{
    color: #fff;
    font-size: 4vw;
    padding: 5vw;
    position: absolute;
    right: -0.6vw;
    top: 7.13vw;
  }
  .personalMsg{
    position: absolute;
    top: 20.53vw;
    left: 6.93vw;
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 4.266vw;
    height: 30vw;
    .via{
      // background: url('../../assets/imgs/via.png') no-repeat center;
      // background-size: 100% 100%;
      width: 16vw;
      height: auto;
      //height: 16vw;
    }
    .personal-content{
      margin-left: 5.6vw;
      .phoneNumber{
        // display: flex;
        line-height:1.4em;
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
