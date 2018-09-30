<!-- <keep-alive> -->
<template>
  <div class="sales">
    <div class="barBox">
      <chartsTit :text="'整体销售额对比'">
        <h6>单位：万元</h6>
      </chartsTit>
      <SelectComponent></SelectComponent>
      <div :style="{height: `100vw`}" ref="salesContainer" ></div>
      <!-- <Bar
      @chartsClick="chartsEvent"
      :data="salesData"
      :vertical="'vertical'"
      :height="100"
      :salesVal="true"></Bar> -->
      <RouterLink @click.native="toStoreSales" :text="'各门店销售额对比'"></RouterLink>
    </div>
    <div class="barBox">
      <chartsTit :text="'区域销售额对比'">
        <h6>单位：万元</h6>
      </chartsTit>
      <div :style="{height: `100vw`}" ref="areaSalesContainer" ></div>
      <!-- <Bar
      :data="areaSalesData"
      :vertical="'vertical'"
      :height="100"
      :salesVal="true"></Bar> -->
      <RouterLink @click.native="toAreaStoreSales" :text="'各门店销售额对比'"></RouterLink>
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
import chartsTit from '../../components/charts/title'
import RouterLink from '../../components/charts/routerLink'
import SelectComponent from '../../components/select/selectComponent'
export default {
  name: 'sales',
  components: {
    Bar,
    chartsTit,
    RouterLink,
    SelectComponent
  },
  data () {
    return {
      ajaxData: {},
      endTime: '',
      salesData: {}, 
      areaSalesData: {}
    }
  },
  created() {
    // 获取本地存储信息
    let [ajaxData, endTime] = [localStorage.getItem('ajaxData'), localStorage.getItem('endTime')]
    // if (!endTime) {
    //   endTime = 
    // }
    this.ajaxData = JSON.parse(ajaxData)
    if (endTime) {
      this.endTime = endTime
    } else {
      this.endTime = mango.indexTime()
    }                                                                 
  },
  mounted(){
    this.getAreaSalesData(this.endTime)
  },
  computed: {
    test() {
      console.log(333, this.$store)
    },
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
      this.getSalesData(this.citySelect.cityName)
    },
    endTimeSelect() {
      this.getAreaSalesData(this.endTimeSelect)
    },
    // 整体销售额对比
    salesData() {
      const chartsName = 'sales'
      if (this[`${chartsName}Data`].series) {
        chartsInit(this, chartsName, 'vertical', true)
      }
    },
    // 区域销售额对比
    areaSalesData() {
      chartsInit(this, 'areaSales', 'vertical', true)
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
    getSalesData(cityName) {
      mango.loading('open')
      let _this = this
      mango.getAjax(this, 'sales', {
        cityLevel: 2,
        cityName: cityName,
        date: '2018-08',
        tenantId: this.ajaxData.tenantId
      }).then((res) => {
        mango.loading('close')
        if (res) {
          res = res.data
          _this.salesData = res
        }
      }).catch(function (error) {
        mango.loading('close')
        console.log(11111, error);
      });
    },
    getAreaSalesData(time) {
      mango.loading('open')
      let _this = this
      mango.getAjax(this, 'area/sales', {
        date: time,
        tenantId: this.ajaxData.tenantId
      }).then((res) => {
        mango.loading('close')
        if (res) {
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
.sales{
  // background:#f8f8f8;
}
</style>
 