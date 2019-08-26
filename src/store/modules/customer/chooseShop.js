export default {
  state: {
    shopList: [],
    shopVal: '',
    descriptShopList: [],
    descriptShopVal: '',
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
    initDescriptShopList: (state,arr) => state.descriptShopList = arr,
    getDescriptShopVal(state, str) {
      state.descriptShopList.forEach(item => {
        if(item.status) {
          state.descriptShopVal = item.name
        }
      });
    },
    setBtn: (state,arr) => state.btn = arr
  }
}