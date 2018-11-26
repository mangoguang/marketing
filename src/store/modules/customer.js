const state = {
  customerList: []
}

const mutations = {
  setCustomerList: (state, arr) => state.customerList = arr
}

const actions = {

}

const getters = {
  // homeArrFilter: state => state.homeArr.map(function(item, index, arr) {
  //   return item + '0'
  // })
}

export default {
  state,
  getters,
  actions,
  mutations
}