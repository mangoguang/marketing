import mango from '../js/index'
// import chartsData from './data.js'
export default function(data, vertical, salesVal, title,radio) {
  console.log(998877, title)
  mango.sortArrs(data)
  // data = chartsData
  // mango.sortArrs(chartsData)
  // console.log(data)
  // 参数说明：
  // data：图标数据
  // vertical设置柱状图的横向排布和纵向排布
  // height设置图标容器main的高度
  // salesVal标记是否为销售额，主要用于改变数据单位
  // 图标标题
  //radio标记是否增加百分号显示
  let seriesPosition
  // vertical === horizontal,柱状图为水平方向，否则为垂直方向
  if (vertical === 'horizontal') {
    seriesPosition = 'inside'
  } else {
    seriesPosition = 'top'
  }
  console.log('option对象数据：', data)
  let [xAxis, yAxis, series] = [
    {
    // 直角坐标相关设置。
      axisTick: {
        show: false
        //alignWithLabel: true
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
      triggerEvent: true,
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
        color: "#999",
        rotate: 60
        
      }
    }, data.series.map((item, index) => {
      // console.log('数据', item.data)
      // item.sort(mango.compare(''))
      return {
        name: item.name,
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: seriesPosition,
            formatter:radio?function(params){
              if(params.value){
                //console.log('lll66:',params.value)
                return ((parseFloat(params.value)*100).toFixed(2))+"%"
              }else{
                return ''
              }
            }:function(params){}
          }
        },
        /* itemStyle:vertical==='horizontal'?{
          normal:{
            
          }
        }:{}, */
        barWidth: '10',
        //barMaxWidth:'15',
        //barWidth:'15',
         //barGap:'0',
        //barCategoryGap:'45',
        data: salesVal ? item.data.map((key) => {
          let temp = key
          if (temp == 0) {
            return ''
          } else {
            // seriesPosition = 'insideRight'
            return (key/10000).toFixed(2)
          }
        }) : item.data.map((key) => {
          let temp = key
          if (temp == 0) {
            return ''
          } else {
            // seriesPosition = 'insideRight'
            return key
          }
        }),
        markLine: data.siblings ? {
          // this.vertical === horizontal,柱状图为水平方向，否则为垂直方向
          data: vertical === 'horizontal' ? [
            {xAxis : salesVal ? (data.siblings/10000) : data.siblings, name: '平均值'}
          ] : [
            {yAxis : salesVal ? (data.siblings/10000) : data.siblings, name: '平均值'}
          ]
        } : {
          // data: [{type : 'average', name : '平均值'}]
        }
      }
    })]
    console.log('series数据：', series)
    // console.log('变量定义完成：')
    // console.log('shuju:', series)
    
    if (vertical === 'horizontal') {
      yAxis.data = data.yAxisData
    } else {
      let arr=series.map((item,index) => {
        return item.data[0]
      })
      let obj=series[0];
      obj.data=arr;
      obj.barMaxWidth=20
      obj.itemStyle={
        normal:{
          color: function(params) { 
            var colorList = ['#007aff', '#5ac8fa', '#ff2d55','#ffcc00']; 
            return colorList[params.dataIndex] 
          }
        }
      }
      series=obj;
      //console.log('坐标轴数据赋值：',series)
      xAxis.data = data.yAxisData
      //console.log('data.yAxisData', data.yAxisData)
    }
    
  return {
    title: title ? {
      text: title,
      // subtext: '纯属虚构',
      y: '10',
      x:'center'
    } : {},
    legend: vertical === 'horizontal'?{
      type: 'scroll',
      orient: 'horizontal',
      left: '3%',
      right: '3%',
      top: title ? '40' : '0',
      data: data.series.map((item) => {
        return item.name
      })}:{
        orient: 'horizontal',
        left: '3%',
        right: '3%',
        top: title ? '40' : '0',
        data:['']
      },
    noDataLoadingOption: {
      text: '暂无数据',
      effect: 'bubble',
      effectOption: {
        effect: {
            n: 0
        }
      }
    },
    grid: {
      left: '3%',
      bottom:'3%',
      top:  title ? '80' : '40',
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
    // series: []
    series: series
  }
}