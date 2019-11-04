<template>
  <div :id="domName" style="width:100vw;height:100vw;"></div>
</template>
<script>
import echarts from "echarts";
export default {
  /**
   * @param
   * domName :容器id名
   * props: 图表的数据
   */
  props: ["domName", "props"],
  data() {
    return {
      option: {}
    };
  },
  methods: {
    getChart() {
      console.log(this.props);
      
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById(this.domName));
      let newObj = {
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
            shadowStyle: {
              color: "rgba(60,60,60,.3)"
            }
          }
          // backgroundColor:'rgba(0,0,0,.8)'
        },

        grid: [
          {
            top: "8%",
            width: "80%",
            height: "80%",
            left: "8%",
            containLabel: true
            // bottom:10
          }
        ],
        xAxis: [
          {
            type: "value",
            axisLabel: {
              interval: 0
            },
            splitLine: {
              lineStyle: {
                color: "#CCCCCC"
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#848494"
              }
            },
            axisTick: {
              show: false
            },
            splitArea: {
              interval: 0
            }
          }
        ],
        yAxis: [
          {
            type: "category",
            data: this.props.map(item=>{
              return item.name
            }),
            axisLabel: {
              interval: 0
              // rotate: 50
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#666666"
              }
            }
          }
        ],
        series: [
          {
            type: "bar",
            stack: "chart",
            z: 3,
            barWidth: 15,
            itemStyle: {
              normal: {
                color: "#007AFF"
                //   barBorderRadius: [0, 5, 5, 0]
              }
            },
            label: {
              normal: {
                position: "right",
                show: true
              }
            },
            data: this.props.map(item=>{
              return item.value
            })
          }
        ]
      };
      this.option = newObj;
      if (this.option && typeof this.option === "object") {
        //使用刚指定的配置项和数据显示图表。
        myChart.setOption(this.option, true);
        window.onresize = function() {
          myChart.resize();
        };
      }
    }
  },
  mounted() {
    // 加载报表
    this.getChart()
  },
  watch: {
    // 监听数据变化
    props() {
      this.getChart()
    }
  },
};
</script>
<style lang="scss" scoped>
</style>