<template>
  <div class="orderSearch">
    <my-banner :title="'订单查询'" />
    <form class="searchForm" action='' @submit.prevent>
      <input ref="inpComp" class="input"
          v-model="searchKey" 
          type="search" 
          placeholder="请输入姓名或电话"
          @change="inputChange"
          @keyup.enter="search">
    <!-- <button @click="searchCustomer">搜索</button> -->
    </form>
    <div class="orderContainer">
      <InfoHeader
      @select="select"
      :count="orderData.total" />
      <!-- 订单列表 -->
      <order-list></order-list>
    </div>
    <!-- <EnquiryOrder @changeResultTit="changeOrderResultTit" class="CustomerList"/> -->
  </div>
</template>


<script>
import Vuex, { mapMutations, mapState, mapGetters } from "vuex";
import EnquiryOrder from "../../components/customer/enquiryOrder/enquiryOrder";
import myBanner from '../../components/banner'
import InfoHeader from '../../components/work/orderSearch/infoHeader'
import OrderList from '../../components/work/orderSearch/orderList'
import { Loadmore } from "mint-ui";
import mango from "../../js";
export default {
  components: {
    EnquiryOrder,
    myBanner,
    InfoHeader,
    OrderList
  },
  props: ['myStyle'],
  data() {
    return {
      searchKey: ''
    };
  },
  computed: {
    ...mapState({
      orderData: state => state.work.orderData
    })
  },
  created() {
    this.checkLogin();
  },
  mounted() {
    this.setOrderData([])

  },
  methods: {
    ...mapMutations([
      "setOrderData"
    ]),
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
    changeOrderResultTit(str) {
      this.orderResultTit = str;
    },
    search() {
      let str = this.searchKey.replace(/\s+/g, "")
      console.log(111, str)
      let params = {
        key: str,
        page: 1,
        limit: 30
      }
      mango.getAjax("/v3/app/order/list", params).then(res => {
        res = res.data
        if (res) {
          console.log('请求 的订单', res.records)
          this.setOrderData(res)
        }
      })
    },
    inputChange(event) {
      console.log('inputchange:', event.target.value)
    },
    select() {
      alert('success')
    }
  }
};
</script>

<style lang="scss">
.orderSearch {
  position: relative;
  // height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  // overflow: scroll;
  background-color: #fff;
  overflow: hidden;
  .orderContainer{
    // height: 100vh;
    margin-top: 48vw;
    .infoHeader{
      position: fixed;
      width: 100%;
      box-sizing: border-box;
      top: 35.466vw;
      left: 0;
    }
  }
  div.CustomerList{
    margin-top: 14.81vw;
    padding-top: 1px;
  }
  .searchForm{
    position: fixed;
    width: 100vw;
    top: 0;
    left: 0;
    padding-top: 25.466vw;
    padding-bottom: 2vw;
    background: #fff;
    input{
      display: block;
      width: 80vw;
      height: 8vw;
      margin-left: 10vw;
      background: url('../../assets/imgs/egg_search.png') no-repeat, #f7f7f7;
      background-size: 4vw 4vw;
      background-position: 4vw center;
      border-radius: 4vw;
      box-shadow: border-box;
      padding-left: 10vw;
      color: #999;
    }
  }
}
</style>
