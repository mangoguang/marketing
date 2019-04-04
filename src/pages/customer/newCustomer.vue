<template>
  <div class="newCustomer">
    <my-banner :title="'新建'" />
    <!-- 客户类型选择 -->
    <ul class="customerSelect">
      <li
        v-for="(item, index) in btns"
        :key="`btns11${index}`"
        :class="{on: item.status}"
        @click="customerSelect(index)"
      >{{item.name}}</li>
    </ul>
    <customer-search v-show="btns[0].status" />
    <visitor v-show="btns[1].status" />
  </div>
</template>


<script>
// import axios from "axios";
// import Vue from "vue";
// import VueRouter from "vue-router";
// import Vuex, { mapMutations, mapState } from "vuex";
import mango from "../../js";

// 组件
import myBanner from '../../components/banner'
import customerSearch from '../../components/customer/newCustomer/customerSearch'
import visitor from '../../components/customer/newCustomer/visitor'


// import RightContainer from "../../components/customer/rightContainer";

export default {
  name: 'newCustomer',
  components: {
    myBanner,
    customerSearch,
    visitor
  },
  data() {
    return {
      btns: mango.btnList(['意向客户', '游客'], 0)
    };
  },
  computed: {

  },
  created() {
    console.log(this.btns)
  },
  mounted() {},
  methods: {
    customerSelect(index) {
      this.btns.forEach((element, i) => {
        element.status = index === i
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/common.scss";
.newCustomer{
  height: 100vh;
  box-sizing: border-box;
  padding-top: 16vw;
  background: #f8f8f8;
  ul.customerSelect{
    display: flex;
    justify-content: center;
    background: #fff;
    li{
      height: 6vw;
      font-size: 16px;
      line-height: 6vw;
      color: $fontCol;
      margin: 2vw 5vw;
    }
    li.on{
      border-bottom: 2px solid $fontCol;
    }
  }
}
</style>
