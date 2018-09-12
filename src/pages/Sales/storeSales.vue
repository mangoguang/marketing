<!-- <keep-alive> -->
<template>
  <div class="storeSales">
    <div class="barBox">
      <chartsTit :text="'各门店销售额对比'"></chartsTit>
      <Bar
      @chartsClick="chartsEvent"
      :data="storeSalesData"
      :vertical="'horizontal'"
      :height="250"
      :salesVal="true"></Bar>
    </div>
  </div>
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
import chartsTit from '../../components/charts/title'
import RouterLink from '../../components/charts/routerLink'
export default {
  name: 'storeSales',
  components: {
    Bar,
    chartsTit,
    RouterLink
  },
  data () {
    return {
      ajaxData: {},
      storeSalesData: {}
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
      let _this = this
      mango.getAjax(this, 'shops/sales', {
        date: '2018-08',
        tenantId: this.ajaxData.tenantId
      }).then((res) => {
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
 