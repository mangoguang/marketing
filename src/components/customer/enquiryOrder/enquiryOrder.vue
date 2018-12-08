<template>
  <div class="enquiryOrder">
    <ul>
      <li>111</li>
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
    return {};
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
  methods: {
    getOrderList() {  
      mango.getAjax(this,"customerinfo",{customerId: this.dealCustomerList.records[index].customerId},"v2")
        .then(res => {
          if (res) {
            this.setDealOrderInfoDetails(res.data);
            console.log(1)
          }
        });
      this.$router.push({ path: "/dealDetails" });
    
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
