<!-- <keep-alive> -->
<template>
  <div class="home">
    <ul>
      <li><h3>整体品牌占比</h3></li>
      <li v-for="(item, index) in brandData.series" :key="`${index}11`">
        <Pie
          :yAxisData="brandData.yAxisData"
          :seriesData="item.data"
          :title="item.name"
          :category="'整体品牌占比'"></Pie>
      </li>
      <li><Bar :data="brandData" :vertical="'horizontal'"></Bar></li>
    </ul>
    <ul>
      <li><h3>整体品类占比</h3></li>
      <li v-for="(item, index) in categoryData.series" :key="`${index}11`">
        <Pie
          :yAxisData="categoryData.yAxisData"
          :seriesData="item.data"
          :title="item.name"
          :category="'整体品类占比'"></Pie>
      </li>
      <li><Bar :data="categoryData" :vertical="'horizontal'"></Bar></li>
    </ul>
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
import Pie from '../components/charts/pie'
export default {
  name: 'home',
  components: {
    Bar, Pie
  },
  data () {
    return {
      ajaxData: {},
      brandData: {}, 
      categoryData: {}
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
      'setHomeArr',
      'setBarData'
    ]),
    goToChild() {
      this.$router.push({ path: '/child' })
    },
    // ajax请求
    getBrandData() {
      let _this = this
      mango.getAjax(this, 'brand/proportion', {
        tenantId: this.ajaxData.tenantId,
        date: '2018-08'
      }).then((res) => {
        if (res) {
          res = res.data
          _this.brandData = res
        }
      })
    },
    getCategoryData() {
      let _this = this
      mango.getAjax(this, 'category/proportion', {
        tenantId: this.ajaxData.tenantId,
        date: '2018-08'
      }).then((res) => {
        if (res) {
          res = res.data
          _this.categoryData = res
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home{
  width: 100vw;
  height: 100vh;
  /* background: #ff0000; */
  h3{
    text-align: center;
  }
}
.main{
  width: 100vw;
  height: 100vw;
}
</style>
 