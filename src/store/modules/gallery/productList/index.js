export default {
  state: {
    productNavList: [],
    productNavlistVal: '',
    downList: [],
    downListVal: ''
  },
  mutations: {
    setProductNavList: (state, arr) => state.productNavList = arr,
    getProductNavListVal(state) {
      state.productNavList.forEach(item => {
        if(item.status) {
          state.productNavlistVal =  item.name
        }
      });
    },
    setDownList: (state, arr) => state.downList = arr,
    setDownListVal(state) {
      state.downList.forEach(item => {
        if(item.status) {
          state.downListVal =  item.name
        }
      });
    }
  }
}
