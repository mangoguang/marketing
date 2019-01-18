<template>
  <div class="orderInfoDetails">
    <div class="product-wrapper">
      <div class="product" 
        v-for="(item,index) in orderInfoDetails.orderItemList " :key="index">
        <!-- <div class="product-photo">产品图</div> -->
        <div class="product-details">
          <div class="details">
            <span>{{ item.goodsName || 1}}</span>
            <p>{{ item.goodsSpec }}</p>
          </div>
          <div class="price">
            <p>￥{{ Math.round(item.price) }}</p>
            <span>x{{ Math.round(item.quantity) }}</span>
          </div>
        </div>
      </div>
      <div class="total-amount">
        <span>订单总额</span>
        <span>￥{{Math.round(total)}}</span>
      </div>
      <div class="discount">
        <span>折扣金额</span>
        <span>￥{{ Math.round(discount)}}</span>
      </div>
      <div class="payment">
        <p>实付款</p>
        <span>￥{{Math.round(orderInfoDetails.totalAmount)}}</span>
      </div>
    </div>
    <div class="orderInfo">
      <div class="title">
        <div class="icon"></div>
        <p>订单信息</p>
      </div>
      <ul>
        <!-- <li v-for="(item,i) in orderInfo" :key="i">
          <div v-for="(key,value,index) in item" :key="index">
            <span>{{value}}</span>
            <p>{{key}}</p>
          </div>
        </li> -->
        <li>
          <div>
            <span>客户姓名:</span>
            <p>{{ `*${orderInfoDetails.username ? orderInfoDetails.username.slice(1, 5) : ''}` }}</p>
          </div>
        </li>
        <li>
          <div>
            <span>客户电话:</span>
            <p>{{ `******${orderInfoDetails.phone ? orderInfoDetails.phone.slice(6, 11) : ''}` }}</p>
          </div>
        </li>
        <li>
          <div>
            <span>订单号:</span>
            <p>{{ orderInfoDetails.orderNo }}</p>
          </div>
        </li>
        <li>
          <div>
            <span>订单创建日期:</span>
            <p>{{ orderInfoDetails.recordTime }}</p>
          </div>
        </li>
        <li>
          <div>
            <span>订单下单日期:</span>
            <p>{{ orderInfoDetails.orderTime }}</p>
          </div>
        </li>
        <li>
          <div>
            <span>订单需求日期:</span>
            <p>{{ orderInfoDetails.demandTime }}</p>
          </div>
        </li>
        <li> 
          <div>
            <span>送货地址:</span>
            <p>{{ `******${orderInfoDetails.address ? orderInfoDetails.address.slice(6, 50) : ''}` }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueRouter from "vue-router";
import Vuex, { mapMutations, mapState } from 'vuex'

export default {
  data(){
    return{
      total: '',
      discount: ''
    } 
  },
  destroyed() {
    this.setTotalPrice(0)
    this.setDiscountPrice(0)
    this.setOrderTotalPrice(0)
    this.setOrderTotalPrice(0)
  },
  computed: {
      ...mapState({
        orderInfoDetails: state => state.orderInfoDetails.orderInfoDetails,
        totalPrice: state => state.dealOrderInfoDetails.totalPrice,
        discountPrice: state => state.dealOrderInfoDetails.discountPrice,
        orderTotalPrice: state => state.orderInfoDetails.orderTotalPrice,
        orderDiscountPrice: state => state.orderInfoDetails.orderDiscountPrice
      })
    },
  watch: {
    totalPrice() {
      this.total = this.totalPrice
    },
    discountPrice() {
      this.discount = this.discountPrice
    },
    orderTotalPrice() {
      this.total = this.orderTotalPrice
    },
    orderDiscountPrice() {
      this.discount = this.orderDiscountPrice
    }
  },
  created() {
    // this.calcPrice()
    // console.log(144, this.orderTotalPrice, this.orderDiscountPrice)
  },
  methods: {
    ...mapMutations([
      'setTotalPrice', 
      'setDiscountPrice',
      'setOrderTotalPrice',
      'setOrderDiscountPrice'
    ])
  }
}
</script>

<style lang="scss">
.orderInfoDetails {
  background: #f8f8f8;
  // border-top: 2px solid #007aff;
  // border-bottom: 2px solid #007aff;
  color: #999;
  line-height: 6.4vw;
  font-size: 3.73vw;
  .product-wrapper {
    padding: 6.66vw 4.26vw 0 4.26vw;
    background: #fff;
    .product {
      display: flex;
      margin-bottom: 4vw;
      // .product-photo {
      //   background: #ccc;
      //   width: 24vw;
      //   height: 24vw;
      //   border-radius: 1.6vw;
      //   text-align: center;
      //   color: #363636;
      //   line-height: 24vw;
      //   margin-right: 5.3vw;
      //   flex: 0.3;
      // }
      .product-details {
        // flex: 0.7;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        line-height: 1.4em;
        .details {
          span {
            color: #363636;
          }
        }
        .price {
          margin-top: 3.73vw;
          display: flex;
          justify-content: space-between;
          p {
            color: #363636;
          }
        }
      }
    }
    .total-amount {
      display: flex;
      justify-content: space-between;
      margin-top: 3.73vw;
    }
    .discount {
      display: flex;
      justify-content: space-between;
      border-bottom: 2px solid #b2d7ff;
      padding-bottom: 2vw;
    }
    .payment {
      display: flex;
      justify-content: space-between;
      line-height: 3em;
      p {
        color: #363636;
      }
      span {
        color: #007aff;
        font-size: 4.26vw;
      }
    }
  }
  .orderInfo {
    background: #fff;
    margin-top: 2vw;
    padding: 6.66vw 4.26vw;
    .title{
      display: flex;
      .icon{
        background: url('../../../assets/imgs/order.png') no-repeat center;
        background-size: 100% 100%;
        width: 5.06vw;
        height: 5.33vw;
      }
      p{
        padding-left: 5.2vw;
        color: #363636;
        font-size: 4.26vw;
      }
    }
    ul{
      color: #999;
      margin-top: 2.26vw;
      li{
        div{
          display: flex;
          span{
            flex: 0.34
          }
          p{
            flex: 0.7
          }
        }
      }
    }
  }
}
</style>
