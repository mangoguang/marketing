<template>
  <div class="enquiryInfo">
    <div class="header"  :style="{'height':`${height}vw`,'marginTop':`${marginTop}vw`}">
      <div class="backicon" >
        <div class="back-icon" @click="goBack()">
          <img src="../../assets/imgs/backicon.png" alt="">
        </div>
        <span>订单详情</span>
      </div>
      <div class="content">
        <p>{{ orderInfoDetails.orderStatus}}</p>
        <div class="photo"></div>
      </div>
    </div>
    <EnquiryOrderInfo/>
    <div class="line"></div>
    <orderInfoDetails/>
  </div> 
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex, { mapMutations, mapState } from 'vuex'
import mango from '../../js'
import EnquiryOrderInfo from "../../components/customer/enquiryOrder/enquiryOrderInfo";
import orderInfoDetails from "../../components/customer/dealCustomer/orderInfoDetails";

export default {
  components: {EnquiryOrderInfo,orderInfoDetails},
  data() {
    return {
      height:'',
      marginTop:''
    }
  },
  computed:{
    ...mapState({
      orderInfoDetails: state => state.orderInfoDetails.orderInfoDetails
    })
  },
  created(){
    this.isIPhoneX()
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
.enquiryInfo{
  width: 100vw;
  min-height: 100vh;
  background: #f8f8f8;
  .header{
    width: 100vw;
    background-image: linear-gradient(55deg,#007aff 0%,#5ac8fa 100%);
    .backicon{
      padding: 4.26vw;
      padding-top: 10.3vw;
      color: #fff;
      font-size: 5.06vw;
      display: flex;
      font-weight: bold;
      .back-icon{
        padding-right: 8vw;
        img{
          width: 2.66vw;
          height: 4.66vw;
        }
      }
      span{
        padding-left: 26.33vw;
        line-height: 7vw;  
      }
    }
    .content{
      color: #fff;
      font-size: 4.8vw;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .photo{
        width: 26.53vw;
        height: 19.46vw;
        background: #fff;
        border: 1px solid #e1e1e1
      }
    }
  }
  .line{
    margin-bottom: 2vw;
  }
}
</style>
