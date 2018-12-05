


const state = {
  dealCustomerList: []
}

const mutations = {
  setDealCustomerList: (state, arr) => state.dealCustomerList = arr
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