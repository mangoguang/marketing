


const state = {
  allCustomerList: [],
  allLength:0
}

const mutations = {
  setAllCustomerList: (state, arr) => state.allCustomerList = arr,
  setAllLength: (state, arr) => state.allLength = arr
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