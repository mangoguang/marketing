<!-- <keep-alive> -->
<template>
  <div class="sales">
    <Bar :data="salesData" :vertical="'vertical'"></Bar>
    <Bar :data="areaSalesData" :vertical="'vertical'"></Bar>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import mango from '../js'
import Vuex, { mapState, mapMutations, mapGetters } from 'vuex'
Vue.use(VueRouter)
Vue.use(Vuex)
import Bar from '../components/charts/bar'
export default {
  name: 'sales',
  components: {
    Bar
  },
  data () {
    return {
      ajaxData: {},
      salesData: {}, 
      areaSalesData: {}
    }
  },
  created() {
    // 获取本地存储信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
  },
  mounted(){
    this.getSalesData()
    this.getAreaSalesData()
    // mango.test()
    console.log(11223344, this.$refs.main)
    this.setHomeArr([1, 2, 3, 4])
    this.setHomeTit('首页标题')
    this.setHomeText('123木头人')
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
    getSalesData() {
      let _this = this
      mango.getAjax(this, 'sales', {
        cityLevel: 2,
        cityName: '广州',
        date: '2018-08',
        tenantId: this.ajaxData.tenantId
      }).then((res) => {
        if (res) {
          res = res.data
          let tempObj = {
            legendData: ['利润'],
            yAxisData: ['整体销售额对比'],
            average: res[2].siblings,
            series: [{
              "data": [ res[0].currDate ],
              "name": "2018-07"
            }, {
              "data": [ res[1].preDate ],
              "name": "2017-08"
            }]
          }
          _this.salesData = tempObj
        }
      })
    },
    getAreaSalesData() {
      let _this = this
      mango.getAjax(this, 'area/sales', {
        date: '2018-08',
        tenantId: this.ajaxData.tenantId
      }).then((res) => {
        if (res) {
          res = res.data
          _this.areaSalesData = res
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
 