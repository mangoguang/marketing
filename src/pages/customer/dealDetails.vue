<template>
  <div class="dealDetails">
    <deal-header/>
    <ul class="infoNav">
      <li v-for="(item,index) in header" :key="index" 
        @click="clickTab(index)"
        :class="{'active':`${currentTab}` == index}">
        {{item}}
      </li>
    </ul>
    <keep-alive>
    <order-info v-if="order"/>
    
      <trackRecord v-if="trackRecord"/>
    
    <personalLevel v-if="level"/>
    </keep-alive>
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
}
//  beforeRouteEnter(to, from, next) {
//     next(vm => {
//       /*
//        如果 to.meta.savedPosition === undefined 说明是刷新页面或可以叫第一次进入页面 需要刷新数据
//        如果to.meta.keepAlive === false, 那么说明是需要请求的;
//        此时需要刷新数据，获取新的列表内容。
//        否则的话 什么都不做，直接使用 keep-alive中的缓存
//        */
//       // if (to.meta.savedPosition === undefined) {
//       //   console.log('3243141414','undefined')
//       // }
//       if (!to.meta.keepAlive) {
//         console.log('3243141414','!to.meta.keepAlive')        
//       }
//     })
//   }
}
</script>

<style lang="scss" scoped>
.dealDetails{
  position: relative;   
  background:#f8f8f8;
  min-height: 100vh;
}
</style>
