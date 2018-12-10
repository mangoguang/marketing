<template>
  <div class="dealDetails">
    <deal-header/>
    <ul>
      <li v-for="(item,index) in tabStatus" :key="index" 
        @click="clickTab(index)"
        :class="{'active' : tabStatus[index].status}">
        {{item.name}}
      </li>
    </ul> 
      <order-info v-show="tabStatus[0].status"/>
      <trackRecord v-show="tabStatus[1].status"/>
      <personalLevel v-show="tabStatus[2].status"/>
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
import Vuex, { mapMutations, mapState } from "vuex";
import mango from '../../js'


export default {
  name:'keep',
  components:{dealHeader,OrderInfo,trackRecord,personalLevel},
  data(){
    return{
     
    }
  },
  computed: {
    ...mapState({
      tabStatus: state => state.tabStatus.tabStatus
    })
  },
  methods:{
    ...mapMutations([
      'setTabStatus'
    ]),
    clickTab(index){
     this.setTabStatus(mango.btnList(['订单信息', '跟踪记录', '个人评级'], index))
    }
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
