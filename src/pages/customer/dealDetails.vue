<template>
  <div class="dealDetails">
    <deal-header/>
    <ul>
      <li v-for="(item,index) in header" :key="index" 
        @click="clickTab(index)"
        :class="{'active':`${currentTab}` == index}">
        {{item}}
      </li>
    </ul> 
    <order-info/>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import dealHeader from '../../components/customer/dealCustomer/dealHeader'
import OrderInfo from '../../components/customer/dealCustomer/orderInfo'

export default {
  components:{dealHeader,OrderInfo},
  data(){
    return{
      header:['订单信息','跟踪记录','个人评级'],
      currentTab:0
    }
  },
  methods:{
    clickTab(index){
      this.currentTab = index
    }
  }
}
</script>

<style lang="scss" scoped>
.dealDetails{
  position: relative;   
  ul{
    display: flex;
    justify-content: space-between;
    padding: 0 4.26vw;
    margin-top: -8vw;
    li{
      width: 29.3vw;
      line-height: 8vw;
      text-align: center;
      background: #b2d7ff;
      border-radius: 1.6vw 1.6vw 0 0;
      color: #007aff;
      font-size: 3.73vw;
    }
    .active{
      background: #007aff;
      color: #fff
    }
  }
  

}
</style>
