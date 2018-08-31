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
  mounted() {
    echarts.init(this.$refs.main).setOption(this.option())
    
  },
  computed: {

  },
  methods: {
    option() {
      let [xAxis, yAxis] = [{}, {}]
      // this.vertical === horizontal,柱状图为水平方向，否则为垂直方向
      if (this.vertical === 'horizontal') {
        console.log('水平方向', this.vertical)
        yAxis = {data: this.data.yAxisData}
      } else {
        console.log('垂直方向', this.vertical)
        this.seriesPosition = 'top'
        xAxis = {data: this.data.yAxisData}
      }
      return {
        legend: {
          data: this.data.legendData
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
    series() {
      let arr = this.data.series.map((item) => {
        return {
          name: item.name,
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: this.seriesPosition
            }
          },
          data: item.data
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