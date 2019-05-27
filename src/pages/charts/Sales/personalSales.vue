<!-- <keep-alive> -->
<template>
  <div class="personalSales paddingTop2">
    <mybanner :title='title' />
    <div class="barBox">
      <chartsTit :text="`${shopName}-职员销售额对比`">
        <h6>单位：万元</h6>
      </chartsTit>
      <div ref="personalSalesContainer" ></div>
      <!-- <Bar
      :data="personalSalesData"
      :vertical="'horizontal'"
      :height="300"
      :salesVal="true"></Bar> -->
    </div>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import mango from '../../../js'
import chartsInit,{chanrtDom} from '../../../utils/chartsInit'
import Vuex, { mapState, mapMutations, mapGetters } from 'vuex'
Vue.use(VueRouter)
Vue.use(Vuex)
import Bar from '../../../components/charts/bar'
import Pie from '../../../components/charts/pie'
import chartsTit from '../../../components/charts/title'
import RouterLink from '../../../components/charts/routerLink'
import mybanner from '../../../components/banner'
export default {
  name: 'personalSales',
  props: ['data'],
  components: {
    Bar, Pie, chartsTit, RouterLink,mybanner
  },
  data () {
    return {
      ajaxData: {},
      personalSalesData: {},
      shopName: this.$route.query.name,
      title:'销售额报表',
      endTime: mango.getLocalTime('end'),
      key:false,
      peoSalchanrtDom1:''
    }
  },
  created() {
    // 获取本地存储信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    this.getPersonalSalesData(this.endTime)
  },
  mounted(){
    // console.log('路由参数', this.$route)
  },
  computed: {

  },
  watch: {
    personalSalesData() {
      // 参数说明：
      // data：图标数据
      // vertical设置柱状图的横向排布和纵向排布
      // height设置图标容器main的高度
      // salesVal标记是否为销售额，主要用于改变数据单位
      setTimeout(() => {
         if(this.key) {
        chartsInit(this, 'personalSales', 'horizontal', true)
        this.peoSalchanrtDom1 = chanrtDom
      }
      }, 200);
    }
  },
  beforeDestroy(){
    if(this.peoSalchanrtDom1) {
      this.peoSalchanrtDom1.dispose()
    }
  },
  methods:{
    getPersonalSalesData(date) {
      let _this = this
      mango.getAjax('/v1/app/report/shop/sales', {
        date: date,
        tenantId: this.ajaxData.tenantId,
        shopId: this.$route.query.shopId
      }).then((res) => {
        if (res) {
          let newData = mango.getNewArr(res.data.series[0].data,res.data.series[1].data,res.data.yAxisData,res.data.idsData)
          this.$set(res.data,'idsData',newData[3])
          this.$set(res.data.series[0],'data',newData[1])
          this.$set(res.data.series[1],'data',newData[2])
          this.$set(res.data,'yAxisData',newData[0])
          this.key = true
          res = res.data
          /* for (let i = 0; i < res.yAxisData.length; i++) {
            res.yAxisData[i] = `*${res.yAxisData[i].slice(1, 5)}`
          } */
          // res.average = res.shopAvg
          // console.log('店内员工销售额：', res)
          _this.personalSalesData = res
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.audioTechnica{

}
</style>
 