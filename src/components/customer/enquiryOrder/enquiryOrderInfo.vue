<template>
  <div class="enquiryOrderInfo">
    <div class="address-icon"></div>
    <div class="address">
      <ul>
        <li>
          收货人：{{ orderInfoDetails.username }}
          <span>{{ orderInfoDetails.phone }}</span>
          <div class="phone"></div>
        </li>
        <li>收获地址：{{ orderInfoDetails.address }}</li>
        <li>需求日期：{{ orderInfoDetails.demandTime }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueRouter from "vue-router";
import Vuex, { mapMutations, mapState } from "vuex";
import mango from "../../../js";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      orderInfoDetails: state => state.orderInfoDetails.orderInfoDetails      
    })
  }
};
</script>

<style lang="scss" scoped>
.enquiryOrderInfo {
  background: #fff;
  display: flex;
  align-items: center;
  padding: 5.46vw 0;
  font-size: 3.73vw;
  color: #363636;
  // justify-content: space-between;
  .address-icon {
    background: url("../../../assets/imgs/address.png") no-repeat center;
    background-size: 100% 100%;
    width: 6.46vw;
    height: 6.53vw;
    margin-left: 4.13vw;
    margin-right: 5.06vw;
  }
  span {
    color: #999;
    margin-left: 6.66vw;
  }
  li:nth-child(1) {
    display: flex;
    align-items: center;
  }
  .phone {
    background: url("../../../assets/imgs/phone.png") no-repeat center;
    background-size: 100% 100%;
    width: 3.06vw;
    height: 3.06vw;
    margin-left: 1vw;
  }
}
</style>
