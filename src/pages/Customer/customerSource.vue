<template>
  <div class="customerSource paddingTop">
    <mybanner :title='title' :turnPath='turnPath'/>
    <SelectComponent></SelectComponent>
    <div class="barBox">
      <chartsTit :text="'客户来源-整体'"></chartsTit>
      <div ref="customerSourceContainer" ></div>
      <!-- <Bar
      @chartsClick="chartsEvent"
      :data="customerSourceData"
      :vertical="'horizontal'"
      :height="100"></Bar> -->
    </div>
    <div class="barBox">
      <chartsTit :text="'客户来源-各店'"></chartsTit>
      <div ref="areaCustomerSourceContainer"></div>
      <!-- <Bar
      @chartsClick="chartsEvent"
      :data="areaCustomerSourceData"
      :vertical="'horizontal'"
      :height="400"></Bar> -->
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
  name:'customerSource',
  components:{
    Bar,
    chartsTit,
    RouterLink,
    mybanner,
    SelectComponent
  },data(){
    return{
      ajaxData: {},
      customerSourceData: {}, 
      areaCustomerSourceData: {},
      title:'客户来源报表',
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
    this.getcustomerSourceData(this.endTime, this.cityMsg.cityName, this.citySelect.cityLevel)
    this.getareaCustomerSourceData(this.endTime)
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
        this.getpeopleWorkData(this.endTimeSelect, this.citySelect.cityName, this.citySelect.cityLevel)
      }
    },
    endTimeSelect() {
      if (this.endTimeSelect && this.endTimeSelect != '') {
        this.getpeopleWorkData(this.endTimeSelect, this.citySelect.cityName, this.citySelect.cityLevel)
        this.getareaPeopleWorkData(this.endTimeSelect)
      }
    },
    customerSourceData() {
      const chartsName = 'customerSource'
      if (this[`${chartsName}Data`].series) {
        chartsInit(this, chartsName, 'horizontal')
      }
    },
    areaCustomerSourceData() {
      const chartsName = 'areaCustomerSource'
      if (this[`${chartsName}Data`].series) {
        chartsInit(this, chartsName, 'horizontal')
      }
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
    getcustomerSourceData(date, city, level) {
      mango.loading('open')
      let _this = this
      mango.getAjax(this, 'customer/source', {
        cityLevel: level,
        cityName: city,
        date: date,
        tenantId: this.ajaxData.tenantId
      }).then((res) => {
         mango.loading('close')
        if (res) {
          res = res.data
          let arr = res.series
          let tempObj = {
            legendData: ['利润'],
            legend:{
              data:['2017-08','2018-08','同级客户来源']
            },
            yAxisData: ["自然进店", "老客带单", "异业联盟", "设计师介绍"],
            series: [{
              "data": [ arr[0].data[0],arr[0].data[1],arr[0].data[2],arr[0].data[3] ],
              "name": "2018-08"
            }, {
              "data": [ arr[1].data[0],arr[1].data[1],arr[1].data[2],arr[1].data[3] ],
              "name": "2017-08"
            },{
              "data": [ arr[2].data[0],arr[2].data[1],arr[2].data[2],arr[2].data[3] ],
              "name": "同级客户来源"
            }]
          }
          _this.customerSourceData = tempObj
        }
      })
    },
    getareaCustomerSourceData(date) {
      mango.loading('open')
      let _this = this
      mango.getAjax(this, 'customer/source/shop', {
        date: date,
        tenantId: this.ajaxData.tenantId       
      }).then((res) => {
        mango.loading('close')
        if (res) {
          res = res.data
          // console.log(res)
          // _this.height = 200
          // let arr = res.series
          // let tempObj = {
          //   legendData: ['利润'],
          //   yAxisData: ["自然进店", "老客带单", "异业联盟", "设计师介绍"],
          //   series: [{
          //     "data": [ arr[0].data[0],arr[0].data[1],arr[0].data[2],arr[0].data[3] ],
          //     "name": "2018-08"
          //   }, {
          //     "data": [ arr[1].data[0],arr[1].data[1],arr[1].data[2],arr[1].data[3] ],
          //     "name": "2017-08"
          //   }] 
          // }
         
          _this.areaCustomerSourceData = res
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

