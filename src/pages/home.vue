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
    <ul class="nav">
      <li>
        <router-link to="/home">品牌/品类</router-link>
      </li>
      <li>
        <router-link to="/sales">销售额</router-link>
      </li>
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
      brandData: {
        legendData: ['利润', '支出', '收入'],
        yAxisData: ['3D', 'V6', '0769', '凯奇', '慕思儿童'],
        series: [{
          "data": [ 7, 1, 3, 1, 2 ],
          "name": "2018-07"
        }, {
          "data": [ 2, 5, 18, 1, 6 ],
          "name": "2017-08"
        }]
      }, 
      categoryData: {
        legendData: ['利润', '支出', '收入'],
        yAxisData: ['床垫', '床头柜', '排骨架', '床架', '床品', '助眠'],
        series: [{
          "data": [ 107, 121, 183, 191, 302, 288 ],
          "name": "2018-07"
        }, {
          "data": [ 112, 145, 198, 171, 186, 300 ],
          "name": "2017-08"
        }]
      }
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
    mango.test()
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
      const url = 'http://10.11.8.7:8086/v1/app/report/brand/proportion'
      let arr = [
        ['date', '2018-08'],
        ['tenantId', this.ajaxData.tenantId]
      ]
      let sign = mango.getSign(arr, this.ajaxData.token)
      axios({
        method: 'get',
        url: url,
        headers: {
          'token': _this.ajaxData.token,
          'UUID': _this.ajaxData.uuid,
          'sign': sign
        },
        params: {
          tenantId: _this.ajaxData.tenantId,
          date: '2018-08'
        }
      })
      .then((res) => {
        if (res.data) {
          res = res.data.data
          res.legendData = ['利润', '支出', '收入']
          _this.brandData = res
          // _this.setBarData(res)
          // _this.set(_this.brandData, res)
          console.log('报表数据', _this.brandData)
        }
      })
    },
    getCategoryData() {
      let _this = this
      const url = 'http://10.11.8.7:8086/v1/app/report/category/proportion'
      let arr = [
        ['date', '2018-08'],
        ['tenantId', this.ajaxData.tenantId]
      ]
      let sign = mango.getSign(arr, this.ajaxData.token)
      axios({
        method: 'get',
        url: url,
        headers: {
          'token': _this.ajaxData.token,
          'UUID': _this.ajaxData.uuid,
          'sign': sign
        },
        params: {
          tenantId: _this.ajaxData.tenantId,
          date: '2018-08'
        }
      })
      .then((res) => {
        if (res.data) {
          res = res.data.data
          res.legendData = ['利润', '支出', '收入']
          _this.categoryData = res
          // _this.setBarData(res)
          // _this.set(_this.brandData, res)
          console.log('报表数据', _this.brandData)
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
 