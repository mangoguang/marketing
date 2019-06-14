const state = {
  approvedNum:''
}

const mutations = {
 setCustomerNum:(state,n) => {state.approvedNum = n}
}

const actions = {

}

const getters = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}