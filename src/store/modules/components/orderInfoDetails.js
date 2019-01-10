
const state = {
  orderInfoDetails: [],
  orderTotalPrice: '',
  orderDiscountPrice: ''
}

const mutations = {
  setOrderInfoDetails: (state, arr) => state.orderInfoDetails = arr,
  setOrderTotalPrice: (state, arr) => state.orderTotalPrice = arr,
  setOrderDiscountPrice: (state, arr) => state.orderDiscountPrice = arr
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