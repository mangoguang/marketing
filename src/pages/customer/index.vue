<template>
  <div class="customer">
    <!-- 头部 -->
    <Header @changeResultTit='changHead'>
      <span v-show="headerStatus[1].status">{{orderResultTit}}</span>
      <span v-show="headerStatus[2].status">{{dealResultTit}}</span>
    </Header>
    <!-- 客户列表 -->
    <CustomerList v-show="headerStatus[0].status" class="CustomerList1"/>
    <EnquiryOrder @changeResultTit="changeOrderResultTit" v-show=" headerStatus[1].status" class="CustomerList"/>
    <DealCustomerList @changeResultTit="changeDealResultTit" v-show=" headerStatus[2].status" class="CustomerList"/>
    <!-- 右侧边栏 -->
    <RightContainer/>
    <RightTimeSelect v-show='rightTimeSelect'/>
    <Footer/>
  </div>
</template>


<script>
import axios from "axios";
import Vue from "vue";
import VueRouter from "vue-router";
import Vuex, { mapMutations, mapState } from "vuex";
import { IndexModel } from "../../Request/Customer";
const indexModel = new IndexModel();
// 组件
import Footer from "../../components/Footer";
import Header from "../../components/customer/header";
import CustomerList from "../../components/customer/customerList";
import DealCustomerList from "../../components/customer/dealCustomer/dealCustomerList";
import EnquiryOrder from "../../components/customer/enquiryOrder/enquiryOrder";
import RightContainer from "../../components/customer/rightContainer";
import RightTimeSelect from "../../components/customer/rightTimeSelect";
import mango from "../../js";
import {checkLogin} from '../../utils/token/toLogin'

export default {
  components: {
    Footer,
    Header,
    CustomerList,
    RightContainer,
    DealCustomerList,
    EnquiryOrder,
    RightTimeSelect
  },
  data() {
    return {
      orderResultTit: "",
      dealResultTit:''
    };
  },
  computed: {
    ...mapState({
      headerStatus: state => state.customerHeader.headerStatus,
      rightTimeSelect: state => state.rightContainer.rightTimeSelect
    })
  },
  created() {
    checkLogin()
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      let ajaxData = localStorage.getItem("ajaxData");
      // console.log(Date.parse(new Date()) - timeLong)
      if (!ajaxData) {
        this.$router.replace({ path: "./Login" })
        return
      } else {
        let timeLong = JSON.parse(ajaxData).timestamp;
        timeLong = Date.parse(new Date()) - JSON.parse(ajaxData).timestamp;
        timeLong = timeLong / (60 * 60 * 24 * 1000);
        if (timeLong > 10) {
          this.$router.replace({ path: "./Login" });
          return;
        }
      }
    },
    searchCustomer(key) {
      // console.log("搜索关键字；", key);
    },
    changeOrderResultTit(str) {
      this.orderResultTit = str;
    },
    changeDealResultTit(str) {
      this.dealResultTit = str;
    },
    //头部搜索改变slot的值
    changHead(val) {
      if(this.headerStatus[1].status) {
        this.orderResultTit = val
      }else if(this.headerStatus[2].status){
        this.dealResultTit = val
      }
    }
  }
};
</script>

<style lang="scss">
.customer {
  position: relative;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  // overflow: scroll;
  background-color: #f8f8f8;
  overflow: hidden;
  .CustomerList1 {
    margin-top: 19vw;
  }
  .CustomerList {
   // margin-top: 22vw;
   margin-top:19vw;
  }
}
</style>
