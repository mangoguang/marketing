import echarts from 'echarts'
import option from './option'

let chartsInit;
let chanrtDom;
// true为空
function emptyData(data) {
  return data.every((item, index) => {
    return item.data.every((item, index) => {
      return item <= 0 || item == undefined
    })
  })
}
export {
  emptyData
}

function emptybarData(arr) {
  // console.log(9999999, arr)
  return arr.every((item, index) => {
    return item.data[0] <= 0
  })
}
export {
  emptybarData
}

function emptyPieData(arr) {
  // console.log(9999999, arr)
  return arr.every((item, index) => {
    return item <= 0
  })
}
export {
  emptyPieData
}

// 参数说明：
// data：图标数据
// vertical设置柱状图的横向排布和纵向排布
// height设置图标容器main的高度，可为空
// salesVal标记是否为销售额，主要用于改变数据单位
// routeTo图表点击事件，可不传
// chartsIndex如果是循环渲染图表，则传图表下标
chartsInit = (_this, chartName, vertical, salesVal, title, routeTo, chartsIndex, radio, source, brands) => {
  let [dom, chartsData] = [_this.$refs[`${chartName}Container`], _this[`${chartName}Data`]]
  // console.log('传入charts插件的数据：', chartsData)
  if (typeof (chartsIndex) === 'number') {
    dom = document.getElementById(`${chartName}Container${chartsIndex}`)
    
    chartsData = chartsData[chartsIndex]
  }
  // console.log(chartsData);

  let series = chartsData.series
  // console.log(series);

  // console.log(dom);

  if (dom) {
    if (series) {
      // dom.style.width = `100vw`
      var dataLength = 2.5
      chartsData.yAxisData.forEach(item => {
        if(item) {
          dataLength++
        }
      })
      
      if (source) {
        dom.style.height = `${vertical === 'horizontal' ? (dataLength * (window.innerWidth/100) * 13) + 100/(window.innerWidth/100) : 100}vw`
      } else {
        dom.style.height = `${vertical === 'horizontal' ? (dataLength * (window.innerWidth/100) * 4) + 100/(window.innerWidth/100) : 100}vw`
      }

      // dom.style.minHeight = `1000vw`    
    } else {
      dom.style.height = `100vw`
      dom.style.width = `100vw`
    }
  }
  if (dom) {
    // console.log(4);

    if (series) {
      // console.log(5);

      // console.log(JSON.stringify(chartsData))
      console.log(option(chartsData, vertical, salesVal, title, radio, brands));
      var mychart =  echarts.init(dom)
      mychart.clear()
      mychart.setOption(option(chartsData, vertical, salesVal, title, radio, brands))
      chanrtDom = mychart
      if (routeTo) {
        // 如果需要添加点击事件，则添加点击事件。
        mychart.on('click', function (data) {
          if (data.componentType === 'series') {
            routeTo(data, _this)
          }
        })
      }
    }
  }
}

export default chartsInit;
export {
  chanrtDom
}