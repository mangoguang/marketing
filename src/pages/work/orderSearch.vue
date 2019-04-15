<template>
  <div class="orderSearch">
    <my-banner :title="'订单查询'" />
    <form class="searchForm" action='' @submit.prevent>
      <input ref="inpComp" class="input"
          v-model="searchKey" 
          type="search" 
          placeholder="请输入姓名或电话"
          @keyup.enter="search">
    <!-- <button @click="searchCustomer">搜索</button> -->
    </form>
    <!-- 订单列表 -->
    <EnquiryOrder @changeResultTit="changeOrderResultTit" class="CustomerList"/>
  </div>
</template>


<script>
import Vuex, { mapMutations } from "vuex";
import EnquiryOrder from "../../components/customer/enquiryOrder/enquiryOrder";
import myBanner from '../../components/banner'
import mango from "../../js";
export default {
  components: {
    EnquiryOrder,
    myBanner
  },
  data() {
    return {
      searchKey: ''
    };
  },
  computed: {

  },
  created() {
    this.checkLogin();
  },
  methods: {
    ...mapMutations([
      "setOrderList"
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
      console.log('搜索订单')
      let params = {
        key: this.searchKey,
        page: 1,
        limit: 30,
        type: "Approved"
      }
      mango.getAjax("/v3/app/customer/list", params).then(res => {
        res = res.data
        if (res) {
          console.log('请求 的订单', res.records)
          this.setOrderList(res)
        }
      })
    }
  }
};
</script>

<style lang="scss">
.orderSearch {
  position: relative;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  // overflow: scroll;
  background-color: #fff;
  overflow: hidden;
  div.CustomerList{
    margin-top: 14.81vw;
    padding-top: 1px;
  }
  .searchForm{
    padding-top: 21.466vw;
    input{
      display: block;
      width: 80vw;
      height: 8vw;
      margin: 0 auto;
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
