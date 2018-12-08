<template>
  <div class="enquiryOrder">
    <ul>
      <li
        v-for="(item, index) in list"
        :key="`list${index}`"
        @click="orderInfoIn(index)">
        <span>{{index + 1}}</span>
        <span>{{item.username}}</span>
        <span>需求{{item.demandTime}}</span>
        <span>{{item.orderStatus}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import VueRouter from "vue-router";
import Vuex, { mapMutations, mapState } from "vuex";
import mango from "../../../js";

export default {
  data() {
    return {
      list:[
        {username:'章三',demandTime:'2018-10-10',orderStatus:'提交至经销商'},
        {username:'李四',demandTime:'2019-10-01',orderStatus:'已取消'},
        {username:'王五',demandTime:'2018-11-11',orderStatus:'已交易'}
      ],
      account:'',
      ajaxData:[]
    };
  },
  computed: {
    ...mapState({
      dealCustomerList: state => state.dealCustomerList.dealCustomerList,
      headerStatus: state => state.customerHeader.headerStatus
    })
  },
  watch: {
    //根据头部状态获取数据
    headerStatus() {
      if (this.headerStatus[1].status) {
        console.log(1, "true");
      }
    }
  },
  created() {
    //获取本地缓存信息
    let ajaxData = localStorage.getItem("ajaxData");
    this.ajaxData = JSON.parse(ajaxData);
    let account = localStorage.getItem("accountMsg");
    this.account = JSON.parse(account).name.trim();
  },
  methods: {
    getOrderList() {  
      mango.getAjax(this,"order",{
        account: this.account,
        page: 1,
        limit: 10,
        key: ""
      },"v2")
        .then(res => {
          if (res) {
            // this.setDealOrderInfoDetails(res.data);
            console.log(1)
          }
        });
    
    },
    orderInfoIn(index) {
      this.$router.push({ path: "/enquiryInfo" });
    }
  }
};
</script>

<style lang="scss" scoped>
.enquiryOrder{
  padding-top: 23vw;
  background: #f8f8f8;
  ul {
    border-top: 1px solid #e1e1e1;
    padding-left: 4.266vw;
    color: #999;
    font-size: 4.26vw;
    line-height: 11.73vw;
    padding-bottom: 19vw;
    li {
      display: flex;
      justify-content: space-between;
      padding-right: 3.86vw;
      border-top: 1px solid #e1e1e1;
      span:nth-child(1) {
        flex: 0.1;
      }
      span:nth-child(2) {
        color: #363636;
        flex: 0.2;
      }
      span:nth-child(3) {
        flex: 0.4;
      }
      span:nth-child(4) {
        flex: 0.4;
        color: #363636;
        text-align: right;
      }
    }
    li:nth-child(1) {
      border-top: none;
    }
    li:last-child {
      border-bottom: 1px solid #e1e1e1;
    }
  }
}
</style>
