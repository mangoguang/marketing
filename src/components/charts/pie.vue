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
  name: 'pie',
  props: ['yAxisData', 'seriesData', 'title', 'category'],
  data () {
    return {

    }
  },
  mounted() {
    console.log(123123, this.seriesData)
    echarts.init(this.$refs.main).setOption(this.option())
    
  },
  computed: {

  },
  methods: {
    option() {
      return {
        title: {
          text: this.title,
          // subtext: '纯属虚构',
          y: '2%',
          x:'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: 'scroll',
          orient: 'horizontal',
          left: '3%',
          right: '3%',
          top: '10%',
          bottom: 20,
          data: this.yAxisData,
          selected: this.yAxisData
        },
        series: [
          {
            name: this.category,
            type: 'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data: this.series(),
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    },
    series() {
      let [arr, yAxisData, seriesData] = [[], this.yAxisData, this.seriesData]
      for (let i = 0; i < yAxisData.length; i++) {
        arr.push({
          name: yAxisData[i],
          value: seriesData[i]
        })
      }
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