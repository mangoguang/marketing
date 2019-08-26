<template>
  <div class="newCustomer">
    <my-banner :title="'新建'" />
    <!-- 客户类型选择 -->
    <ul class="customerSelect">
      <li
        v-for="(item, index) in btnlist"
        :key="`btns11${index}`"
        :class="{on: item.status}"
        @click="customerSelect(index)"
      >
      {{item.name}}
      <hr v-show="item.status">
      </li>
    </ul>
    <customer-search v-show="btnlist[0].status" />
    <visitor v-show="btnlist[1].status" :fromName='fromName'/>
  </div>
</template>


<script>
// import axios from "axios";
// import Vue from "vue";
// import VueRouter from "vue-router";
// import Vuex, { mapMutations, mapState } from "vuex";
import mango from "../../js";
import {mapState,mapMutations} from 'vuex'
import {btnList} from '../../utils/gallery'
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
      btnlist: '',
      fromName: ''
    };
  },
  //从新建回游客的时候初始化门店
  beforeRouteEnter(to,from,next) {
    next(vm => {
      vm.fromName = from.name
      if(from.name === '/NewCustomerInfo') {
        vm.initShop()
      }
    })
  },
  //去新建的时候初始化门店
  beforeRouteLeave(to,from,next) {
    if(to.name === '/NewCustomerInfo') {
        this.initShop()
      }
    next()
  },
  computed: {
    ...mapState({
      btn: state => state.chooseShop.btn,
      shopVal: state => state.chooseShop.shopVal
    })
  },
  created() {
    if(this.btn && this.btn.length) {
      this.btnlist = this.btn
    }else {
      this.btnlist = mango.btnList(['意向客户', '游客'], 0)
      this.setBtn(this.btnlist)
    }
  },
  mounted() {},
  methods: {
    ...mapMutations(['setBtn','initShopList','getShopVal']),
    customerSelect(index) {
      this.btnlist.forEach((element, i) => {
        element.status = index === i
      })
      this.setBtn(this.btnlist)
    },
    initShop() {
      let shops = JSON.parse(localStorage.getItem('shops'))
      let shopsList = btnList(shops,0)
      this.initShopList(shopsList)
      this.getShopVal()
      // console.log(123,this.shopVal)
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
      margin: 3vw 5vw;
      margin-bottom: 0.8vw;
    }
    li.on{
      // border-bottom: 2px solid $fontCol;
    }
  }
   hr {
      border: none;
      border-top: 0.8vw solid #363636;
      border-radius: 1vw;
      margin: 0;
      // width: 5vw;
      // text-align: center;
    }
}
</style>
