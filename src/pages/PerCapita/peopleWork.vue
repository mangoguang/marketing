<template>
  <div class="peopleWork paddingTop">
    <mybanner :title='title' :turnPath='turnPath'/>
    <div class="barBox">
      <chartsTit :text="'人效-整体'">
        <h6>单位：万元</h6>
      </chartsTit>
      <div :style="{height: `100vw`}" ref="peopleWorkContainer" ></div>
      <!-- <Bar
      :data="peopleWorkData"
      :vertical="'vertical'"
      :height="100"
      :salesVal="true"></Bar> -->
    </div>
    <div class="barBox">
      <chartsTit :text="'人效-各店'">
        <h6>单位：万元</h6>
      </chartsTit>
      <div ref="areaPeopleWorkContainer" ></div>
      <!-- <Bar
      :data="areaPeopleWorkData"
      :vertical="'horizontal'"
      :height="300"
      :salesVal="true"></Bar> -->
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
Vue.use(VueRouter)
Vue.use(Vuex)
import Bar from '../../components/charts/bar'
import chartsTit from '../../components/charts/title'
import RouterLink from '../../components/charts/routerLink'
import mybanner from '../../components/banner'

export default {
  name:'peopleWork',
  components:{
    Bar,
    chartsTit,
    RouterLink,
    mybanner
  },data(){
    return{
      ajaxData: {},
      peopleWorkData: {}, 
      areaPeopleWorkData: {},
      height: 100,
      title:'人效报表',
      turnPath:'./ReportForms'
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
  watch: {
    peopleWorkData() {
      const chartsName = 'peopleWork'
      if (this[`${chartsName}Data`].series) {
        chartsInit(this, chartsName, 'vertical', true)
      }
    },
    areaPeopleWorkData() {
      const chartsName = 'areaPeopleWork'
      if (this[`${chartsName}Data`].series) {
        chartsInit(this, chartsName, 'horizontal', true)
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
    getpeopleWorkData() {
      mango.loading('open')
      let _this = this
      mango.getAjax(this, 'people/work', {
        cityLevel: 2,
        cityName: '苏州市',
        date: '2018-08',
        tenantId: this.ajaxData.tenantId
      }).then((res) => {
        mango.loading('close')
        if (res) {
          res = res.data
          res.average = res.siblings
          _this.peopleWorkData = res
        }
      })
    },
    getareaPeopleWorkData() {  //接口没有
      mango.loading('open')
      let _this = this
      mango.getAjax(this, 'people/work/shop', {
        date: '2018-08',
        tenantId: this.ajaxData.tenantId,
        cityLevel: 2,
        cityName: '苏州市'
      }).then((res) => {
        mango.loading('close')
        if (res) {
          res = res.data
          // _this.height = 200
          _this.areaPeopleWorkData = res
        }
      })
    }
  }
}
</script>
