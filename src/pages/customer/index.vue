<template>
  <div class="customer">
    <!-- 头部 -->
    <Header>
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
    this.checkLogin();
    // this.test()
  },
  methods: {
    test() {
      let obj = {
          type: 'New',   //New:意向客户，Approved：成交客户，Closed：战败客户
          key:'',     //搜索关键字，电话或名字
          sort:'',      //u：紧急排序，l：意向分类排序
          sd: '2018-11-12',          //跟进日期
          ed: '2018-11-26',
          u: '' ,    //1：紧急，0不紧急
          l:'',     //
          page: 1,   //页数
          limit: 10    //每页条数
      }
      indexModel.getCustomerList(obj).then(res => {
        console.log(res)
      })
    },
    checkLogin() {
      let ajaxData = localStorage.getItem("ajaxData");
      // console.log(Date.parse(new Date()) - timeLong)
      if (!ajaxData) {
        this.$router.push({ path: "./Login" })
        return
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
      // console.log("搜索关键字；", key);
    },
    changeOrderResultTit(str) {
      this.orderResultTit = str;
    },
    changeDealResultTit(str) {
      this.dealResultTit = str;
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
    margin-top: 22vw;
  }
}
</style>
