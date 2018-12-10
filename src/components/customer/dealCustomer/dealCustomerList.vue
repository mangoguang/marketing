<template>
  <div class="dealCustomer">
    <ul>
      <!-- <vuu-pull ref="vuuPull" :options="pullOptions" v-on:loadBottom="loadBottom"> -->
        <li
          v-for="(item, index) in dealCustomerList"
          :key="`customerList${index}`"
          @click="getDetails(index)"
        >
          <span>{{index + 1}}</span>
          <span>{{item.username}}</span>
          <span>{{item.sex == 0 ? '女' : '男'}}</span>
          <span>{{item.phone}}</span>
          <span>{{getLevel(item.level)}}</span>
        </li>
      <!-- </vuu-pull> -->
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import VueRouter from "vue-router";
import Vuex, { mapMutations, mapState } from "vuex";
import mango from "../../../js";
import vuuPull from "vuu-pull";
Vue.use(vuuPull);

export default {
  name: "dealCustomerList",
  props: ["changeResultTit"],
  data() {
    return {
      account: "",
      pullOptions: {
        isBottomRefresh: true,
        isTopRefresh: false
      },
      dealCusList: [],
      addPullData: [],
      page: 2,
      limit: 10,
      allPage: "",
      key: true
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
      if (this.headerStatus[2].status) {
        this.getData(1, 20);
      }
    }
  },
  created() {
    //获取本地缓存信息
    let ajaxData = localStorage.getItem("ajaxData");
    this.ajaxData = JSON.parse(ajaxData);
    let account = localStorage.getItem("accountMsg");
    this.account = JSON.parse(account).name.trim();
    //后退的时候重新请求数据
    if (this.headerStatus[2].status) {
      this.getData(1, 20);
    }
  },
  methods: {
    ...mapMutations(["setDealCustomerList", "setDealOrderInfoDetails","setTabStatus"]),
    //上啦刷新
    loadBottom() {
      // if (this.key) {
      //   setTimeout(() => {
      //     if (this.page < this.allPage) {
      //       this.page ++;
      //       this.getData(this.page, this.limit);
      //       if (this.$refs.vuuPull.closeLoadBottom) {
      //         this.$refs.vuuPull.closeLoadBottom();
      //       }
      //     } else {
      //       if (this.$refs.vuuPull.closeLoadBottom) {
      //         this.$refs.vuuPull.closeLoadBottom();
      //       }
      //     }
      //   }, 1500);
      // }
    },
    getData(page, limit) {
      this.key = false;
      mango.getAjax(this,"order",{
            account: this.account,
            page: 1,
            limit: 466,
            key: ""},"v2")
        .then(res => {
          //初始进来
          this.allPage = Math.ceil(res.data.total / 10);
          // if (page <= 2) {
            this.key = true;
            let result  = mango.getUniqueData(res.data.records)
            this.setDealCustomerList(result);
            this.dealCusList = this.dealCustomerList;
            this.$emit("changeResultTit",`全部客户 (${result.length == null? "0": result.length})`);
          // } else {
          //   //上啦刷新加载数据
          //   this.key = true;
          //   this.addPullData = res.data;
          //   this.dealCusList.records = this.dealCusList.records.concat(this.addPullData.records);
          //   this.setDealCustomerList(this.dealCusList);
          // }
        });
    },
    //获得个人评价等级
    getLevel(level) {
      if (level == 1) {
        return "高";
      } else if (level == 2) {
        return "中";
      } else if (level == 3) {
        return "低";
      } else {
        return null;
      }
    },
    //详细订单信息
    getDetails(index) {
      this.setTabStatus(mango.btnList(['订单信息', '跟踪记录', '个人评级'], 0))
      mango.getAjax(this,"customerinfo",{customerId: this.dealCusList[index].customerId},"v2")
        .then(res => {
          if (res) {
            this.setDealOrderInfoDetails(res.data);
          }
        });
      this.$router.push({ path: "/dealDetails" });
    }
  }
};
</script>


<style lang="scss" scoped>
.dealCustomer {
  padding-top: 23vw;
  background: #f8f8f8;
  ul {
    border-top: 1px solid #e1e1e1;
    // border-bottom: 1px solid #e1e1e1;
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
      span:nth-child(2) {
        color: #363636;
        flex: 0.3;
      }
      span:nth-child(5) {
        color: #363636;
        flex: 0.05;
      }
      span:nth-child(3) {
        flex: 0.2;
      }
      span:nth-child(4) {
        flex: 0.5;
      }
      span:nth-child(1) {
        flex: 0.15;
      }
    }
    li:nth-child(1) {
      border-top: none;
    }
    li:last-child {
      border-bottom: 1px solid #e1e1e1;
      // margin-bottom: 3vw;
    }
  }
}
</style>

