const state = {
  dealList: [],
  orderList: [],
  myCusList: []
}

const mutations = {
  setDealList: (state, arr) => state.dealList = arr,
  setOrderList: (state, str) => state.orderList = str,
  setMyCusList: (state, str) => state.myCusList = str
}

const actions = {

}

const getters = {
  // customerListFilter: state => state.customerList.records.map(function(item, index, arr) {
  //   return item + '0'
  // })
}

export default {
  state,
  getters,
  actions,
  mutations
}