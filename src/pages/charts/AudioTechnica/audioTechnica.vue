<!-- <keep-alive> -->
<template>
  <ul class="audioTechnica paddingTop">
    <mybanner :title='title' />
    <SelectComponent></SelectComponent>
    <!-- 整体进店数 -->
    <li class="barBox">
      <chartsTit :text="'进店数-整体'">
        <!-- <h6>单位：万</h6> -->
      </chartsTit>
      <div :style="{height: `100vw`}" ref="storeGetInTotalContainer" ></div>
    </li>

    <!-- 各门店进店数 -->
    <li class="barBox">
      <chartsTit :text="'进店数-各门店'">
        <!-- <h6>单位：万</h6> -->
      </chartsTit>
      <div ref="perStoreGetInContainer" ></div>
    </li>
    
    <!-- 整体成交率 -->
    <li class="barBox">
      <chartsTit :text="'成交率-整体'">
        <!-- <h6>单位：万</h6> -->
      </chartsTit>
      <div :style="{height: `100vw`}" ref="achieveRatioTotalContainer" ></div>
    </li>

    <!-- 各门店成交率 -->
    <li class="barBox">
      <chartsTit :text="'成交率-各门店'">
        <!-- <h6>单位：万</h6> -->
      </chartsTit>
      <div ref="perAchieveRatioContainer" ></div>
    </li>

    <!-- 整体客单值 -->
    <li class="barBox">
      <chartsTit :text="'客单值-整体'">
        <!-- <h6>单位：万</h6> -->
      </chartsTit>
      <div :style="{height: `100vw`}" ref="orderFormTotalContainer" ></div>
    </li>

    <!-- 各门店客单值 -->
    <li class="barBox">
      <chartsTit :text="'客单值-各门店'">
        <!-- <h6>单位：万</h6> -->
      </chartsTit>
      <div ref="perOrderFormContainer" ></div>
    </li>
  </ul>
</template>
<!-- </keep-alive> -->

