<!-- <keep-alive> -->
<template>
  <ul class="personal paddingTop">
    <mybanner :title='mytitle' :turnPath='turnPath'/>
    <!-- 整体进店数 -->
    <li class="barBox">
      <chartsTit :text="`${shopName}进店数-职员`">
        <!-- <h6>单位：万</h6> -->
      </chartsTit>
      <Bar
      :data="personalData"
      :vertical="'horizontal'"
      :height="200"></Bar>
    </li>
  </ul>
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
import chartsTit from '../../components/charts/title'
import mybanner from '../../components/banner'
export default {
  name: 'personal',
  components: {
    Bar, chartsTit,mybanner
  },
  data () {
    return {
      ajaxData: {},
      personalData: {},
      shopName: this.$route.query.name,
      title: '',
      mytitle:'铁三角报表',
      turnPath:'./audioTechnica'
    }
  },
  created() {
    // 获取本地存储信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
  },
  mounted(){
    switch (this.$route.query.type) {
      case 'getIn': 
        this.title = `${this.title}进店数`
        this.getPersonalData('store/number/people') // 获取个人数据
        break
      case 'achieveRatio':
        this.title = `${this.title}成交率`
        this.getPersonalData('people/turnover/ratio') // 获取个人数据
        break
      default:
        this.title = `${this.title}客单值`
        this.getPersonalData('people/guest/order') // 获取个人数据
        break
    }
  },
  computed: {

  },
  methods:{
    // ajax请求
    getPersonalData(url) {
       mango.loading('open')
      let _this = this
      mango.getAjax(this, url, {
        tenantId: this.ajaxData.tenantId,
        date: '2018-08',
        shopId: this.$route.query.shopId
      }).then((res) => {
        mango.loading('close')
        if (res) {
          res = res.data
          _this.personalData = res
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.personal{

}
</style>
