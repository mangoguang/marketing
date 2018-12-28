<template>
  <div class="dealDetails">
    <deal-header/>
    <ul class="infoNav">
      <li  class="infoNavLi"
        v-for="(item,index) in tabStatus" :key="index" 
        @click="clickTab(index)"
        :class="{'active' : tabStatus[index].status}">
        {{item.name}}
      </li>
    </ul> 
      <order-info v-show="tabStatus[0].status"/>
      <trackRecord v-show="tabStatus[1].status"/>
      <!-- <personalLevel v-show="tabStatus[2].status"/> -->
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import dealHeader from '../../components/customer/dealCustomer/dealHeader'
import OrderInfo from '../../components/customer/dealCustomer/orderInfo'
import trackRecord from '../../components/customer/dealCustomer/trackRecord'
// import personalLevel from '../../components/customer/dealCustomer/personalLevel'
import Vuex, { mapMutations, mapState } from "vuex";
import mango from '../../js'


export default {
  name:'keep',
  // components:{dealHeader,OrderInfo,trackRecord,personalLevel},
  components:{dealHeader,OrderInfo,trackRecord},
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
     this.setTabStatus(mango.btnList(['订单信息', '需求信息'], index))
    }
  }
}
</script>

<style lang="scss" scoped>
.dealDetails{
  position: relative;   
  background:#f8f8f8;
  min-height: 100vh;
  .infoNavLi{
    width: 49%;
  }
}
</style>
