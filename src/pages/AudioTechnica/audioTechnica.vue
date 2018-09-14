<!-- <keep-alive> -->
<template>
  <ul class="audioTechnica">
    <!-- 整体进店数 -->
    <li class="barBox">
      <chartsTit :text="'进店数-整体'">
        <!-- <h6>单位：万</h6> -->
      </chartsTit>
      <Bar
      :data="storeGetInTotalData"
      :vertical="'vertical'"
      :height="80"></Bar>
    </li>

    <!-- 各门店进店数 -->
    <li class="barBox">
      <chartsTit :text="'进店数-各门店'">
        <!-- <h6>单位：万</h6> -->
      </chartsTit>
      <Bar
      @chartsClick="getInChartsEvent"
      :data="perStoreGetInData"
      :vertical="'horizontal'"
      :height="200"></Bar>
    </li>
    
    <!-- 整体成交率 -->
    <li class="barBox">
      <chartsTit :text="'成交率-整体'">
        <!-- <h6>单位：万</h6> -->
      </chartsTit>
      <Bar
      :data="achieveRatioTotalData"
      :vertical="'vertical'"
      :height="80"></Bar>
    </li>

    <!-- 各门店成交率 -->
    <li class="barBox">
      <chartsTit :text="'成交率-各门店'">
        <!-- <h6>单位：万</h6> -->
      </chartsTit>
      <Bar
      @chartsClick="achieveRatioChartsEvent"
      :data="perAchieveRatioData"
      :vertical="'horizontal'"
      :height="200"></Bar>
    </li>

    <!-- 整体客单值 -->
    <li class="barBox">
      <chartsTit :text="'客单值-整体'">
        <!-- <h6>单位：万</h6> -->
      </chartsTit>
      <Bar
      :data="orderFormTotalData"
      :vertical="'vertical'"
      :height="80"></Bar>
    </li>

    <!-- 各门店客单值 -->
    <li class="barBox">
      <chartsTit :text="'客单值-各门店'">
        <!-- <h6>单位：万</h6> -->
      </chartsTit>
      <Bar
      @chartsClick="orderFormChartsEvent"
      :data="perOrderFormData"
      :vertical="'horizontal'"
      :height="200"></Bar>
    </li>
  </ul>
</template>
<!-- </keep-alive> -->

<script>
import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import mango from '../../js'
import Vuex, { mapState, mapMutations, mapGetters } from 'vuex'
Vue.use(VueRouter)
Vue.use(Vuex)
import Bar from '../../components/charts/bar'
import Pie from '../../components/charts/pie'
import chartsTit from '../../components/charts/title'
import RouterLink from '../../components/charts/routerLink'
export default {
  name: 'audioTechnica',
  components: {
    Bar, Pie, chartsTit, RouterLink
  },
  data () {
    return {
      ajaxData: {},
      storeGetInTotalData: {},
      perStoreGetInData: {},
      achieveRatioTotalData: {},
      perAchieveRatioData: {},
      orderFormTotalData: {},
      perOrderFormData: {}
    }
  },
  created() {
    // 获取本地存储信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
  },
  mounted() {
    this.asyncAjax()
  },
  computed: {

  },
  methods:{
    // ajax请求
    // 异步函数
    async asyncAjax() {
      // 进店率
      await this.getStoreGetInTotalData() // 获取总体进店数数据
      console.log('获取数据～～～总体进店数')
      await this.getPerStoreGetInData() // 获取各门店进店数数据
      console.log('获取数据～～～门店进店数')
      // 成交率
      await this.getAchieveRatioTotalData() // 获取总体成交率数据
      console.log('获取数据～～～总体成交率')
      await this.getPerAchieveRatioData() // 获取各门店成交率数据
      console.log('获取数据～～～门店成交率')
      // 客单值
      await this.getOrderFormTotalData() // 获取总体客单值数据
      console.log('获取数据～～～总体客单值')
      await this.getPerOrderFormData() // 获取各门店客单值数据
      console.log('获取数据～～～门店客单值')
    },
    // 整体进店数
    getStoreGetInTotalData() {
      let _this = this
      mango.getAjax(this, 'store/number/all', {
        tenantId: this.ajaxData.tenantId,
        date: '2018-08',
        cityLevel: 2,
        cityName: '苏州市'
      }).then((res) => {
        if (res) {
          res = res.data
          _this.storeGetInTotalData = res
        }
      })
    },
    // 各门店进店数
    getPerStoreGetInData() {
      let _this = this
      mango.getAjax(this, 'store/number', {
        tenantId: this.ajaxData.tenantId,
        date: '2018-08'
      }).then((res) => {
        if (res) {
          res = res.data
          _this.perStoreGetInData = res
        }
      })
    },
    // 整体成交率
    getAchieveRatioTotalData() {
      let _this = this
      mango.getAjax(this, 'turnover/ratio', {
        tenantId: this.ajaxData.tenantId,
        date: '2018-08',
        cityLevel: 2,
        cityName: '苏州市'
      }).then((res) => {
        if (res) {
          res = res.data
          _this.achieveRatioTotalData = res
        }
      })
    },
    // 各门店成交率
    getPerAchieveRatioData() {
      let _this = this
      mango.getAjax(this, 'store/turnover/ratio', {
        tenantId: this.ajaxData.tenantId,
        date: '2018-08',
        cityLevel: 2,
        cityName: '苏州市'
      }).then((res) => {
        if (res) {
          res = res.data
          _this.perAchieveRatioData = res
        }
      })
    },
    // 整体客单值
    getOrderFormTotalData() {
      let _this = this
      mango.getAjax(this, 'guest/order', {
        tenantId: this.ajaxData.tenantId,
        date: '2018-08',
        cityLevel: 2,
        cityName: '苏州市'
      }).then((res) => {
        if (res) {
          res = res.data
          _this.orderFormTotalData = res
        }
      })
    },
    // 各门店成交率
    getPerOrderFormData() {
      let _this = this
      mango.getAjax(this, 'store/guest/order', {
        tenantId: this.ajaxData.tenantId,
        date: '2018-08',
        cityLevel: 2,
        cityName: '苏州市'
      }).then((res) => {
        if (res) {
          res = res.data
          _this.perOrderFormData = res
        }
      })
    },
    toPersonal(data, str) {
      this.$router.push({path: `/personal?shopId=${data[1][data[0].dataIndex]}&name=${data[0].name}${str}`})
    },
    getInChartsEvent(data) {
      this.toPersonal(data, '进店数&type=getIn')
    },
    achieveRatioChartsEvent(data) {
      this.toPersonal(data, '成交率&type=achieveRatio')
    },
    orderFormChartsEvent(data) {
      this.toPersonal(data, '客单值&type=orderForm')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.audioTechnica{

}
</style>
 