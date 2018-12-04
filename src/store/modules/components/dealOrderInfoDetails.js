
const state = {
  dealOrderInfoDetails: []
}

const mutations = {
  setDealOrderInfoDetails: (state, arr) => state.dealOrderInfoDetails = arr
  // setCustomerAjaxParams: (state, obj) => state.customerAjaxParams = obj
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