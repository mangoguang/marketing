<!-- <keep-alive> -->
<template>
  <ul
    class="customerList"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10">
    <li
    class="customerContent"
    v-for="(item, index) in customerList.records"
    :key="`customerList${index}`"
    @click="toCustomerInfo(item.id)">
      {{item.name}}
      <ul>
        <li>
          <div :class="`urgence${item.urgency}`"></div>
          <strong>{{item.username}}<i :class="`important${item.important}`"></i></strong>
          <span>{{item.followTime}}</span>
        </li>
        <li>{{item.intention}}</li>
        <li>{{item.probability}}</li>
      </ul>
    </li>
  </ul>
  <!-- <ul class="customerList">
    <li class="customerContent" v-for="(customer, index) in customerMsg" :key="`customer${index}`">
      <ul>
        <li>
          <div></div>
          <strong>{{customer.name}}<i></i></strong>
          <span>{{customer.time}}</span>
        </li>
        <li>{{customer.classify}}</li>
        <li>{{customer.percent}}</li>
      </ul>
    </li>
  </ul> -->
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import { InfiniteScroll } from 'mint-ui'
import Vuex, { mapState } from 'vuex'
Vue.use(InfiniteScroll)
Vue.use(Vuex)
import mango from '../../js'
export default {
  name: 'customerList',
  props:[],
  data () {
    return {
      
    }
  },
  computed: {
    ...mapState({
      // citySelect: state => state.select.citySelect,
      customerList: state => state.customer.customerList,
      headerStatus: state => state.customerHeader.headerStatus
    })
  },
  watch: {
    // 'customerList'(val) {
    //   console.log('获取的客户列表：', this.customerList)
    // }
    headerStatus(){
    
    }
  },
  methods:{
    loadMore() {
      // mango.loading('open')
      // setTimeout(() => {
      //   // let last = this.customerList[this.customerList.length - 1]
      //   // for (let i = 1; i <= 10; i++) {
      //   //   this.customerList.push(last + i)
      //   // }
      //   // mango.loading('close')
      // }, 2500)
    },
    toCustomerInfo(id) {
      this.$router.push(`/customerInfo/${id}`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.customerList{
  width: 100vw;
  height: 100vh;
  padding: 24.6vw 0 18vw 0;
  box-sizing: border-box;
  overflow-x: hidden;
}
.customerContent{
  padding: 0 4.266vw;
  background: #fff;
  margin-bottom: 1vw;
  ul{
    display: flex;
    justify-content: space-between;
    li{
      position: relative;
      display: flex;
      flex-direction: column;
      height: 14vw;
      line-height: 14vw;
      padding: 1vw 0;
      div{
        position: absolute;
        height: 12vw;
        width: 4vw;
        top: 2vw;
        left: 0;
      }
      div.urgence1{
        background: url(../../assets/imgs/jinji3.png) no-repeat;
        background-size: 4vw auto;
        background-position: 0 center;
      }
      div.urgence2{
        background: url(../../assets/imgs/jinji2.png) no-repeat;
        background-size: 4vw auto;
        background-position: 0 center;
      }
      div.urgence3{
        background: url(../../assets/imgs/jinji1.png) no-repeat;
        background-size: 4vw auto;
        background-position: 0 center;
      }
    }
    strong{
      line-height: 7vw;
      font-size: 16px;
      color: #363636;
      i{
        display: inline-block;
        width: 12vw;
        height: 2.8vw;
        margin-left: 1vw;
      }
      i.important1{
        background: url(../../assets/imgs/star3.png) no-repeat;
        background-size: auto 100%;
        background-position: center;
      }
      i.important2{
        background: url(../../assets/imgs/star3.png) no-repeat;
        background-size: auto 100%;
        background-position: center;
      }
      i.important3{
        background: url(../../assets/imgs/star3.png) no-repeat;
        background-size: auto 100%;
        background-position: center;
      }
    }
    span{
      line-height: 7vw;
      font-size: 14px;
      color: #999;
    }
    li:nth-child(1){
      padding-left: 5vw;
    }
    li:nth-child(2){
      font-size: 16px;
      color: #999;
    }
    li:nth-child(3){
      font-size: 20px;
      color: #363636;
    }
  }
}
</style>