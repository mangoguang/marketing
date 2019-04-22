<template>
  <div class="orderSearch">
    <div class="orderSearchHeader">
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
      <InfoHeader
      @select="select"
      :count="orderData.total" />
      <TopBar :topBarTitle="topbar" />
    </div>
    <!-- 订单列表 -->
    <order-list></order-list>
    <!-- <EnquiryOrder @changeResultTit="changeOrderResultTit" class="CustomerList"/> -->
    <OrderSearchRightContainer />
  </div>
</template>


<script>
import Vuex, { mapMutations, mapState, mapGetters } from "vuex";
import EnquiryOrder from "../../components/customer/enquiryOrder/enquiryOrder";
import myBanner from '../../components/banner'
import InfoHeader from '../../components/work/orderSearch/infoHeader'
import OrderList from '../../components/work/orderSearch/orderList'
import TopBar from "../../components/customer/topBar";
import OrderSearchRightContainer from '../../components/work/orderSearchRightContainer'
import { Loadmore } from "mint-ui";
import mango from "../../js";
export default {
  components: {
    EnquiryOrder,
    myBanner,
    InfoHeader,
    OrderList,
    TopBar,
    OrderSearchRightContainer
  },
  props: ['myStyle'],
  data() {
    return {
      searchKey: '',
      topbar: {
        leftTitle: "客户信息",
        centerTitle: "订单交期",
        rightTitle: "订单状态"
      }
    };
  },
  computed: {
    ...mapState({
      orderData: state => state.work.orderData,
      orderSearchParam: state => state.work.orderSearchParam,
      rightContainerStatus: state => state.rightContainer.rightContainerStatus
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
      "setOrderData",
      'setOrderSearchParam',
      'setRightContainerStatus'
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
      let params = {
        key: str,
        page: 1,
        limit: 30
      }
      this.setOrderSearchParam(params)
      this.getOrderData(params)
    },
    inputChange(event) {
      let val = event.target.value
      val = val.replace(/\s+/g, "")
      if (val === '') {
        let params = {
          page: 1,
          limit: 30
        }
        this.setOrderSearchParam(params)
        this.getOrderData(params)
      }
    },
    getOrderData(obj) {
      mango.getAjax("/v3/app/order/list", obj).then(res => {
        res = res.data
        if (res) {
          console.log('请求 的订单', res.records)
          this.setOrderData(res)
        }
      })
    },
    select() {
      this.setRightContainerStatus(true)
    }
  }
};
</script>

<style lang="scss">
.orderSearch {
  position: relative;
  width: 100vw;
  box-sizing: border-box;
  background-color: #fff;
  overflow: hidden;
  margin-top: -5.86vw;
  .orderSearchHeader{
    position: fixed;
    z-index: 99;
    padding-top: 21.466vw;
    width: 100vw;
    background: #fff;
    .infoHeader{
      padding: 4vw 4.8vw;
    }
    .topBar{
      position: relative;
      margin-top: 0;
    }
  }
  div.CustomerList{
    margin-top: 14.81vw;
    padding-top: 1px;
  }
  .searchForm{
    width: 100vw;
    background: #fff;
    padding-top: 4vw;
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
