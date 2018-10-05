<!-- <keep-alive> -->
<template>
  <div class="storeSales">
    <mybanner :title='title' :turnPath='turnPath'/>
    <div class="barBox">
      <chartsTit :text="'各门店销售额对比'"></chartsTit>
      <div ref="storeSalesContainer" ></div>
      <!-- <Bar
      @chartsClick="chartsEvent"
      :data="storeSalesData"
      :vertical="'horizontal'"
      :height="250"
      :salesVal="true"></Bar> -->
    </div>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import axios from 'axios'
import Vue from 'vue'
import chartsInit from '../../utils/chartsInit'
import VueRouter from 'vue-router'
import mango from '../../js'
import Vuex, { mapState, mapMutations, mapGetters } from 'vuex'
Vue.use(VueRouter)
Vue.use(Vuex)
import Bar from '../../components/charts/bar'
import chartsTit from '../../components/charts/title'
import RouterLink from '../../components/charts/routerLink'
import mybanner from '../../components/banner'
export default {
  name: 'storeSales',
  components: {
    Bar,
    chartsTit,
    RouterLink,
    mybanner
  },
  data () {
    return {
      ajaxData: {},
      storeSalesData: {},
      turnPath:'./sales',
      title:'销售额报表'
    }
  },
  created() {
    // 获取本地存储信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
  },
  mounted(){
    this.getStoreSalesData()
  },
  computed: {

  },
  watch: {
    storeSalesData() {
      // 参数说明：
      // data：图标数据
      // vertical设置柱状图的横向排布和纵向排布
      // height设置图标容器main的高度
      // salesVal标记是否为销售额，主要用于改变数据单位
      let routeTo = (data, _this) => {
        _this.$router.push({path: `/personalSales?shopId=${this.storeSalesData.idsData[data.dataIndex]}&name=${data.name}`})
      }
      chartsInit(this, 'storeSales', 'horizontal', true, '', routeTo)
    }
  },
  methods:{
    ...mapMutations([
      'setHomeTit',
      'setHomeText',
      'setHomeArr'
    ]),
    // goToChild() {
    //   this.$router.push({ path: '/child' })
    // },
    // ajax请求
    getStoreSalesData() {
      mango.loading('open')
      let _this = this
      mango.getAjax(this, 'shops/sales', {
        date: '2018-08',
        tenantId: this.ajaxData.tenantId
      }).then((res) => {
        mango.loading('close')
        if (res) {
          res = res.data
          // let tempArr = res.yAxisData.map((item) => {
          //   return '3d'
          // })
          // res.yAxisData = tempArr
          _this.storeSalesData = res
        }
      })
    },
    chartsEvent(data) {
      if (data[0].componentType === 'series') {
        console.log('shopId', data)
        this.$router.push({path: `/personalSales?shopId=${data[1][data[0].dataIndex]}&name=${data[0].name}`})
      }
      console.log('点击图表传回的数据：', data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.sales{
  // background:#f8f8f8;
}
</style>
 