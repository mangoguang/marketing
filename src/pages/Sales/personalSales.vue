<!-- <keep-alive> -->
<template>
  <div class="personalSales">
    <div class="barBox">
      <chartsTit :text="`${shopName}-职员销售额对比`"></chartsTit>
      <Bar
      :data="personalSalesData"
      :vertical="'horizontal'"
      :height="300"
      :salesVal="true"></Bar>
    </div>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import mango from '../../js'
import Vuex, { mapState, mapMutations, mapGetters } from 'vuex'
Vue.use(VueRouter)
Vue.use(Vuex)
import Bar from '../../components/charts/bar'
import Pie from '../../components/charts/pie'
import chartsTit from '../../components/charts/title'
import RouterLink from '../../components/charts/routerLink'
export default {
  name: 'personalSales',
  props: ['data'],
  components: {
    Bar, Pie, chartsTit, RouterLink
  },
  data () {
    return {
      ajaxData: {},
      personalSalesData: {},
      shopName: this.$route.query.name
    }
  },
  created() {
    // 获取本地存储信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
  },
  mounted(){
    console.log('路由参数', this.$route)
    this.getPersonalSalesData()
  },
  computed: {

  },
  methods:{
    getPersonalSalesData() {
      let _this = this
      mango.getAjax(this, 'shop/sales', {
        date: '2018-08',
        tenantId: this.ajaxData.tenantId,
        shopId: this.$route.query.shopId
      }).then((res) => {
        if (res) {
          res = res.data
          res.average = res.shopAvg
          console.log('店内员工销售额：', res)
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
 