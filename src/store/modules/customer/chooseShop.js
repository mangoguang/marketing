export default {
  state: {
    shopList: [],
    shopVal: ''
  },
  mutations: {
    initShopList: (state,arr) => state.shopList = arr,
    getShopVal(state, str) {
      state.shopList.forEach(item => {
        if(item.status) {
          state.shopVal = item.name
        }
      });
    }
  }
}