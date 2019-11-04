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
      option: null,
      serArr: [],
      xAxisData: [],
      data: {}
    };
  },
  methods: {
    //获取附件的值
    getData() {
      // console.log(this.props);
      if(!this.props.series) return
      this.data = this.props;
      let { series, yAxisData } = this.data;
      this.serArr = series;
      // console.log(this.serArr);
      this.xAxisData = yAxisData;
      // 加载报表
      this.getChart();
    },
    getChart() {
      // console.log(this.props);

      // 基于准备好的dom，初始化echarts实例
      //   var myChart = echarts.init(document.getElementById(this.domName));
      // TopChart.removeAttribute("_echarts_instance_");
      //   let myChart1 = echarts.init(TopChart);
      let TopChart = document.getElementById(this.domName);
      //   TopChart.removeAttribute("_echarts_instance_");
      let myChart1 = echarts.init(TopChart);
      let opt = {
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        // legend:{
        //   type:'plain',
        //   data:this.serArr.map(item=>{
        //       return item.name
        //     }),
        // },
        // color: ["#199ed8", "#F6D448", "#ff00ff", "#F00"],
        grid: {
          width: "80%",
          height: "80%",
          left: "8%",
          right: "4%",
          bottom: "10%",
          containLabel: true
        },
        xAxis: [
          {
            data: this.serArr.map(item=>{
              return item.name
            }),
            type: "category",
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitArea: {
              interval: 0
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              margin: 12,
              interval: 0,
              textStyle: {
                fontSize: 14,
                color: "#848494"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false
            },
            splitLine: {
              show: true
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              //   margin: 36,
              textStyle: {
                fontSize: 14,
                color: "#848494"
              }
            }
          }
        ],
        series: [
          {
            type: "bar",
            barWidth: "40%",
            data: this.serArr.map(item=>{
              return item.data[0]
            }),
            itemStyle: {
              normal: {
                color: function(params) {
                  var colorList = ["#199ed8", "#F6D448", "#ff00ff", "#F00"];
                  return colorList[params.dataIndex];
                },
                label: {
                  show: true,
                  position: "top",
                  textStyle: {
                    fontSize: 14,
                    fontWeight: 600
                  }
                }
              }
            }
          }
        ]
      };
      //   opt.series[0].data = this.serArr;
      this.option = opt;
      myChart1.clear()
      //使用刚指定的配置项和数据显示图表。
      this.$nextTick(() => {
        myChart1.setOption(this.option, true);
      });
      window.onresize = function() {
        myChart1.resize();
      };
    }
  },
  mounted() {
    // 加载报表
    this.getData();
  },
  watch: {
    // 监听数据变化
    props() {
      // console.log(this.props);
      // this.getChart();
      this.getData();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>