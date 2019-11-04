<!-- <keep-alive> -->
<template>
  <div class="main" ref="main" :style="{height: `${height}vw`,width:'100vw'}"></div>
</template>
<!-- </keep-alive> -->

<script>
// import echarts from 'echarts'
import Vue from 'vue'
// import VueRouter from 'vue-router'
import echarts from 'echarts'
import {waterMark} from '../../utils/msManage'
// import mango from '../js/variable'
// import Vuex, { mapState, mapMutations, mapGetters } from 'vuex'
// Vue.use(Vuex)
export default {
  name: 'pie',
  props: ['yAxisData', 'seriesData', 'title', 'category', 'height'],
  data () {
    return {
      initDom:'',
      yinitDom:''
    }
  },
  mounted() {
    echarts.init(this.$refs.main).setOption(this.option())
    this.initDom = echarts.init(this.$refs.main)
    waterMark('.main');
    // console.log(99887766, this.title)
  },
  updated() {
    
  },
  computed: {

  },
  watch: {
    yAxisData: function(val) {
      echarts.init(this.$refs.main).setOption(this.option())
      this.yinitDom =  echarts.init(this.$refs.main)
    }
  },
  beforeDestroy(){
     //销毁实例
    if(this.initDom) {
      this.initDom.dispose()
    }
     if(this.yinitDom) {
      this.yinitDom.dispose()
    }
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
        grid: {
          left: '3%',
          top: 'center',
          containLabel: true,
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c}",
          position: ['20%', '10%']
          // formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          // type: 'scroll',
          orient: 'horizontal',
          left: '3%',
          right: '3%',
          top: '10%',
          data: this.yAxisData,
          selected: this.yAxisData
        },
        color: ['#ff2d55','#ffcc00', '#5ac8fa', '#007aff', '#5856d6','#ff964b',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
        series: [
          {
            name: this.category,
            type: 'pie',
            radius : '30%',
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
      let [arr, yAxisData, seriesData, maxNum] = [[], this.yAxisData, this.seriesData, Math.max(...this.seriesData)]
      let total = 0
      seriesData.forEach(element => {
        total += parseFloat(element)
      });
      console.log('pieData:', total, seriesData)
      for (let i = 0; i < yAxisData.length; i++) {
        arr.push({
          name: `${yAxisData[i]}(${(seriesData[i]*100/total).toFixed(2)}%)`,
          value: seriesData[i] != 0 ? seriesData[i] : '',
          selected: seriesData[i] === maxNum
        })
      }
      // console.log('pieData', arr)
      return arr
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main{
    width: 100%;
    height: 110vw;
    font-family: PINGPANG;
  }
</style>