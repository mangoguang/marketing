<!-- <keep-alive> -->
<template>
  <div class="storeSales paddingTop2">
    <mybanner :title='title' />
    <div class="barBox">
      <chartsTit :text="'各门店销售额对比'">
        <h6>单位：万元</h6>
      </chartsTit>
      <div v-show="!storeSalesShow"
           ref="storeSalesContainer"></div>
      <noData v-show="storeSalesShow"></noData>
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
import chartsInit, { chanrtDom, emptyData } from '../../../utils/chartsInit'
import VueRouter from 'vue-router'
import mango from '../../../js'
import Vuex, { mapState, mapMutations, mapGetters } from 'vuex'
Vue.use(VueRouter)
Vue.use(Vuex)
import Bar from '../../../components/charts/bar'
import chartsTit from '../../../components/charts/title'
import RouterLink from '../../../components/charts/routerLink'
import mybanner from '../../../components/banner'
import noData from '../../../components/charts/noData'
import { waterMark } from '../../../utils/msManage'
export default {
  name: 'storeSales',
  components: {
    Bar,
    chartsTit,
    RouterLink,
    mybanner,
    noData
  },
  data() {
    return {
      ajaxData: {},
      storeSalesData: {},
      endTime: mango.getLocalTime('end'),
      title: '销售额报表',
      key: false,
      storeSalchanrtDom1: '',
      storeSalesShow: false
    }
  },
  created() {},
  mounted() {
    waterMark('.barBox')
    // 获取本地存储信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    this.getStoreSalesData()
    // console.log('creat,tenanid',this.ajaxData.tenantId)
  },
  computed: {},
  watch: {
    storeSalesData() {
      // 参数说明：
      // data：图标数据
      // vertical设置柱状图的横向排布和纵向排布
      // height设置图标容器main的高度
      // salesVal标记是否为销售额，主要用于改变数据单位
      setTimeout(() => {
        if (this.key) {
          let routeTo = (data, _this) => {
            _this.$router.push({
              path: `/personalSales?shopId=${
                this.storeSalesData.idsData[data.dataIndex]
              }&name=${data.name}`
            })
          }
          // 检测数据是否为空
          this.storeSalesShow = emptyData(this.storeSalesData.series)
          chartsInit(this, 'storeSales', 'horizontal', true, '', routeTo)
          this.storeSalchanrtDom1 = chanrtDom
        }
      }, 200)
    }
  },
  beforeDestroy() {
    if (this.storeSalchanrtDom1) {
      this.storeSalchanrtDom1.dispose()
    }
  },
  methods: {
    ...mapMutations(['setHomeTit', 'setHomeText', 'setHomeArr']),
    // goToChild() {
    //   this.$router.push({ path: '/child' })
    // },
    // ajax请求
    getStoreSalesData() {
      let _this = this
      mango
        .getAjax('/v1/app/report/shops/sales', {
          date: this.endTime,
          tenantId: this.ajaxData.tenantId
        })
        .then(res => {
          if (res) {
            let newData = mango.getNewArr(
              res.data.series[0].data,
              res.data.series[1].data,
              res.data.yAxisData,
              res.data.idsData
            )
            this.$set(res.data, 'idsData', newData[3])
            this.$set(res.data.series[0], 'data', newData[1])
            this.$set(res.data.series[1], 'data', newData[2])
            this.$set(res.data, 'yAxisData', newData[0])
            this.key = true
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
        // console.log('shopId', data)
        this.$router.push({
          path: `/personalSales?shopId=${data[1][data[0].dataIndex]}&name=${
            data[0].name
          }`
        })
      }
      // console.log('点击图表传回的数据：', data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.sales {
  // background:#f8f8f8;
}
</style>
 