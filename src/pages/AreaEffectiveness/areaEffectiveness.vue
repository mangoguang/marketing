<template>
  <div class="areaEffectiveness paddingTop">
    <mybanner :title='title' :turnPath='turnPath'/>
    <SelectComponent></SelectComponent>
    <div class="barBox">
      <chartsTit :text="'坪效-整体'"></chartsTit>
      <div :style="{height: `100vw`}" ref="areaEffectivenessContainer" ></div>
      <!-- <Bar
      :data="areaEffectivenessData"
      :vertical="'vertical'"
      :height="100"></Bar> -->
    </div>
    <div class="barBox">
      <chartsTit :text="'坪效-各店'"></chartsTit>
      <div ref="areaEffectivenessShopContainer" ></div>
      <!-- <Bar
      :data="areaEffectivenessShopData"
      :vertical="'horizontal'"
      :height="250"></Bar> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import mango from '../../js'
import chartsInit from '../../utils/chartsInit'
import Vuex, { mapState, mapMutations, mapGetters } from 'vuex'
import SelectComponent from '../../components/select/selectComponent'
Vue.use(VueRouter)
Vue.use(Vuex)
import Bar from '../../components/charts/bar'
import chartsTit from '../../components/charts/title'
import RouterLink from '../../components/charts/routerLink'
import mybanner from '../../components/banner'

export default {
  name:'areaEffectiveness',
  components:{
    Bar,
    chartsTit,
    RouterLink,
    mybanner,
    SelectComponent
  },data(){
    return{
      ajaxData: {},
      areaEffectivenessData: {}, 
      areaEffectivenessShopData: {},
      title:'坪效报表',
      turnPath:'./ReportForms',
      endTime: mango.getLocalTime('end'),
      cityMsg: ''
    }
  },
  created() {
    // 获取本地存储信息
    let [ajaxData, cityMsg] = [localStorage.getItem('ajaxData'), localStorage.getItem('cityMsg')]
    this.cityMsg = cityMsg ? JSON.parse(cityMsg) : {}
    this.ajaxData = JSON.parse(ajaxData)
  },
  mounted(){
    this.getareaEffectivenessData(this.endTime, this.cityMsg.cityName, this.cityMsg.cityLevel)
    this.getareaEffectivenessShopData(this.endTime, this.cityMsg.cityName, this.cityMsg.cityLevel)
  },
  computed: {
    test() {
      // console.log(333, this.$store)
    },
    ...mapState({
      citySelect: state => state.select.citySelect,
      startTimeSelect: state => state.select.startTimeSelect,
      endTimeSelect: state => state.select.endTimeSelect
    })
  },
  watch: {
    citySelect() {
      if (this.endTimeSelect && this.endTimeSelect != '') {
        this.getareaEffectivenessData(this.endTimeSelect, this.citySelect.cityName, this.citySelect.cityLevel)
        this.getareaEffectivenessShopData(this.endTimeSelect, this.citySelect.cityName, this.citySelect.cityLevel)
      }
    },
    endTimeSelect() {
      if (this.endTimeSelect && this.endTimeSelect != '') {
        this.getareaEffectivenessData(this.endTimeSelect, this.citySelect.cityName, this.citySelect.cityLevel)
        this.getareaEffectivenessShopData(this.endTimeSelect, this.citySelect.cityName, this.citySelect.cityLevel)
      }
    },
    areaEffectivenessData() {
      const chartsName = 'areaEffectiveness'
      if (this[`${chartsName}Data`].series) {
        chartsInit(this, chartsName, 'vertical')
      }
    },
    areaEffectivenessShopData() {
      const chartsName = 'areaEffectivenessShop'
      if (this[`${chartsName}Data`].series) {
        chartsInit(this, chartsName, 'horizontal')
      }
    }
  },
  methods:{
    // ajax请求
    getareaEffectivenessData(date, city, level) {
      mango.loading('open')
      let _this = this
      mango.getAjax(this, 'area/effectiveness', {
        cityLevel: level,
        cityName: city,
        date: date,
        tenantId: this.ajaxData.tenantId
      }).then((res) => {
        mango.loading('close')
        if (res) {
          res = res.data
          res.yAxisData = ['坪效-整体']
          _this.areaEffectivenessData = res
        }
      })
    },
    getareaEffectivenessShopData(date, city, level) {
      mango.loading('open')
      let _this = this
      mango.getAjax(this, 'area/effectiveness/shop', {
        date: date,
        tenantId: this.ajaxData.tenantId,
        cityLevel: level,
        cityName: city
      }).then((res) => {
        mango.loading('close')
        if (res) {
          res = res.data
          // _this.height = 200
          _this.areaEffectivenessShopData = res
        }
      })
    }
  }
}
</script>

