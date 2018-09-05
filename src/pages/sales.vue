<!-- <keep-alive> -->
<template>
  <div class="sales">
    <Bar :data="salesData" :vertical="'vertical'"></Bar>
    <Bar :data="areaSalesData" :vertical="'vertical'"></Bar>
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
// import Pie from '../components/charts/pie'
export default {
  name: 'sales',
  components: {
    Bar
  },
  data () {
    return {
      ajaxData: {},
      salesData: {
        legendData: ['利润', '支出', '收入'],
        yAxisData: ['整体销售额对比'],
        seriesData: [{
          "data": [ 7, 1, 3, 1, 2 ],
          "name": "2018-07"
        }, {
          "data": [ 2, 5, 18, 1, 6 ],
          "name": "2017-08"
        }, {
          "data": [ 2, 5, 18, 1, 6 ],
          "name": "同级平均销售额"
        }]
      }, 
      areaSalesData: {
        legendData: ['利润', '支出', '收入'],
        yAxisData: ['广东', '广西', '福建', '江苏', '床湖南品', '上海'],
        seriesData: [{
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
    goToChild() {
      this.$router.push({ path: '/child' })
    },
    // asyn function() {

    // }
    // ajax请求
    getSalesData() {
      let _this = this
      const url = `${mango.path}report/sales`
      let obj = {
        cityLevel: 2,
        cityName: '广州',
        date: '2018-08',
        tenantId: this.ajaxData.tenantId
      }
      // [
      //   ['cityLevel', '2'],
      //   ['cityName', '广州'],
      //   ['date', '2018-08'],
      //   ['tenantId', this.ajaxData.tenantId]
      // ]
      let sign = mango.getSign(obj, this.ajaxData.token)
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
          date: '2018-08',
          cityLevel: 2,
          cityName: '广州'
        }
      })
      .then((res) => {
        if (res.data) {
          res = res.data.data
          console.log(111111, res)
          // res.legendData = ['利润', '支出', '收入']
          let tempObj = {
            legendData: ['利润'],
            yAxisData: ['整体销售额对比'],
            series: [{
              "data": [ res[0].currDate ],
              "name": "2018-07"
            }, {
              "data": [ res[1].preDate ],
              "name": "2017-08"
            }, {
              "data": [ res[2].siblings ],
              "name": "同级平均销售额"
            }]
          }
          _this.salesData = tempObj
          console.log('报表数据', _this.salesData)
        }
      })
    },
    getAreaSalesData() {
      let _this = this
      const url = 'http://10.11.8.7:8086/v1/app/report/area/sales'
      let obj = {
        date: '2018-08',
        tenantId: this.ajaxData.tenantId
      }
      let sign = mango.getSign(obj, this.ajaxData.token)
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
          console.log('报表数据123', res)
          // let tempObj = {
          //   legendData: ['利润'],
          //   yAxisData: res.map(function(item) {
          //     return item.name
          //   }),
          //   series: res.map(function(item) {
          //     return {
          //       "data": item.series.data.map(function(key) {
          //         return key.value
          //       }),
          //       "name": "2018-07"
          //     }
          //   })
          // }
          _this.areaSalesData = res
          console.log(333333, _this.areaSalesData)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
 