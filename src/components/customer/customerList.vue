<!-- <keep-alive> -->
<template>
  <ul
    class="customerList"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10">
    <li
    class="customerContent"
    v-for="(item, index) in customerList"
    :key="`customerList${index}`">
      {{item.name}}
      <ul>
        <li>
          <div></div>
          <strong>{{item.name}}<i></i></strong>
          <span>{{item.time}}</span>
        </li>
        <li>{{item.classify}}</li>
        <li>{{item.percent}}</li>
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
      customerList: state => state.customer.customerList
    })
  },
  watch: {
    'customerList': function(val) {
      console.log(123, val)
    }
  },
  mounted(){

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
        width: 2vw;
        top: 2vw;
        left: 0;
        background: url(../../assets/imgs/bar.png) no-repeat;
        background-size: auto 100%;
      }
    }
    strong{
      line-height: 7vw;
      font-size: 16px;
      color: #363636;
      i{
        display: inline-block;
        width: 3.2vw;
        height: 3.2vw;
        background: url(../../assets/imgs/redHeart.png) no-repeat;
        background-size: 100% auto;
        background-position: center;
        margin-left: 1vw;
      }
    }
    span{
      line-height: 7vw;
      font-size: 14px;
      color: #999;
    }
    li:nth-child(1){
      padding-left: 3vw;
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