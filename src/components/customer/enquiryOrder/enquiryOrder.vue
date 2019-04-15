<template>
  <div class="enquiryOrder" ref="order">
    <TopBar :topBarTitle="topbar"/>
    <ul>
      <mt-loadmore
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        ref="loadmore"
        :auto-fill="false"
      >
        <li
          :class="{active : compareTime[index]}"
          v-for="(item, index) in orderList.records"
          :key="`list${index}`"
          @click="orderInfoIn(index)"
        >
          <div class="name">
            <i :class="`important${item.level}`"></i>
            <span
              :class="{active : compareTime[index]}"
            >{{`*${item.username ? item.username.slice(1, 10) : ''}`}}</span>
            <strong :class="`urgency${item.urgency}`"></strong>
          </div>
          <span class="phone">{{item.phone}}</span>
          <span class="date" :class="{active : compareTime[index]}">{{item.followDate}}</span>
        </li>
      </mt-loadmore>
    </ul>
  </div>
</template>

<script>
import { deepclone } from "../../../utils/customer";
import Vue from "vue";
import VueRouter from "vue-router";
import Vuex, { mapMutations, mapState } from "vuex";
import TopBar from "../topBar";
import mango from "../../../js";
import dealOrderInfoDetails from "../../../store/modules/components/dealOrderInfoDetails";
import { Loadmore } from "mint-ui";
Vue.component(Loadmore.name, Loadmore);

export default {
  name: "enquiryOrder",
  components: { TopBar },
  props: ["changeResultTit"],
  data() {
    return {
      account: "",
      ajaxData: [],
      dealCusList: [],
      addPullData: [],
      page: 3,
      limit: 10,
      allPage: "",
      baceLimit: 30,
      allLoaded: false,
      id: "",
      compareTime: [],
      activecolor: [],
      topbar: {
        leftTitle: "客户信息",
        centerTitle: "电话",
        rightTitle: "最近跟进"
      },
      parmas: {}
    };
  },
  computed: {
    ...mapState({
      orderList: state => state.orderList.orderList,
      headerStatus: state => state.customerHeader.headerStatus,
      orderInfoDetails: state => state.orderInfoDetails.orderInfoDetails,
      orderScroll: state => state.customerScroll.orderScroll,
      customerTime: state => state.rightContainer.customerTime,
      isSelectStatus: state => state.rightContainer.isSelectStatus,
      orderTotalPrice: state => state.orderInfoDetails.orderTotalPrice,
      orderDiscountPrice: state => state.orderInfoDetails.orderDiscountPrice,
      customerAjaxParams: state => state.customer.customerAjaxParams
    })
  },
  watch: {
    //根据头部状态获取数据
    headerStatus() {
      if (this.headerStatus[1].status) {
        if (this.orderScroll == 0) {
          if (this.isSelectStatus) {
            this.loadSelectData(this.customerTime);
          } else {
            this.loadData();
          }
        }
        this.$refs.order.addEventListener("scroll", this.handleScroll, true);
        this.$refs.order.scrollTop = this.orderScroll;
      }
    },
    //根据加载的limit改变颜色
    baceLimit() {
      this.isExpire(this.baceLimit);
    },
    //根据筛选时间变化改变列表
    customerTime() {
      this.setIsSelectStatus(true);
      //每次改变初始化
      this.initData();
      this.loadSelectData(this.customerTime);
      if (this.customerTime.startTime === "") {
        this.setIsSelectStatus(false);
        this.loadData();
      }
    }
  },
  mounted() {
    this.$refs.order.addEventListener("scroll", this.handleScroll, true);
    this.$refs.order.scrollTop = this.orderScroll;
  },
  created() {
    //获取本地缓存信息
    // let ajaxData = localStorage.getItem("ajaxData");
    // this.ajaxData = JSON.parse(ajaxData);
    // this.account = this.ajaxData.account
    this.parmas = deepclone(this.customerAjaxParams, this.parmas);
    this.parmas.type = "Approved";
    if (!this.isSelectStatus) {
      this.loadData();
    } else {
      this.loadSelectData(this.customerTime);
    }
  },
  methods: {
    initData() {
      this.baceLimit = 30;
      this.setOrderScroll(0);
      this.$refs.order.scrollTop = this.orderScroll;
      localStorage.removeItem("selectLimit");
      localStorage.removeItem("limit");
      this.getSelectLimit();
    },
    //获取滚动条
    handleScroll(e) {
      let top = e.target.scrollTop;
      this.setOrderScroll(top);
    },
    //需求日期是否到期
    isExpire(len) {
      if (this.orderList.records) {
        let temp = this.orderList.records;
        let today = new Date();
        for (var i = 0; i < len; i++) {
          if (temp[i]) {
            let isActive = mango.compareTimeStamp(temp[i].demandTime, today); //t1<t2,true/actived
            if (temp[i].orderStatus === "关闭") {
            } else {
              this.$set(this.compareTime, i, isActive);
            }
          }
        }
      }
    },
    ...mapMutations([
      "setOrderList",
      "setOrderInfoDetails",
      "setOrderScroll",
      "setIsSelectStatus",
      "setOrderTotalPrice",
      "setOrderDiscountPrice"
    ]),
    //下拉刷新
    loadBottom() {
      this.$refs.loadmore.onBottomLoaded();
      if (!this.isSelectStatus) {
        this.pullDownData();
      } else {
        this.pullDownData(
          this.customerTime.startTime,
          this.customerTime.endTime
        );
      }
    },
    //获取数据
    getOrderList(page, limit, startTime, endTime) {
      this.parmas.page = page;
      this.parmas.limit = limit;
      this.parmas.sd = startTime;
      this.parmas.ed = endTime;
      console.log(this.parmas)
      mango.getAjax("/v3/app/customer/list", this.parmas).then(res => {
        if (res) {
          this.allLoaded = false;
          this.allPage = Math.ceil(res.data.total / 10);
          if (page <= 3) {
            this.setOrderList(res.data);
            this.dealCusList = this.orderList;
            this.$emit(
              "changeResultTit",
              `全部客户 (${
                this.orderList.total == null ? "0" : this.orderList.total
              })`
            );
          } else {
            //筛选和非筛选时候缓存的limit
            this.getDiffLimit();
            //上啦刷新加载数据
            this.addPullData = res.data;
            this.dealCusList.records = this.dealCusList.records.concat(
              this.addPullData.records
            );
            this.setOrderList(this.dealCusList);
          }
          this.isExpire(this.baceLimit);
        }
      });
    },
    //加载数据
    loadData() {
      this.getLimit();
      let tempage = (this.baceLimit - 30) / 10;
      this.page = 3 + tempage;
      this.getOrderList(1, this.baceLimit);
    },
    //加载筛选数据
    loadSelectData(time) {
      if (time.startTime) {
        this.getSelectLimit();
        let tempage = (this.baceLimit - 30) / 10;
        this.page = 3 + tempage;
        this.getOrderList(1, this.baceLimit, time.startTime, time.endTime);
      }
    },
    //下拉加载数据
    pullDownData(startTime, endTime) {
      if (this.page < this.allPage) {
        this.allLoaded = true;
        this.page++;
        this.getOrderList(this.page, this.limit, startTime, endTime);
      } else {
        this.allLoaded = true
        mango.tip("没有更多数据了");
      }
    },
    //判断是否订单筛选时间来获取不同的缓存limit
    getDiffLimit() {
      if (!this.isSelectStatus) {
        this.setLimit(this.baceLimit + 10);
        this.getLimit();
      } else {
        this.setSelectLimit(this.baceLimit + 10);
        this.getSelectLimit();
      }
    },
    setLimit(limit) {
      let string = `{"limit":" ${limit}"}`;
      localStorage.setItem("limit", string);
    },
    setSelectLimit(selectLimit) {
      let string = `{"selectLimit":" ${selectLimit}"}`;
      localStorage.setItem("selectLimit", string);
    },
    //获取本地数据
    getLimit() {
      let temp = localStorage.getItem("limit");
      if (temp) {
        this.baceLimit = parseInt(JSON.parse(temp).limit);
      } else {
        this.setLimit(this.baceLimit);
      }
    },
    //缓存筛选的limit
    getSelectLimit(time) {
      let temp = localStorage.getItem("selectLimit");
      if (temp) {
        this.baceLimit = parseInt(JSON.parse(temp).selectLimit);
      } else {
        this.setSelectLimit(this.baceLimit);
      }
    },
    // 计算总额和折扣金额
    calcPrice(list) {
      if (list.orderItemList) {
        let itemList = list.orderItemList;
        let priceArr = [];
        let total = 0;
        let discount = 0;
        itemList.forEach((item, index) => {
          total += item.price * item.quantity;
        });
        discount = total - list.totalAmount;
        this.setOrderTotalPrice(total);
        this.setOrderDiscountPrice(discount);
      }
    },
    //点击进入详情页面
    orderInfoIn(index) {
      mango
        .getAjax(
          this,
          "orderById",
          { orderId: this.orderList.records[index].orderId },
          "v2"
        )
        .then(res => {
          if (res) {
            this.setOrderInfoDetails(res.data);
            this.calcPrice(this.orderInfoDetails);
          }
        });
      this.$router.push({ path: "/enquiryInfo" });
    }
  }
};
</script>

