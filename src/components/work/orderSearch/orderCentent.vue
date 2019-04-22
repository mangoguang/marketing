<template>
  <ul class="orderCentent">
    <Loadmore
    :bottom-method="loadBottom"
    :bottom-all-loaded="allLoaded"
    ref="loadmore"
    :auto-fill="false">
      <li
      is="orderLi"
      v-for="(item, index) in orderList"
      :key="`orderList${index}`"
      @click.native="toOrderDetail(item.orderId)"
      :obj="item"></li>
    </Loadmore>
  </ul>
</template>

<script>
import Vuex, { mapMutations, mapGetters } from "vuex";
import { Loadmore } from "mint-ui";
import TopBar from "../../customer/topBar";
import orderLi from "./orderLi";
import { IndexModel } from "../../../utils/"
const indexModel = new IndexModel()
export default {
  name: 'orderCentent',
  props: [],
  components: {
    Loadmore,
    orderLi
  },
  data() {
    return {
      topbar: {
        leftTitle: "客户信息",
        centerTitle: "订单交期",
        rightTitle: "订单状态"
      },
      allLoaded: false
    }
  },
  computed: {
    ...mapGetters(['orderList'])
  },
  mounted() {
    console.log(this)
    this.getOrderList({
      page: 1,
      limit: 30
      // key: ''   //电话或姓名
      // startTime: '2018-11-12',      //交期时间（需求时间）
      // endTime: '2018-11-26'
    })
  },
  methods: {
    ...mapMutations([
      "setOrderData"
    ]),
    getOrderList(obj) {
      indexModel.getOrderList(obj).then((res) => {
        res = res.data
        if (res) {
          this.setOrderData(res)
        }
      })
    },
    //下拉刷新
    loadBottom() {
      this.$refs.loadmore.onBottomLoaded();
      // if (!this.isSelectStatus) {
      //   this.pullDownData();
      // } else {
      //   this.pullDownData(
      //     this.customerTime.startTime,
      //     this.customerTime.endTime
      //   );
      // }
    },
    toOrderDetail(orderId) {
      this.$router.push({path: `/orderDetail/${orderId}`})
    }
  }
}
</script>

<style lang="scss" scoped>
  .orderCentent{
    padding: 0 4.8vw 10.8vw 4.8vw;
  }
</style>

