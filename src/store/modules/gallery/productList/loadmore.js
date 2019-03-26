export default {
  state: {
    productLimit: 10,
    productPageList: []
  },
  mutations: {
    setProductPage(state, obj) {
      let count = 0
      state.productPageList.map(item => {
        if(item.category == obj.category) {
          item.limit = obj.limit
        }else {
          count ++
        }
      });
      if(count === state.productPageList.length) {
        state.productPageList.push(obj)
      }
    },
    initPageList: (state, arr) => state.productPageList = arr,
    getProductLimit(state, category) {
      state.productPageList.forEach(item => {
        if(item.category === category) {
          state.productLimit = item.limit
        }
      });
    }
  }
}