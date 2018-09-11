<!-- <keep-alive> -->
<template>
  <div :style="{height: `${height}vw`}" class="main" id="main" ref="main"></div>
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
  props: ['data', 'vertical', 'title', 'height'],
  data () {
    return {
      seriesPosition: 'right',
      width: window.innerWidth
    }
  },
  beforeMount() {
    console.log('组件挂载前', this.data)
  },
  mounted() {
    console.log(333333, this.data)
    this.select()
    console.log('组件加载', this.data)
  },
  updated() {
    // console.log('组件更新', this.data, this.$refs.main.style.height)
  },
  beforeUpdate() {
    console.log('组件更新前', this.data)
  },
  watch: {
    data(val){
      console.log(321123, this.data)
      echarts.init(this.$refs.main).setOption(this.option())
      // echarts.init(this.$refs.main).setOption(this.option())
    }
  },
  computed: {
    barData: function() {
      return this.data
    }
  },
  methods: {
    option() {
      let [xAxis, yAxis] = [{
        // 直角坐标相关设置。
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#ccc'
            }
          },
          axisLabel: {
            color: "#999"
          }
        }, {
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#ccc'
            }
          },
          axisLabel: {
            color: "#999"
          }
        }]
      // this.vertical === horizontal,柱状图为水平方向，否则为垂直方向
      if (this.vertical === 'horizontal') {
        yAxis.data = this.barData.yAxisData
      } else {
        this.seriesPosition = 'top'
        xAxis.data = this.barData.yAxisData
      }
      return {
        title: {
          text: this.title,
          // subtext: '纯属虚构',
          y: '10',
          x:'center'
        },
        legend: {
          type: 'scroll',
          orient: 'horizontal',
          left: '3%',
          right: '3%',
          top: '40',
          data: ['2017-08', '2018-08']
        },
        grid: {
          left: '3%',
          top: '80',
          // height: 700,
          containLabel: true
        },
        color: ['#007aff', '#5ac8fa', '#ff2d55','#ffcc00', '#5856d6','#ff964b',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
        tooltip : {
          trigger: 'axis',
          axisPointer : { // 坐标轴指示器，坐标轴触发有效
            type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: xAxis,
        yAxis: yAxis,
        series: this.series()
      }
    },
    select() {
      let _this = this
      echarts.init(this.$refs.main).on('click', function (params) {
        _this.$emit('chartsClick', params)
      })
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
  }
</style>