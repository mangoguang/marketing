import echarts from 'echarts'
import option from './option'

export default (_this, chartName, vertical, salesVal, title) => {
  const dom = _this.$refs[`${chartName}Container`]
  let temp = _this[`${chartName}Data`].series
  if (temp) {
    dom.style.height = `${vertical === 'horizontal' ? temp[0].data.length * (window.innerWidth/100) * 4 : 100}vw`
  } else {
    dom.style.height = `100vw`
  }
  // 参数说明：
  // data：图标数据
  // vertical设置柱状图的横向排布和纵向排布
  // height设置图标容器main的高度
  // salesVal标记是否为销售额，主要用于改变数据单位
  echarts.init(dom).setOption(option(_this[`${chartName}Data`], vertical, salesVal, title))
}