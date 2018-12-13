<template>
  <div class="customer" ref="scroll">
    <!-- 头部 -->
    <Header @changeResultTit="changeResultTit">{{resultTit}}</Header>
    <!-- 客户列表 -->
    <CustomerList v-show="headerStatus[0].status"/>
    <EnquiryOrder @changeResultTit="changeResultTit" v-show=" headerStatus[1].status"/>
    <DealCustomerList @changeResultTit="changeResultTit" v-show=" headerStatus[2].status"/>
    <!-- 右侧边栏 -->
    <RightContainer/>
    <Footer/>
  </div>
</template>


<script>
import axios from "axios";
import Vue from "vue";
import VueRouter from "vue-router";
import Vuex, { mapMutations, mapState } from "vuex";

// 组件
import Footer from "../../components/Footer";
import Header from "../../components/customer/header";
import CustomerList from "../../components/customer/customerList";
import DealCustomerList from "../../components/customer/dealCustomer/dealCustomerList";
import EnquiryOrder from "../../components/customer/enquiryOrder/enquiryOrder";

import RightContainer from "../../components/customer/rightContainer";
import mango from "../../js";

export default {
  components: {
    Footer,
    Header,
    CustomerList,
    RightContainer,
    DealCustomerList,
    EnquiryOrder
  },
  data() {
    return {
      resultTit: ""
    };
  },
  computed: {
    ...mapState({
      headerStatus: state => state.customerHeader.headerStatus
    })
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      let ajaxData = localStorage.getItem("ajaxData");
      // console.log(Date.parse(new Date()) - timeLong)
      if (!ajaxData) {
        this.$router.push({ path: "./Login" });
        return;
      } else {
        let timeLong = JSON.parse(ajaxData).timestamp;
        timeLong = Date.parse(new Date()) - JSON.parse(ajaxData).timestamp;
        timeLong = timeLong / (60 * 60 * 24 * 1000);
        if (timeLong > 10) {
          this.$router.push({ path: "./Login" });
          return;
        }
      }
    },
    searchCustomer(key) {
      console.log("搜索关键字；", key);
    },
    changeResultTit(str) {
      this.resultTit = str;
    }
  }
};
</script>

<style lang="scss">
.customer {
  position: relative;
  // height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  // overflow: scroll;
  background-color: #f8f8f8;
}
</style>
