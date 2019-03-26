import mango from '../../../../js'
export default {
  state: {
    list: mango.btnList(['综合', '最新发布', '价格↑', '价格↓', '收藏数'], 0),
    initNavList: [],
    productNavList: [],
    productNavlistVal: '',
    downList: [],
    downListVal: '',
    filterList: [],
    filterVal: [],
    price: {
      price1: '',
      price2: ''
    },
    showType: true
  },
  mutations: {
    //列表展现形式
    setShowType: (state, str) => state.showType = str,
    //获取产品列表顶部导航栏
    setProductNavList: (state, arr) => state.productNavList = arr,
    setInitNavList: (state, arr) => state.initNavList = arr,
    //获取选中的值
    getProductNavListVal(state) {
      state.productNavList.forEach(item => {
        if(item.status) {
          state.productNavlistVal =  item.name
        }
      });
    },
    //获取下啦排序列表
    setDownList: (state, arr) => state.downList = arr,
    //获取下啦排序选择值
    setDownListVal(state) {
      state.downList.forEach(item => {
        if(item.status) {
          state.downListVal =  item.name
        }
      });
    },
    //获取筛选列表
    setFilterList: (state, arr) => state.filterList = arr,
    // resetFilterList(state) {
    //   state.filterList.map(item => {
    //     item.child.map(el => {
    //       el.status = false
    //     })
    //   })
    // },
    resetFilterList(state, obj) {
      obj.map(item => {
        item.status = false
      })
      state.filterList = obj
    },
    //获取筛选选中的值    //传过来的数据格式可能不是child =====
    // getFilterVal(state) {
    //   state.filterVal = []
    //   state.filterList.forEach(el => {
    //     el.child.forEach(item => {
    //       if(item.status) {
    //         state.filterVal.push(item.name)
    //       }
    //     })
    //   });
    // },
    getFilterVal(state) {
      state.filterVal = []
      state.filterList.forEach(el => {
        if(el.status) {
          state.filterVal.push(el.name)
        }
      })
    },
    setPrice: (state, obj) => state.price = obj
  }
}
