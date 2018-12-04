<template>
  <div class="personalLevel">
    <div class="content">
      <div class="total-money">
        <p>订单总金额</p>
        <p class="money">￥<span class="strong">{{ Math.round(dealOrderInfoDetails.totalAmount) }}</span></p>
      </div>
      <div class="numberOfOrder">
        <p>客户订单数</p>
        <p class="strong">{{ dealOrderInfoDetails.orderCount }}</p>
      </div>
    </div>
    <div class="assessLevel">
      <span class="text">评定级别</span>
      <div class="level" 
        v-for="(item,index) in level" :key="index"
        :class="{'active':active == index + 1}"
        @click="selectLevel(index)">
        <span>{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex, { mapMutations, mapState } from 'vuex'
import mango from '../../../js'

export default {
  data() {
    return{
      level:['高','中','低'],
      active:-1,
      key:true
    }
  },
  computed: {
    ...mapState({
      dealOrderInfoDetails: state => state.dealOrderInfoDetails.dealOrderInfoDetails
    })
  },
  watch:{
   
  },
  created(){
    //获取本地缓存信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    this.active = this.dealOrderInfoDetails.level
  },
  methods:{
    ...mapMutations([
      'setDealCustomerList'
    ]),
    selectLevel(index) {
      this.active = index + 1
      mango.getAjax(this, 'level/update', {
        customerId:this.dealOrderInfoDetails.customerId,
        level:this.active
      }, 'v2','post')
      .then((res) => {
        if (res) {
         console.log('更新评级',res.status)   
          
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.personalLevel{
  background: #fff;
  width: 91.46vw;
  // height: 40vw;
  margin: auto;
  margin-top: 2.66vw;
  color: #666;
  font-size: 3.73vw;
  .content{
    height: 26.53vw;
    margin: 2.66vw;
    border-bottom: 1px solid #e1e1e1;
    display: flex;
    .strong{
      color: #363636;
      font-weight: bold;
      font-size: 9.6vw;
      text-align: center;
    }
    .total-money{
      margin: 2.66vw 0;
      flex: 0.9;
      p{
        font-size: 4vw;
      }
      .money{
        padding-left: 13vw;
        line-height: 4em;
      }
    }
    .numberOfOrder{
      margin: 3vw 0; 
      padding-left: 3vw;
      flex: 0.3;
      border-left: 1px solid #e1e1e1;
      .strong{
        line-height: 1.6em
      }
    }
  }
  .assessLevel{
    padding: 0 0 2vw 2.66vw;
    display: flex;
    justify-content: space-between;
    .text{
      // padding-right: 2.66vw;
      flex: 0.6;
    }
    .level{
      flex: 0.6;
      width: 21.33vw;
      border-radius: 1.6vw;
      background: #f8f8f8;
      margin: 1.2vw;
      text-align: center;
      line-height: 10.8vw;
    }
    .active{
      background: #b2d7ff;
      color: #007aff
      
    }
  }
}
</style>
