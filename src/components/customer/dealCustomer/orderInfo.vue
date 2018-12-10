<template>
  <div class="orderInfo">
    <ul>
      <li v-for="(item,index) in dealOrderInfoDetails.orderList" :key="index"  @click="pullDown(index)">
        <hr v-show="index !== 0">
        <div class="orderList">
          <span>{{index + 1}}</span>
          <span>订单号{{item.orderNo}}</span>
          <span>{{item.orderStatus}}</span>
          <span >
            <img src="../../../assets/imgs/rightside.png" alt="" :class="{'pullDown':`${rotate}` == index}">
          </span>
        </div>
        <OrderInfoDetails v-show="i == index"/>
      </li>
    </ul>                    
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex, { mapMutations, mapState } from 'vuex'
import OrderInfoDetails from './orderInfoDetails'

export default {
  name:'dealOrderInfoDetails',
  components:{OrderInfoDetails},
  data(){
    return{
      rotate:-1,
      status:false,
      i:-1
    }
  },
  computed: {
    ...mapState({
      dealOrderInfoDetails: state => state.dealOrderInfoDetails.dealOrderInfoDetails
    })
  },
  methods:{
    ...mapMutations([
      'setOrderInfoDetails'
    ]),
    //下拉状态改变，获取数据
    pullDown(index){
      this.setOrderInfoDetails(this.dealOrderInfoDetails.orderList[index]) 
      if(this.status){
        if(this.rotate == index){
          this.i = -1
          this.status = false
          this.rotate = -1
        }else{
          this.i = index
          this.rotate = index  
        }
      }else{
        this.status = true
        this.rotate = index
         this.i = index
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.orderInfo{
  background: #fff;
  width: 100vw;
  ul{
    border-top:1px solid #e1e1e1;
    margin-top: 2.66vw;
    font-size: 3.73vw;
    border-bottom: 1px solid #e1e1e1;
    .orderList:nth-child(1){
      border-top: none;
    }
    .orderList{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 4.26vw;
      line-height: 11.8vw;
      color: #363636;
      span:nth-child(1){
        color: #999;
        flex: 0.1;
      }
      span:nth-child(2){
        flex: 1
      }
      span:nth-child(3){
        font-size: 4vw;
      }
      span:nth-child(4){
        padding: 0 4.26vw;
        img{
          width: 1.6vw;
          height: 3.2vw;
          transform: rotate(90deg)
        }
        .pullDown{
          transform: rotate(-90deg)
        }
       
      }
      .orderDetails{
        display: none
      }
    }
    hr{
      background: #e1e1e1;
      height:0.8px;
      border: none;
      margin: 0;
      margin-left: 4.26vw;
    }
  }
}
</style>
