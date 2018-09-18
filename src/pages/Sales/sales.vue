<!-- <keep-alive> -->
<template>
  <div class="sales">
    <div class="barBox">
      <chartsTit :text="'整体销售额对比'">
        <h6>单位：万元</h6>
      </chartsTit>
      <!-- <SelectComponent></SelectComponent> -->
      <Bar
      @chartsClick="chartsEvent"
      :data="salesData"
      :vertical="'vertical'"
      :height="100"
      :salesVal="true"></Bar>
      <RouterLink @click.native="toStoreSales" :text="'各门店销售额对比'"></RouterLink>
    </div>
    <div class="barBox">
      <chartsTit :text="'区域销售额对比'">
        <h6>单位：万元</h6>
      </chartsTit>
      <Bar
      :data="areaSalesData"
      :vertical="'vertical'"
      :height="100"
      :salesVal="true"></Bar>
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
// import option from '../../js/option'
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
    // console.log('bar data:', option())
    this.getSalesData()
    this.getAreaSalesData()
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
    toStoreSales() {
      this.$router.push({ path: '/storeSales' })
    },
    toAreaStoreSales() {
      this.$router.push({ path: '/areaStoreSales' })
    },
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
          _this.salesData = res
        }
      }).catch(function (error) {
        console.log(11111, error);
      });
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
 