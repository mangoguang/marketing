<template>
  <div class="enquiryInfo">
    <!-- <div class="header" :style="{'height':`${height}vw`,'marginTop':`${marginTop}vw`}">
      <div class="backicon">
        <div class="back-icon" @click="goBack()">
          <img src="../../assets/imgs/backicon.png" alt>
        </div>
        <span>订单详情</span>
      </div>
      <div class="content">
        <p>{{ orderInfoDetails.orderStatus}}</p>
        <div class="photo"></div>
      </div>
    </div> -->
    <deal-header/>
    <ul class="infoNav">
      <li  class="infoNavLi"
        v-for="(item,index) in dealTabStatus" :key="index" 
        @click="clickTab(index)"
        :class="{'active' : dealTabStatus[index].status}">
        {{item.name}}
      </li>
    </ul> 
    <order-info v-show="dealTabStatus[0].status" :id='id'/>
    <!-- <EnquiryOrderInfo/> -->
    <!-- <div class="line"></div> -->
    <orderInfoDetails/>
  </div>
</template>

<script>
import dealHeader from '../../components/customer/dealCustomer/dealHeader'
import OrderInfo from '../../components/customer/dealCustomer/orderInfo'
import Vuex, { mapMutations, mapState } from "vuex";
import mango from "../../js";
import EnquiryOrderInfo from "../../components/customer/enquiryOrder/enquiryOrderInfo";
import orderInfoDetails from "../../components/customer/dealCustomer/orderInfoDetails";

export default {
  components: { EnquiryOrderInfo, orderInfoDetails, dealHeader, OrderInfo },
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      orderInfoDetails: state => state.orderInfoDetails.orderInfoDetails,
      dealTabStatus: state => state.tabStatus.dealTabStatus
    })
  },
  created() {
    this.id = this.$route.query.id
  },
  methods: {
    ...mapMutations(['setDealTabStatus']),
    //切换顶部导航
    clickTab(index) {
      this.setDealTabStatus(mango.btnList(['订单信息', '客户信息', '意向信息'], index))
    },
    goBack() {
      this.$router.back(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.enquiryInfo {
  width: 100vw;
  min-height: 100vh;
  background: #f8f8f8;
  .infoNav {
    width: 100%;
    justify-content: space-around;
    box-sizing: border-box;
    .infoNavLi {
      width: 30%;
    }
    .active {
      background: #f8f8f8;
      color: #007aff;
      font-weight: bold;
    }
  } 
  // .header {
  //   width: 100vw;
  //   background-image: linear-gradient(55deg, #007aff 0%, #5ac8fa 100%);
  //   .backicon {
  //     padding: 4.26vw;
  //     padding-top: 10.3vw;
  //     color: #fff;
  //     font-size: 5.06vw;
  //     display: flex;
  //     font-weight: bold;
  //     .back-icon {
  //       padding-right: 8vw;
  //       img {
  //         width: 2.66vw;
  //         height: 4.66vw;
  //       }
  //     }
  //     span {
  //       padding-left: 26.33vw;
  //       line-height: 7vw;
  //     }
  //   }
  //   .content {
  //     color: #fff;
  //     font-size: 4.8vw;
  //     display: flex;
  //     align-items: center;
  //     justify-content: space-around;
  //     .photo {
  //       background: url("../../assets/imgs/order-icon.png");
  //       background-size: 100% 100%;
  //       width: 33.2vw;
  //       height: 21.3vw;
  //       // background: #fff;
  //       // border: 1px solid #e1e1e1
  //     }
  //   }
  // }
  .line {
    margin-bottom: 2vw;
  }
}

</style>
