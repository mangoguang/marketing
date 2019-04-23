<template>
  <div class="orderList">
    <!-- <TopBar :topBarTitle="topbar" /> -->
    <OrderCentent
    :list="orderArr" />
  </div>
</template>

<script>
import TopBar from "../../customer/topBar";
import OrderCentent from "./orderCentent";
export default {
  name: 'orderList',
  props: [],
  components: {
    TopBar,
    OrderCentent
  },
  data() {
    return {
      topbar: {
        leftTitle: "客户信息",
        centerTitle: "订单交期",
        rightTitle: "订单状态"
      },
      orderArr: []
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .orderList{
    .topBar{
      top: 41.466vw;
      margin: 0;
    }
    .listHeader{
      display: flex;
      justify-content: space-around;
    }
  }
</style>

