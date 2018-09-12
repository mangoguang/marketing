<template>
  <div class="peopleWork">
    <div class="barBox">
      <chartsTit :text="'人效-整体'"></chartsTit>
      <Bar
      @chartsClick="chartsEvent"
      :data="peopleWorkData"
      :vertical="'vertical'"
      :height="100"></Bar>
    </div>
    <div class="barBox">
      <chartsTit :text="'人效-各店'"></chartsTit>
      <Bar
      @chartsClick="chartsEvent"
      :data="areaPeopleWorkData"
      :vertical="'horizontal'"
      :height="300"></Bar>
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
  name:'peopleWork',
  components:{
    Bar,
    chartsTit,
    RouterLink
  },data(){
    return{
      ajaxData: {},
      peopleWorkData: {}, 
      areaPeopleWorkData: {},
      height: 100
    }
  }, created() {
    // 获取本地存储信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
  },
  mounted(){
    this.getpeopleWorkData()
    this.getareaPeopleWorkData()
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
    getpeopleWorkData() {
      let _this = this
      mango.getAjax(this, 'people/work', {
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
            yAxisData: ['广州天河3D/V6店'],
            average: res.series[2].data[0],
            series: [{
              "data": [ arr[0].data[0] ],
              "name": "2018-08"
            }, {
              "data": [ arr[1].data[0] ],
              "name": "2017-08"
            }]
          }
          _this.peopleWorkData = tempObj
        }
      })
    },
    getareaPeopleWorkData() {  //接口没有
      let _this = this
      mango.getAjax(this, 'people/work/shop', {
        date: '2018-08',
        tenantId: this.ajaxData.tenantId,
        cityLevel: 2,
        cityName: '苏州市'
      }).then((res) => {
        if (res) {
          res = res.data
          // _this.height = 200
          _this.areaPeopleWorkData = res
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
