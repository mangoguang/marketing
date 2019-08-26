const state = {
  customerScroll: 0,
  orderScroll: 0,
  dealScroll: 0,
  newCustomerScroll: 0,
  allScroll:0
}

const mutations = {
  setCustomerScroll: (state, arr) => state.customerScroll = arr,
  setOrderScroll: (state, str) => state.orderScroll = str,
  setDealScroll: (state, str) => state.dealScroll = str,
  setAllScroll: (state, str) => state.allScroll = str,
  setNewCustomerScroll: (state, str) => state.newCustomerScroll = str
}



export default {
  state,
  mutations
}