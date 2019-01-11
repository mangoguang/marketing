<!-- <keep-alive> -->
<template>
    <ul
      ref="customer"
      class="customerList">
      <TopBar :topBarTitle='topbar'/>
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false" >
        <li
          class="customerContent"
          v-for="(item, index) in customerList.records"
          :key="`customerList${index}`"
          @click="toCustomerInfo(item.id)">
            {{item.name}}
            <ul>
              <li class="iconTips">
                <!-- <div>1</div>
                <div>2</div>
                <div>2</div> -->
                <strong>{{item.username}}</strong>
                <i :class="`important${item.important}`"></i>
                <div :class="`urgency${item.urgency}`"></div>
              </li>
              <li >
                <span class="intention">{{item.intention}}</span>
                <span>{{item.followTime}}</span>
              </li>
              <li>{{item.probability}}</li>
            </ul>
          </li>
          <li><button @click="newCustomer" class="new"></button></li>
      </mt-loadmore>
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
import { Loadmore } from 'mint-ui'
import TopBar from './topBar'

Vue.component(Loadmore.name, Loadmore)
import Vuex, { mapMutations, mapState } from "vuex"
Vue.use(Vuex)
import mango from '../../js'
export default {
  components:{TopBar},
  name: 'customerList',
  props:[],
  data () {
    return {
      topbar:{
        leftTitle: '客户信息',
        centerTitle: '需求信息',
        rightTitle: '成交概率'
      }
    }
  },
  computed: {
    ...mapState({
      // citySelect: state => state.select.citySelect,
      customerAjaxParams: state => state.customer.customerAjaxParams,
      customerList: state => state.customer.customerList,
      headerStatus: state => state.customerHeader.headerStatus,
      customerScroll: state => state.customerScroll.customerScroll,
      allLoaded: state => state.customer.allLoaded
    })
  },
  watch: {
    headerStatus() {
      if (this.headerStatus[0].status) {
        this.$refs.customer.addEventListener('scroll', this.handleScroll,true)
        this.$refs.customer.scrollTop = this.customerScroll
      }
    }
  },
  created() {
    // 获取本地存储信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
  },
  mounted() {
    this.$refs.customer.addEventListener('scroll', this.handleScroll,true)
    this.$refs.customer.scrollTop = this.customerScroll
    //////数据请求要放在这里后
  },
  methods:{
    ...mapMutations([
      'setCustomerAjaxParams', 
      "setCustomerScroll", 
      "setCustomerTabStatus",
      "setCustomerList",
      "setAllLoaded"
    ]),
    handleScroll(e) {
      let top = e.target.scrollTop
      this.setCustomerScroll(top)
    },
    loadBottom() {
      console.log('接口参数：', this.customerAjaxParams, this.customerList)
      this.customerAjaxParams.page++
      mango.getAjax(this, 'customer', this.customerAjaxParams, 'v2').then((res) => {
        this.$refs.loadmore.onBottomLoaded()
        res = res.data
        if (res) {
          if (res.records) {
            if (res.records.length < 50) {
              this.setAllLoaded(true)
            }
            this.customerList.records = this.customerList.records.concat(res.records)
            this.setCustomerList(this.customerList)
          } else {
              this.setAllLoaded(true)
          }
        }
      })
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
      this.setCustomerTabStatus(mango.btnList(['客户描述', '需求信息'], 0))
      // this.setCustomerTabStatus(mango.btnList(['客户描述', '新建需求', '需求信息'], 0))
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
.customerList{
  position: relative;
}
</style>