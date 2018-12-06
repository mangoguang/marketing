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
      <order-info v-if="order"/>
      <trackRecord v-if="trackRecord"/>
      <personalLevel v-if="level"/>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import dealHeader from '../../components/customer/dealCustomer/dealHeader'
import OrderInfo from '../../components/customer/dealCustomer/orderInfo'
import trackRecord from '../../components/customer/dealCustomer/trackRecord'
import personalLevel from '../../components/customer/dealCustomer/personalLevel'

export default {
  name:'keep',
  components:{dealHeader,OrderInfo,trackRecord,personalLevel},
  data(){
    return{
      includedComponents:'keep',
      header:['订单信息','跟踪记录','个人评级'],
      currentTab:0,
      order:true,
      trackRecord:false,
      level:false
    }
  },
  methods:{
    clickTab(index){
      this.currentTab = index
      index === 0? this.order = true : this.order = false
      index === 1? this.trackRecord = true : this.trackRecord = false
      index === 2? this.level = true : this.level = false
    }
  },
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由meta
    to.meta.keepAlive = true; // 让A缓存，不请求数据
    next(); // 跳转到A页面
  }
 
}
</script>

<style lang="scss" scoped>
.dealDetails{
  position: relative;   
  background:#f8f8f8;
  min-height: 100vh;
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
