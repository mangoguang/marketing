<template>
  <div class="areaEffectiveness">
    <div class="barBox">
      <chartsTit :text="'坪效-整体'"></chartsTit>
      <Bar
      @chartsClick="chartsEvent"
      :data="areaEffectivenessData"
      :vertical="'vertical'"
      :height="100"></Bar>
    </div>
    <div class="barBox">
      <chartsTit :text="'坪效-各店'"></chartsTit>
      <Bar
      :data="areaEffectivenessShopData"
      :vertical="'horizontal'"
      :height="height"></Bar>
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
  name:'areaEffectiveness',
  components:{
    Bar,
    chartsTit,
    RouterLink
  },data(){
    return{
      ajaxData: {},
      areaEffectivenessData: {}, 
      areaEffectivenessShopData: {},
      height: 100
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
      mango.getAjax(this, 'area/effectiveness', {
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
            yAxisData: ['我的坪效情况'],
            average: res.series[2].data[0],
            series: [{
              "data": [ arr[0].data[0] ],
              "name": "2018-08"
            }, {
              "data": [ arr[1].data[0] ],
              "name": "2017-08"
            }]
          }
          _this.areaEffectivenessData = tempObj
        }
      })
    },
    getareaEffectivenessShopData() {
      let _this = this
      mango.getAjax(this, 'area/effectiveness/shop', {
        date: '2018-08',
        tenantId: this.ajaxData.tenantId,
        cityLevel: 2,
        cityName: '苏州市'
      }).then((res) => {
        if (res) {
          res = res.data
          // _this.height = 200
          _this.areaEffectivenessShopData = res
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

