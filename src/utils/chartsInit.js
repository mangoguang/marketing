import echarts from 'echarts'
import option from './option'

// 参数说明：
// data：图标数据
// vertical设置柱状图的横向排布和纵向排布
// height设置图标容器main的高度，可为空
// salesVal标记是否为销售额，主要用于改变数据单位
// routeTo图表点击事件，可不传
// chartsIndex如果是循环渲染图表，则传图表下标
export default (_this, chartName, vertical, salesVal, title, routeTo, chartsIndex) => {
  let [dom, chartsData] = [_this.$refs[`${chartName}Container`], _this[`${chartName}Data`]]
  // console.log('传入charts插件的数据：', chartsData)
  if (typeof(chartsIndex) === 'number') {
    dom = document.getElementById(`${chartName}Container${chartsIndex}`)
    chartsData = chartsData[chartsIndex]
  }
  let series = chartsData.series
  if (dom) {
    if (series) {
      dom.style.height = `${vertical === 'horizontal' ? (series[0].data.length * (window.innerWidth/100) * 4) + 80/(window.innerWidth/100) : 100}vw`      
    } else {
      dom.style.height = `100vw`
    }
  }

  if (series) {
    echarts.init(dom).setOption(option(chartsData, vertical, salesVal, title))
    if (routeTo) {
      // 如果需要添加点击事件，则添加点击事件。
      echarts.init(dom).on('click', function (data) {
        // console.log('点击的元素：', data)
        if (data.componentType === 'series') {
          routeTo(data, _this)
        }
      })
    }
  }
}