<script>
import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import mango from '../../../js'
import chartsInit,{chanrtDom} from '../../../utils/chartsInit'
import Vuex, { mapState, mapMutations, mapGetters } from 'vuex'
import SelectComponent from '../../../components/select/selectComponent'
Vue.use(VueRouter)
Vue.use(Vuex)
import Bar from '../../../components/charts/bar'
import Pie from '../../../components/charts/pie'
import chartsTit from '../../../components/charts/title'
import RouterLink from '../../../components/charts/routerLink'
import mybanner from '../../../components/banner'
export default {
  name: 'audioTechnica',
  components: {
    Bar, Pie, chartsTit, RouterLink, mybanner, SelectComponent
  },
  data () {
    return {
      ajaxData: {},
      storeGetInTotalData: {},
      perStoreGetInData: {},
      achieveRatioTotalData: {},
      perAchieveRatioData: {},
      orderFormTotalData: {},
      perOrderFormData: {},
      title:'铁三角报表',
      endTime: mango.getLocalTime('end'),
      cityMsg: '',
      key:false,
      key1:false,
      key2:false,
      key3:false,
      auchanrtDom1:'',
      auchanrtDom2:'',
      auchanrtDom3:'',
      auchanrtDom4:'',
      auchanrtDom5:'',
      auchanrtDom6:''
    }
  },
  created() {
    // 获取本地存储信息
    let [ajaxData, cityMsg] = [localStorage.getItem('ajaxData'), localStorage.getItem('cityMsg')]
    this.cityMsg = cityMsg ? JSON.parse(cityMsg) : {}
    this.ajaxData = JSON.parse(ajaxData)
    // console.log(this.cityMsg.cityName, this.cityMsg.cityLevel)
    this.asyncAjax(this.endTime, this.cityMsg.cityName, this.cityMsg.cityLevel)
  },
  mounted() {
  },
  computed: {
    ...mapState({
      citySelect: state => state.select.citySelect,
      startTimeSelect: state => state.select.startTimeSelect,
      endTimeSelect: state => state.select.endTimeSelect
    })
  },
  watch: {
    citySelect() {
      if (this.endTimeSelect && this.endTimeSelect != '') {
        this.asyncAjax(this.endTimeSelect, this.citySelect.cityName, this.citySelect.cityLevel)
      }
    },
    endTimeSelect() {
      if (this.endTimeSelect && this.endTimeSelect != '') {
        this.asyncAjax(this.endTimeSelect, this.citySelect.cityName, this.citySelect.cityLevel)
      }
    },
    // 整体进店数对比
    storeGetInTotalData() {
      const chartsName = 'storeGetInTotal'
      if(this.key) {
        if (this[`${chartsName}Data`].series) {
          chartsInit(this, chartsName, 'vertical')
          this.auchanrtDom1 = chanrtDom
        }
      }
    },
    perStoreGetInData() {
      // 参数说明：查看销售模块样例
      const chartsName = 'perStoreGetIn'
      if(this.key) {
        if (this[`${chartsName}Data`].series) {
          chartsInit(this, chartsName, 'horizontal')
          this.auchanrtDom2 = chanrtDom
        }
      }
    },
    achieveRatioTotalData() {
      const chartsName = 'achieveRatioTotal'
      if(this.key) {
        if (this[`${chartsName}Data`].series) {
          chartsInit(this, chartsName, 'vertical')
          this.auchanrtDom3 = chanrtDom
        }
      }
    },
    perAchieveRatioData() {
      const chartsName = 'perAchieveRatio'
      if(this.key) {
        if (this[`${chartsName}Data`].series) {
          chartsInit(this, chartsName, 'horizontal')
          this.auchanrtDom4 = chanrtDom
        }
      }
    },
    orderFormTotalData() {
      const chartsName = 'orderFormTotal'
      if(this.key) {
        if (this[`${chartsName}Data`].series) {
          chartsInit(this, chartsName, 'vertical')
          this.auchanrtDom5 = chanrtDom
        }
      }
    },
    perOrderFormData() {
      const chartsName = 'perOrderForm'
      if(this.key) {
        if (this[`${chartsName}Data`].series) {
          chartsInit(this, chartsName, 'horizontal')
          this.auchanrtDom6 = chanrtDom
        }
      }
    }
  },
  beforeDestroy(){
     //销毁实例
    if(this.auchanrtDom1) {
      this.auchanrtDom1.dispose()
    }
    if(this.auchanrtDom2) {
      this.auchanrtDom2.dispose()
    }
    if(this.auchanrtDom3) {
      this.auchanrtDom3.dispose()
    }
    if(this.auchanrtDom4) {
      this.auchanrtDom4.dispose()
    }
    if(this.auchanrtDom5) {
      this.auchanrtDom5.dispose()
    }
    if(this.auchanrtDom6) {
      this.auchanrtDom6.dispose()
    }
  },
  methods:{
    // ajax请求
    // 异步函数
     asyncAjax(date, city, level) {
       var a1 =  this.getPerStoreGetInData(date, city, level)
       var a2 =  this.getPerAchieveRatioData(date, city, level)
       var a3 =  this.getPerOrderFormData(date, city, level)
       var a4 =  this.getStoreGetInTotalData(date, city, level)
       var a5 =  this.getAchieveRatioTotalData(date, city, level)
       var a6 =  this.getOrderFormTotalData(date, city, level)
      Promise.all([a1,a2,a3,a4,a5,a6]).then((results) => {
        this.key = true
      })
      //  this.getPerStoreGetInData(date, city, level)  // 获取各门店进店数数据
      //  this.getPerAchieveRatioData(date, city, level) // 获取各门店成交率数据
      //  this.getPerOrderFormData(date, city, level) // 获取各门店客单值数据
      // // 进店率
      //  this.getStoreGetInTotalData(date, city, level) // 获取总体进店数数据
      // // 成交率
      //  this.getAchieveRatioTotalData(date, city, level) // 获取总体成交率数据
      // // 客单值
      //  this.getOrderFormTotalData(date, city, level) // 获取总体客单值数据
    },
    // 整体进店数
    getStoreGetInTotalData(date, city, level) {
      mango.loading('open')
      let _this = this
      mango.getAjax(this, 'store/number/all', {
        tenantId: this.ajaxData.tenantId,
        date: date,
        cityLevel: level,
        cityName: '苏州市'
        // cityName: city
      }).then((res) => {
        mango.loading('close')
        if (res) {
          res = res.data
          mango.sortYears(res)
          res.yAxisData = [mango.chartsBotTit(res)]
          _this.storeGetInTotalData = res
        }
      })
    },
    // 各门店进店数
    getPerStoreGetInData(date, city, level) {
      mango.loading('open')
      let _this = this
      mango.getAjax(this, 'store/number', {
        tenantId: this.ajaxData.tenantId,
        date: date
      }).then((res) => {
        mango.loading('close')
        if (res) {
          this.key1 = true
          res = res.data
          _this.perStoreGetInData = res
        }
      })
    },
    // 整体成交率
    getAchieveRatioTotalData(date, city, level) {
      mango.loading('open')
      let _this = this
      mango.getAjax(this, 'turnover/ratio', {
        tenantId: this.ajaxData.tenantId,
        date: date,
        cityLevel: level,
        // cityName: '苏州市'
        cityName: city
      }).then((res) => {
        mango.loading('close')
        if (res) {
          res = res.data
          mango.sortYears(res)
          res.yAxisData = [mango.chartsBotTit(res)]
          _this.achieveRatioTotalData = res
        }
      })
    },
    // 各门店成交率
    getPerAchieveRatioData(date, city, level) {
      mango.loading('open')
      let _this = this
      mango.getAjax(this, 'store/turnover/ratio', {
        tenantId: this.ajaxData.tenantId,
        date: date,
        cityLevel: level,
        // cityName: '苏州市'
        cityName: city
      }).then((res) => {
        mango.loading('close')
        if (res) {
          this.key2 = true
          res = res.data
          _this.perAchieveRatioData = res
        }
      })
    },
    // 整体客单值
    getOrderFormTotalData(date, city, level) {
      mango.loading('open')
      let _this = this
      mango.getAjax(this, 'guest/order', {
        tenantId: this.ajaxData.tenantId,
        date: date,
        cityLevel: level,
        // cityName: '苏州市'
        cityName: city
      }).then((res) => {
        mango.loading('close')
        if (res) {
          res = res.data
          mango.sortYears(res)
          res.yAxisData = [mango.chartsBotTit(res)]
          _this.orderFormTotalData = res
        }
      })
    },
    // 各门店成交率
    getPerOrderFormData(date, city, level) {
       mango.loading('open')
      let _this = this
      mango.getAjax(this, 'store/guest/order', {
        tenantId: this.ajaxData.tenantId,
        date: date,
        cityLevel: level,
        // cityName: '苏州市'
        cityName: city
      }).then((res) => {
        mango.loading('close')
        if (res) {
          this.key3 = true
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
 