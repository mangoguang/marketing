<template>
  <div class="orderInfo">
    <personalLevel :list='list'/>
    <ul>
      <div class="topBar">
        <span>订单号</span>
        <span>订单状态</span>
      </div>
      <li v-for="(item,index) in list.orderList" :key="index"  @click="pullDown(index)">
        <hr v-if="index !== 0"> 
        <div class="orderList">
          <span>{{index + 1}}</span>
          <span>订单号{{item.orderNo}}</span>
          <span>{{item.status}}</span>
          <span >
            <img src="../../../assets/imgs/rightside.png" alt="" :class="{'pullDown':`${rotate}` == index}">
          </span>
        </div>
        <div class="setLine" v-show="i == index"> 
          <OrderInfoDetails :list='list.orderList[index]'/>
        </div>
      </li>
    </ul>                    
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex, { mapMutations, mapState } from 'vuex'
import OrderInfoDetails from './orderInfoDetails'
import personalLevel from './personalLevel'
import mango from '../../../js'
export default {
  name:'dealOrderInfoDetails',
  props: ['list'],
  components:{OrderInfoDetails,personalLevel},
  data(){
    return{
      rotate:-1,
      status:false,
      i:-1,
      dealTotalPrice: 0,
      dealDiscountPrice: 0
    }
  },
  computed: {
    ...mapState({
      dealOrderInfoDetails: state => state.dealOrderInfoDetails.dealOrderInfoDetails,
      totalPrice: state => state.dealOrderInfoDetails.totalPrice,
      discountPrice: state => state.dealOrderInfoDetails.discountPrice
    })
  },
  mounted(){
    console.log('list',this.list);
  },
  methods:{
    // ...mapMutations([
    //   'setOrderInfoDetails',
    //   'setTotalPrice',
    //   'setDiscountPrice'
    // ]),
    // calcPrice(list) {
    //   this.dealTotalPrice = 0
    //   this.dealDiscountPrice = 0
    //   let itemList = list.orderItemList
    //   let priceArr = []
    //   itemList.forEach((item, index) => {
    //     this.dealTotalPrice += item.price * item.quantity
    //   });
    //   this.dealDiscountPrice = this.dealTotalPrice - list.totalAmount
    //   this.setTotalPrice(this.dealTotalPrice)
    //   this.setDiscountPrice(this.dealDiscountPrice)
    // },
    //下拉状态改变，获取数据
    pullDown(index){
      // this.setOrderInfoDetails(this.dealOrderInfoDetails.orderList[index]) 
      // let orderList = this.dealOrderInfoDetails.orderList[index]
      // this.calcPrice(orderList)
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
    .topBar{
      height: 10.81vw;
      background: #efeff4;
      display: flex;
      justify-content: space-between;
      color: #363636;
      font-size: 3.73vw;
      width: 100%;
      box-sizing: border-box;
      padding: 0 4.27vw;
      align-items: center;
    }
    border-top:1px solid #e1e1e1;
    // margin-top: 13.46vw;
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
        flex: 0.86;
      }
      span:nth-child(3){
        font-size: 4vw;
        flex: 0.4;
        text-align: right;
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
      height:0.3vw;
      border: none;
      margin: 0;
      margin-left: 4.26vw;
    }
    .setLine{
      border-top: 2px solid #007aff;
      border-bottom: 2px solid #007aff;
    }
  }
}
</style>
