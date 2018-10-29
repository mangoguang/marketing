<!-- <keep-alive> -->
<template>
  <div class="brand">
    <mybanner :title='title' />
    <SelectComponent></SelectComponent>
    <ul>
      <li v-for="(item, index) in brandData.series" :key="`${index}11`">
        <div class="barBox">
          <chartsTit :text="index === 0 ? `整体${typeName}占比` : ''"></chartsTit>
          <Pie
          :yAxisData="brandData.yAxisData"
          :seriesData="item.data"
          :title="`各${typeName}金额占比-${item.name}`"
          :category="`整体${typeName}占比`"></Pie>
        </div>
      </li>
      <li>
        <div class="barBox">
          <!-- <chartsTit :text="'整体销售额对比'"></chartsTit> -->
          <div ref="brandContainer" ></div>
          <!-- <Bar
          @chartsClick="chartsEvent"
          :data="brandData"
          :vertical="'horizontal'"
          :title="`各${typeName}金额对比`"
          :height="120"
          :salesVal="true"></Bar> -->
        </div>
      </li>
    </ul>
    <ul>
      <li v-for="(item, index) in categoryData.series" :key="`${index}11`">
        <div class="barBox">
          <!-- <chartsTit :text="'整体品类对比'"></chartsTit> -->
          <Pie
          :yAxisData="categoryData.yAxisData"
          :seriesData="item.data"
          :title="`各${typeName}数量占比-${item.name}`"
          :category="`各${typeName}数量占比`"></Pie>
        </div>
      </li>
      <li>
        <div class="barBox">
          <!-- <chartsTit :text="'整体销售额对比'"></chartsTit> -->
          <div ref="categoryContainer" ></div>
          <!-- <Bar
          :data="categoryData"
          :vertical="'horizontal'"
          :title="`各${typeName}数量对比`"
          :height="120"></Bar> -->
        </div>
      </li>
    </ul>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import mango from '../../js'
import chartsInit from '../../utils/chartsInit'
import Vuex, { mapState, mapMutations, mapGetters } from 'vuex'
import SelectComponent from '../../components/select/selectComponent'
Vue.use(VueRouter)
Vue.use(Vuex)
import Bar from '../../components/charts/bar'
import Pie from '../../components/charts/pie'
import chartsTit from '../../components/charts/title'
import RouterLink from '../../components/charts/routerLink'
import mybanner from '../../components/banner'
export default {
  name: 'brand',
  components: {
    Bar, Pie, chartsTit, RouterLink, mybanner, SelectComponent
  },
  data () {
    return {
      ajaxData: {},
      brandData: {}, 
      categoryData: {},
      type: this.$route.query.type,
      typeName: this.$route.query.type === 'brand' ? '品牌' : '品类',
      port: this.$route.query.type === 'brand' ? 'brand/proportion' : 'category/proportion',
      title:'',
      endTime: mango.getLocalTime('end')
    }
  },
  created() {
    // 获取本地存储信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    // this.getBrandData()
    this.title = this.typeName + '报表'
  },
  mounted(){
    // Vue.$set(0, {name: 1})
    this.getBrandData(this.endTime)
    this.getCategoryData(this.endTime)
  },
  computed: {
    test() {
      // console.log(333, this.$store)
    },
    ...mapState({
      // citySelect: state => state.select.citySelect,
      startTimeSelect: state => state.select.startTimeSelect,
      endTimeSelect: state => state.select.endTimeSelect
    })
  },
  watch: {
    endTimeSelect() {
      if (this.endTimeSelect && this.endTimeSelect != '') {
        this.getBrandData(this.endTimeSelect)
        this.getCategoryData(this.endTimeSelect)
      }
    },
    brandData() {
      // 参数说明：查看销售模块样例
      const chartsName = 'brand'
      if (this[`${chartsName}Data`].series) {
        chartsInit(this, chartsName, 'horizontal', true)
      }
    },
    categoryData() {
      // 参数说明：查看销售模块样例
      const chartsName = 'category'
      if (this[`${chartsName}Data`].series) {
        chartsInit(this, chartsName, 'horizontal', true)
      }
    }
  },
  methods:{
    goToChild() {
      this.$router.push({ path: '/child' })
    },
    // ajax请求
    getBrandData(date) {
      mango.loading('open')
      let _this = this
      mango.getAjax(this, this.port, {
        tenantId: this.ajaxData.tenantId,
        date: date,
        type: 'sum'
      }).then((res) => {
        mango.loading('close')
        if (res) {
          res = res.data
          // 过滤数组
          // let tempArr = res.yAxisData.map((item) => {
          //   let arr = item.split('-')
          //   return arr[1]
          // })
          // res.yAxisData = tempArr
          // console.log('数据:', res)
          _this.brandData = res
        }
      })
    },
    getCategoryData(date) {
      mango.loading('open')
      let _this = this
      mango.getAjax(this, this.port, {
        tenantId: this.ajaxData.tenantId,
        date: date,
        type: 'count'
      }).then((res) => {
         mango.loading('close')
        if (res) {
          res = res.data
          // console.log('品类',)
          _this.categoryData = res
        }
      })
    },
    chartsEvent(data) {
      if (data.componentType === 'series') {
        this.$router.push({path: '/brandCatogrySales'})
      }
      console.log('报表组件传回的数据：', data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.brand{
  width: 100vw;
  height: 100vh;
  background: #f8f8f8;
  padding-top: 19.446vw;
}
.main{
  width: 100vw;
  height: 100vw;
}
</style>
 