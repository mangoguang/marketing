<!-- <keep-alive> -->
<template>
  <ul
    ref="customer"
    class="customerList"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10">
    <li
    class="customerContent"
    v-for="(item, index) in customerList.records"
    :key="`customerList${index}`"
    @click="toCustomerInfo(item.id)">
      {{item.name}}
      <ul>
        <li>
          <div :class="`urgence${item.urgency}`"></div>
          <strong>{{item.username}}<i :class="`important${item.important}`"></i></strong>
          <span>{{item.followTime}}</span>
        </li>
        <li>{{item.intention}}</li>
        <li>{{item.probability}}</li>
      </ul>
    </li>
    <li><button @click="newCustomer" class="new"></button></li>
  </ul>
  <!-- <ul class="customerList">
    <li class="customerContent" v-for="(customer, index) in customerMsg" :key="`customer${index}`">
      <ul>
        <li>
          <div></div>
          <strong>{{customer.name}}<i></i></strong>
          <span>{{customer.time}}</span>
        </li>
        <li>{{customer.classify}}</li>
        <li>{{customer.percent}}</li>
      </ul>
    </li>
  </ul> -->
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import { InfiniteScroll } from 'mint-ui'
import Vuex, { mapMutations, mapState } from "vuex";
Vue.use(InfiniteScroll)
Vue.use(Vuex)
import mango from '../../js'
export default {
  name: 'customerList',
  props:[],
  data () {
    return {
      
    }
  },
  computed: {
    ...mapState({
      // citySelect: state => state.select.citySelect,
      customerList: state => state.customer.customerList,
      headerStatus: state => state.customerHeader.headerStatus,
      customerScroll: state => state.customerScroll.customerScroll
    })
  },
  watch: {
    headerStatus() {
      if (this.headerStatus[0].status) {
        this.$refs.customer.addEventListener('scroll', this.handleScroll,true)
        this.$refs.customer.scrollTo(0, this.customerScroll)
      }
    }
  },
  mounted() {
    this.$refs.customer.addEventListener('scroll', this.handleScroll,true)
    this.$refs.customer.scrollTo(0, this.customerScroll)
    //////数据请求要放在这里后
  },
  methods:{
    ...mapMutations(["setCustomerScroll"]),
    handleScroll(e) {
      let top = e.target.scrollTop
      this.setCustomerScroll(top)
    },
    loadMore() {
      // mango.loading('open')
      // setTimeout(() => {
      //   // let last = this.customerList[this.customerList.length - 1]
      //   // for (let i = 1; i <= 10; i++) {
      //   //   this.customerList.push(last + i)
      //   // }
      //   // mango.loading('close')
      // }, 2500)
    },
    toCustomerInfo(id) {
      this.$router.push(`/customerInfo/${id}`)
    },
    newCustomer() {
      this.$router.push({path: './newCustomer'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../main.scss';

</style>