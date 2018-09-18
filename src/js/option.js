export default function(data, vertical, height, salesVal, title) {
  // 参数说明：
  // data：图标数据
  // vertical设置柱状图的横向排布和纵向排布
  // height设置图标容器main的高度
  // salesVal标记是否为销售额，主要用于改变数据单位
  // 图标标题
  
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
  // vertical === horizontal,柱状图为水平方向，否则为垂直方向
  if (vertical === 'horizontal') {
    yAxis.data = barData.yAxisData
  } else {
    seriesPosition = 'top'
    xAxis.data = barData.yAxisData
  }
  return {
    title: title ? {
      text: title,
      // subtext: '纯属虚构',
      y: '10',
      x:'center'
    } : {},
    legend: {
      type: 'scroll',
      orient: 'horizontal',
      left: '3%',
      right: '3%',
      top: '40',
      data: barData.series.map((item) => {
        return item.name
      })
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
    series: series()
  }
}