export default {
  state: {
    productNavList: [],
    productNavlistVal: '',
    downList: [],
    downListVal: '',
    filterList: [],
    filterVal: [],
    price: {
      price1: '',
      price2: ''
    }
  },
  mutations: {
    //获取产品列表顶部导航栏
    setProductNavList: (state, arr) => state.productNavList = arr,
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
    resetFilterList(state) {
      state.filterList.map(item => {
        item.child.map(el => {
          el.status = false
        })
      })
    },
    //获取筛选选中的值    //传过来的数据格式可能不是child =====
    getFilterVal(state) {
      state.filterVal = []
      state.filterList.forEach(el => {
        el.child.forEach(item => {
          if(item.status) {
            state.filterVal.push(item.name)
          }
        })
      });
    },
    setPrice: (state, obj) => state.price = obj
  }
}