<style lang="scss" scoped>
.enquiryOrder {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  padding-top: 33.92vw;
  background: #f8f8f8;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  .active {
    color: #ee0505 !important;
  }
  ul {
    // border-top: 1px solid #e1e1e1;
    color: #999;
    font-size: 4.26vw;
    line-height: 11.73vw;
    padding-bottom: 40vw;
    background: #f8f8f8;
    margin-top: -2vw;
    li {
      display: flex;
      justify-content: space-between;
      padding-right: 3.86vw;
      align-items: center;
      padding-left: 4.266vw;
      height: 17.33vw;
      margin-top: 1vw;
      background: #fff;
      // span:nth-child(1) {
      //   flex: 0.15;
      // }
      .name {
        color: #363636;
        flex: 0.4;
        display: flex;
        align-items: center;
        // justify-content: space-between;
        i {
          width: 10.6vw;
          height: 4vw;
          margin-right: -3vw;
        }
        .importantA {
          background: url(../../../assets/imgs/A.png) no-repeat;
          background-size: auto 100%;
          // background-position: center;
        }
        .importantB {
          background: url(../../../assets/imgs/B.png) no-repeat;
          background-size: auto 100%;
          // background-position: center;
        }
        .importantC {
          background: url(../../../assets/imgs/C.png) no-repeat;
          background-size: auto 100%;
          // background-position: center;
        }
        strong {
          height: 4vw;
          width: 3.73vw;
          margin-top: -7vw;
          margin-left: 1vw;
        }
        .urgencyfalse {
          // background: url(../../assets/imgs/jinji1.png) no-repeat;
          background-size: 100% 100%;
          // background-position: center;
        }
        .urgencytrue {
          background: url(../../../assets/imgs/jinji.png) no-repeat;
          background-size: 100% 100%;
          // background-position: center;
        }
      }
      .phone {
        flex: 0.4;
      }
      .date {
        flex: 0.4;
        color: #363636;
        text-align: right;
      }
    }
    li:nth-child(1) {
      border-top: none;
    }
    li:nth-last-child(2) {
      // border-bottom: 1px solid #e1e1e1;
    }
  }
}
</style>
