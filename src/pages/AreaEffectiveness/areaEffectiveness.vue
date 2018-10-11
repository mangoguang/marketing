<template>
  <div class="areaEffectiveness paddingTop">
    <mybanner :title='title' :turnPath='turnPath'/>
    <div class="barBox">
      <chartsTit :text="'坪效-整体'"></chartsTit>
      <Bar
      :data="areaEffectivenessData"
      :vertical="'vertical'"
      :height="100"></Bar>
    </div>
    <div class="barBox">
      <chartsTit :text="'坪效-各店'"></chartsTit>
      <Bar
      :data="areaEffectivenessShopData"
      :vertical="'horizontal'"
      :height="250"></Bar>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import mango from '../../js'
import Vuex, { mapState, mapMutations, mapGetters } from 'vuex'
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
    mybanner
  },data(){
    return{
      ajaxData: {},
      areaEffectivenessData: {}, 
      areaEffectivenessShopData: {},
      title:'坪效报表',
      turnPath:'./ReportForms'
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
      mango.loading('open')
      let _this = this
      mango.getAjax(this, 'area/effectiveness', {
        cityLevel: 2,
        cityName: '苏州市',
        date: '2018-08',
        tenantId: this.ajaxData.tenantId
      }).then((res) => {
        mango.loading('close')
        if (res) {
          res = res.data
          _this.areaEffectivenessData = res
        }
      })
    },
    getareaEffectivenessShopData() {
      mango.loading('open')
      let _this = this
      mango.getAjax(this, 'area/effectiveness/shop', {
        date: '2018-08',
        tenantId: this.ajaxData.tenantId,
        cityLevel: 2,
        cityName: '苏州市'
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

