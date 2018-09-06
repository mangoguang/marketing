<!-- <keep-alive> -->
<template>
  <div class="main" ref="main"></div>
</template>
<!-- </keep-alive> -->

<script>
// import echarts from 'echarts'
import Vue from 'vue'
// import VueRouter from 'vue-router'
import echarts from 'echarts'
// import mango from '../js/variable'
// import Vuex, { mapState, mapMutations, mapGetters } from 'vuex'
// Vue.use(Vuex)
export default {
  name: 'bar',
  props: ['data', 'vertical'],
  data () {
    return {
      seriesPosition: 'right'
    }
  },
  beforeMount() {

  },
  mounted() {
    console.log(222222, this.barData)
    // echarts.init(this.$refs.main).setOption(this.option())
  },
  updated() {

  },
  watch: {
    data(val){
      echarts.init(this.$refs.main).setOption(this.option())
    }
  },
  computed: {
    barData: function() {
      // console.log('父组件数据：', this.data)
      return this.data
    }
    // ...mapState({
    //   homeTit: state => 'just test',
    //   homeText: state => state.home.homeText,
    //   homeArr: state => state.home.homeArr
    // }),
  },
  methods: {
    option() {
      let [xAxis, yAxis] = [{}, {}]
      // this.vertical === horizontal,柱状图为水平方向，否则为垂直方向
      if (this.vertical === 'horizontal') {
        console.log('水平方向', this.vertical)
        yAxis = {data: this.barData.yAxisData}
      } else {
        console.log('垂直方向', this.vertical)
        this.seriesPosition = 'top'
        xAxis = {data: this.barData.yAxisData}
      }
      return {
        legend: {
          data: this.barData.legendData
        },
        tooltip : {
          trigger: 'axis',
          axisPointer : { // 坐标轴指示器，坐标轴触发有效
            type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          containLabel: true
        },
        xAxis: xAxis,
        yAxis: yAxis,
        series: this.series()
      }
    },
    /*
    参数说明：
      average：该参数为number类型,在加载bar组件时传入，传入时需要显示平均参考线，不传时不显示
    */
    series() {
      let arr = this.barData.series.map((item, index) => {
        return {
          name: item.name,
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: this.seriesPosition
            }
          },
          data: item.data,
          markLine: this.barData.average && index === 0 ? {
            // this.vertical === horizontal,柱状图为水平方向，否则为垂直方向
            data: this.vertical === 'horizontal' ? [
              {xAxis : this.barData.average, name: '平均值'}
            ] : [
              {yAxis : this.barData.average, name: '平均值'}
            ]
          } : {}
        }
      })
      return arr
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main{
    width: 100%;
    height: 100vw;
  }
</style>