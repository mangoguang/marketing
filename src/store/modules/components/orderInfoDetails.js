
const state = {
  orderInfoDetails: []
}

const mutations = {
  setOrderInfoDetails: (state, arr) => state.orderInfoDetails = arr
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