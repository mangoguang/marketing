<template>
  <div class="customerSource">
    <div class="barBox">
      <chartsTit :text="'客户来源-整体'"></chartsTit>
      <Bar
      @chartsClick="chartsEvent"
      :data="areaEffectivenessData"
      :vertical="'horizontal'"
      :height="100"></Bar>
    </div>
    <div class="barBox">
      <chartsTit :text="'客户来源-各店'"></chartsTit>
      <Bar
      @chartsClick="chartsEvent"
      :data="areaEffectivenessData"
      :vertical="'horizontal'"
      :height="100"></Bar>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import mango from '../js'
import Vuex, { mapState, mapMutations, mapGetters } from 'vuex'
Vue.use(VueRouter)
Vue.use(Vuex)
import Bar from '../components/charts/bar'
import chartsTit from '../components/charts/title'
import RouterLink from '../components/charts/routerLink'

export default {
  name:'customerSource',
  components:{
    Bar,
    chartsTit,
    RouterLink
  },data(){
    return{
      ajaxData: {},
      areaEffectivenessData: {}, 
      areaEffectivenessShopData: {}
    }
  },  
  created() {
    // 获取本地存储信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
  },
  mounted(){
    this.getareaEffectivenessData()
    this.getareaEffectivenessShopData()
  },
  computed: {
    test() {
      console.log(333, this.$store)
    },
    ...mapState({
      homeTit: state => 'just test',
      homeText: state => state.home.homeText,
      homeArr: state => state.home.homeArr
    }),
    ...mapGetters([
      'homeArrFilter'
    ])
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
    getareaEffectivenessData() {
      let _this = this
      mango.getAjax(this, 'customer/source', {
        cityLevel: 2,
        cityName: '苏州市',
        date: '2018-08',
        tenantId: this.ajaxData.tenantId
      }).then((res) => {
        if (res) {
          res = res.data
          let arr = res.series
          let tempObj = {
            legendData: ['利润'],
            yAxisData: ["自然进店", "老客带单", "异业联盟", "设计师介绍"],
            average:arr[2].data[0],
            series: [{
              "data": [ arr[0].data[0],arr[0].data[1],arr[0].data[2],arr[0].data[3] ],
              "name": "2018-08"
            }, {
              "data": [ arr[1].data[0],arr[1].data[1],arr[1].data[2],arr[1].data[3] ],
              "name": "2017-08"
            }]
          }
          _this.areaEffectivenessData = tempObj
        }
      })
    },
    getareaEffectivenessShopData() {
      let _this = this
      mango.getAjax(this, 'customer/source/shop', {
        date: '2018-08',
        tenantId: this.ajaxData.tenantId,
        cityLevel: 2,
        cityName: '苏州市'
      }).then((res) => {
        if (res) {
          res = res.data
          // _this.height = 200
          res = res.data
          let arr = res.series
          let tempObj = {
            legendData: ['利润'],
            yAxisData: ["自然进店", "老客带单", "异业联盟", "设计师介绍"],
            average:arr[2].data[0],
            series: [{
              "data": [ arr[0].data[0],arr[0].data[1],arr[0].data[2],arr[0].data[3] ],
              "name": "2018-08"
            }, {
              "data": [ arr[1].data[0],arr[1].data[1],arr[1].data[2],arr[1].data[3] ],
              "name": "2017-08"
            }] 
          }
         
          _this.areaEffectivenessData = tempObj
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

