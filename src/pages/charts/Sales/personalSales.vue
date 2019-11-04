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
import {waterMark} from '../../../utils/msManage'
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
      peoSalchanrtDom1:'',
      url:''
    }
  },
  created() {
    // 获取本地存储信息
    let ajaxData = localStorage.getItem('ajaxData')
    let selectMsg = localStorage.getItem('selectMsg')
    this.ajaxData = JSON.parse(ajaxData)
    selectMsg = JSON.parse(selectMsg)
    let { startDate, endDate, areaMsg, cityLevel } = selectMsg
    if (this.ajaxData.typename == "Store Manager") {
      this.url = '/v2/app/report/user/sales'
        var data = {
          shopId: areaMsg,
          startDate,
          endDate
        };
      }else {
        this.url = '/v1/app/dealer/report/shop/sales'
        var data = {
          startDate,
          endDate,
          shopId:this.$route.query.shopId,
          tenantId:this.ajaxData.tenantId
        };
      }
    this.getPersonalSalesData(data)
  },
  mounted(){
    // console.log('路由参数', this.$route)
    waterMark('.barBox')
  },
  computed: {

  },
  watch: {
    personalSalesData() {
      console.log(1);
      
      // 参数说明：
      // data：图标数据
      // vertical设置柱状图的横向排布和纵向排布
      // height设置图标容器main的高度
      // salesVal标记是否为销售额，主要用于改变数据单位
      // setTimeout(() => {
         if(this.key) {
           console.log(2);
           
        chartsInit(this, 'personalSales', 'horizontal', true)
        this.peoSalchanrtDom1 = chanrtDom
      }
      // }, 200);
    }
  },
  beforeDestroy(){
    if(this.peoSalchanrtDom1) {
      this.peoSalchanrtDom1.dispose()
    }
  },
  methods:{
    getPersonalSalesData(params) {
      let _this = this
      mango.getAjax(this.url, params).then((res) => {
        console.log(res);
        
        if (res) {
          let newData = mango.getNewArr(res.data.series[0].data,res.data.series[1].data,res.data.yAxisData,res.data.idsData)
          this.$set(res.data,'idsData',newData[3])
          this.$set(res.data.series[0],'data',newData[1])
          this.$set(res.data.series[1],'data',newData[2])
          this.$set(res.data,'yAxisData',newData[0])
          this.key = true
          // res = res.data
          /* for (let i = 0; i < res.yAxisData.length; i++) {
            res.yAxisData[i] = `*${res.yAxisData[i].slice(1, 5)}`
          } */
          // res.average = res.shopAvg
          // console.log('店内员工销售额：', res)
          _this.personalSalesData = res.data
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
 