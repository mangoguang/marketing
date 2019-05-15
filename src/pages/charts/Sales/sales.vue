<!-- <keep-alive> -->
<template>
  <div class="sales paddingTop" >
    <mybanner :title='title' />
    <SelectComponent></SelectComponent>
    <div class="barBox">
      <chartsTit :text="'整体销售额对比'">
        <h6>单位：万元</h6>
      </chartsTit>
      <div v-show="!salesShow" :style="{height: `100vw`}" ref="salesContainer"></div>
      <noData v-show="salesShow"></noData>
      <RouterLink @click.native="toStoreSales" :text="'各门店销售额对比'"></RouterLink>
    </div>
    <div class="barBox">
      <chartsTit :text="'区域销售额对比'">
        <h6>单位：万元</h6>
      </chartsTit>
      <div v-show="!areaSalesShow" :style="{height: `100vw`}" ref="areaSalesContainer" ></div>
      <noData v-show="areaSalesShow"></noData>
      <RouterLink @click.native="toAreaStoreSales" :text="'各区域销售额对比'"></RouterLink>
    </div>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import echarts from 'echarts'
import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import mango from '../../../js'
import chartsInit,{chanrtDom, emptyData} from '../../../utils/chartsInit'
import {waterMark} from '../../../utils/msManage'

import Vuex, { mapState, mapMutations, mapGetters } from 'vuex'
Vue.use(VueRouter)
Vue.use(Vuex)
import Bar from '../../../components/charts/bar'
import chartsTit from '../../../components/charts/title'
import RouterLink from '../../../components/charts/routerLink'
import SelectComponent from '../../../components/select/selectComponent'
import mybanner from '../../../components/banner'
import noData from '../../../components/charts/noData'
export default {
  name: 'sales',
  components: {
    Bar,
    chartsTit,
    RouterLink,
    SelectComponent,
    mybanner,
    noData
  },
  data () {
    return {
      ajaxData: {},
      endTime: mango.getLocalTime('end'),
      salesData: {}, 
      areaSalesData: {},
      title:'销售额报表',
      cityMsg: '',
      key1:false,
      key2:false,
      salchanrtDom1:'',
      salchanrtDom2:'',
      // 用于标记各个echart图表是否显示/隐藏
      salesShow: true,
      areaSalesShow: true
    }
  },
  created() {
    // 获取本地存储信息
    let [ajaxData, cityMsg] = [localStorage.getItem('ajaxData'), localStorage.getItem('cityMsg')]
    this.cityMsg = cityMsg ? JSON.parse(cityMsg) : {}
    // let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    // let shops = localStorage.getItem('shops')
    // console.log('本地存储的shops:', JSON.parse(shops))
  },
  mounted(){
    
    console.log('参数', this.cityMsg.cityName, this.endTime, this.cityMsg.cityLevel)
    this.getSalesData(this.cityMsg.cityName, this.endTime, this.cityMsg.cityLevel)
    this.getAreaSalesData(this.endTime)
    waterMark('.barBox');
  },
  computed: {
    ...mapState({
      citySelect: state => state.select.citySelect,
      startTimeSelect: state => state.select.startTimeSelect,
      endTimeSelect: state => state.select.endTimeSelect
    }),
    ...mapGetters([
      'homeArrFilter'
    ])
  },
  watch: {
    citySelect() {
      if (this.endTimeSelect && this.endTimeSelect != '') {
        // console.log(localStorage.getItem('cityMsg'))
        this.getSalesData(this.citySelect.cityName, this.endTimeSelect, this.citySelect.cityLevel)
      }
    },
    endTimeSelect() {
      if (this.endTimeSelect && this.endTimeSelect != '') {
        this.getSalesData(this.citySelect.cityName, this.endTimeSelect, this.citySelect.cityLevel)
        this.getAreaSalesData(this.endTimeSelect)
      }
    },
    // 整体销售额对比
    salesData() {
      const chartsName = 'sales'
      if(this.key1) {
        if (this[`${chartsName}Data`]) {
          if (this[`${chartsName}Data`].series) {
            // 检测数据是否为空
            this.salesShow = emptyData(this[`${chartsName}Data`].series)
            console.log('是否显示echarts', this.salesShow)
            chartsInit(this, chartsName, 'vertical', true)
            this.salchanrtDom1 = chanrtDom
          }
        }
      }
    },
    // 区域销售额对比
    areaSalesData() {
      const chartsName = 'areaSales'
      if(this.key2) {
        if (this[`${chartsName}Data`]) {
          if (this[`${chartsName}Data`].series) {
            // 检测数据是否为空
            this.areaSalesShow = emptyData(this[`${chartsName}Data`].series)
            chartsInit(this, chartsName, 'vertical', true)
            this.salchanrtDom2 = chanrtDom
          }
        }
      }
    }
  },
  beforeDestroy(){
    if(this.salchanrtDom1) {
      this.salchanrtDom1.dispose()
    }
    if(this.salchanrtDom2) {
      this.salchanrtDom2.dispose()
    }
  },
  methods:{
    // goToChild() {
    //   this.$router.push({ path: '/child' })
    // },
    toStoreSales() {
      this.$router.push({ path: '/storeSales' })
    },
    toAreaStoreSales() {
      this.$router.push({ path: '/areaStoreSales' })
    },
    // ajax请求
    getSalesData(cityName, date, level) {
      let _this = this
      mango.getAjax('/v1/app/report/sales', {
        cityLevel: level,
        // cityName: '苏州市',
        cityName: cityName,
        date: date,
        tenantId: this.ajaxData.tenantId
      }).then((res) => {
        if (res) {
          this.key1 = true
          res = res.data
          mango.sortYears(res)
          res.yAxisData = [mango.chartsBotTit(res)]
          // console.log(887799, res)
          _this.salesData = res
        }
      }).catch(function (error) {
        console.log(11111, error)
      });
    },
    getAreaSalesData(time) {
      let _this = this
      mango.getAjax('/v1/app/report/area/sales', {
        date: time,
        tenantId: this.ajaxData.tenantId
      }).then((res) => {
        if (res) {
          this.key2 = true
          res = res.data
          _this.areaSalesData = res
        }
      })
    },
    chartsEvent(data) {
      if (data.componentType === "series") {
        
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
 