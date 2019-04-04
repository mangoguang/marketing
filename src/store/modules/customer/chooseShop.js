export default {
  state: {
    shopList: [],
    shopVal: '',
    btn: []
  },
  mutations: {
    initShopList: (state,arr) => state.shopList = arr,
    getShopVal(state, str) {
      state.shopList.forEach(item => {
        if(item.status) {
          state.shopVal = item.name
        }
      });
    },
    setBtn: (state,arr) => state.btn = arr
  }
}