<!-- <keep-alive> -->
<template>
  <div class="personalSales paddingTop">
    <mybanner :title='title' />
    <div class="barBox">
      <chartsTit :text="`${shopName}-职员销售额对比`"></chartsTit>
      <div ref="personalSalesContainer" ></div>
      <!-- <Bar
      :data="personalSalesData"
      :vertical="'horizontal'"
      :height="300"
      :salesVal="true"></Bar> -->
    </div>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import mango from '../../js'
import chartsInit from '../../utils/chartsInit'
import Vuex, { mapState, mapMutations, mapGetters } from 'vuex'
Vue.use(VueRouter)
Vue.use(Vuex)
import Bar from '../../components/charts/bar'
import Pie from '../../components/charts/pie'
import chartsTit from '../../components/charts/title'
import RouterLink from '../../components/charts/routerLink'
import mybanner from '../../components/banner'
export default {
  name: 'personalSales',
  props: ['data'],
  components: {
    Bar, Pie, chartsTit, RouterLink,mybanner
  },
  data () {
    return {
      ajaxData: {},
      personalSalesData: {},
      shopName: this.$route.query.name,
      title:'销售额报表',
      endTime: mango.getLocalTime('end')
    }
  },
  created() {
    // 获取本地存储信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
  },
  mounted(){
    // console.log('路由参数', this.$route)
    this.getPersonalSalesData(this.endTime)
  },
  computed: {

  },
  watch: {
    personalSalesData() {
      // 参数说明：
      // data：图标数据
      // vertical设置柱状图的横向排布和纵向排布
      // height设置图标容器main的高度
      // salesVal标记是否为销售额，主要用于改变数据单位
      chartsInit(this, 'personalSales', 'horizontal', true)
    }
  },
  methods:{
    getPersonalSalesData(date) {
      let _this = this
      mango.getAjax(this, 'shop/sales', {
        date: date,
        tenantId: this.ajaxData.tenantId,
        shopId: this.$route.query.shopId
      }).then((res) => {
        if (res) {
          res = res.data
          // res.average = res.shopAvg
          // console.log('店内员工销售额：', res)
          _this.personalSalesData = res
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.audioTechnica{

}
</style>
 