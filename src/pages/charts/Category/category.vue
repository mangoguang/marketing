<!-- <keep-alive> -->
<template>
  <div class="category">
    <mybanner :title='title' />
    <ul>
      <li v-for="(item, index) in brandData.series" :key="`${index}12`">
        <div class="barBox">
          <chartsTit :text="index === 0 ? '整体品类占比' : ''"></chartsTit>
          <Pie
          :yAxisData="brandData.yAxisData"
          :seriesData="item.data"
          :title="`各品类金额占比-${item.name}`"
          :category="'整体品占比'"></Pie>
        </div>
      </li>
      <li>
        <div class="barBox">
          <!-- <chartsTit :text="'整体销售额对比'"></chartsTit> -->
          <Bar
          @chartsClick="chartsEvent"
          :data="brandData"
          :vertical="'horizontal'"
          :title="'各品牌金额对比'"
          :height="80"></Bar>
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
          :title="`各品牌数量占比-${item.name}`"
          :category="'各品牌数量占比'"></Pie>
        </div>
      </li>
      <li>
        <div class="barBox">
          <!-- <chartsTit :text="'整体销售额对比'"></chartsTit> -->
          <Bar
          :data="categoryData"
          :vertical="'horizontal'"
          :title="'各品牌数量对比'"
          :height="120"></Bar>
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
import mango from '../../../js'
import Vuex, { mapState, mapMutations, mapGetters } from 'vuex'
Vue.use(VueRouter)
Vue.use(Vuex)
import Bar from '../../../components/charts/bar'
import Pie from '../../../components/charts/pie'
import chartsTit,{chanrtDom} from '../../../components/charts/title'
import RouterLink from '../../../components/charts/routerLink'
import mybanner from '../../../components/banner'
export default {
  name: 'brand',
  components: {
    Bar, Pie, chartsTit, RouterLink,mybanner
  },
  data () {
    return {
      ajaxData: {},
      brandData: {}, 
      categoryData: {},
      title:''
     
    }
  },
  created() {
    // 获取本地存储信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    // this.getBrandData()
  },
  mounted(){
    // Vue.$set(0, {name: 1})
    this.getBrandData()
    this.getCategoryData()
    // mango.test()
    // console.log(11223344, this.$refs.main)
    this.setHomeArr([1, 2, 3, 4])
    this.setHomeTit('首页标题')
    this.setHomeText('123木头人')
  },
  computed: {
    test() {
      // console.log(333, this.$store)
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
      'setHomeArr',
      'setBarData'
    ]),
    goToChild() {
      this.$router.push({ path: '/child' })
    },
    // ajax请求
    getBrandData() {
      mango.loading('open')
      let _this = this
      mango.getAjax(this, 'brand/proportion', {
        tenantId: this.ajaxData.tenantId,
        date: '2018-08',
        type: 'count'
      }).then((res) => {
         mango.loading('close')
        if (res) {
          res = res.data
          // 过滤数组
          let tempArr = res.yAxisData.map((item) => {
            let arr = item.split('-')
            return arr[1]
          })
          res.yAxisData = tempArr
          _this.brandData = res
        }
      })
    },
    getCategoryData() {
      mango.loading('open')
      let _this = this
      mango.getAjax(this, 'category/proportion', {
        tenantId: this.ajaxData.tenantId,
        date: '2018-08',
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
      // console.log('报表组件传回的数据：', data)
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
}
.main{
  width: 100vw;
  height: 100vw;
}
</style>
 