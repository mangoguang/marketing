const state = {
  closedNum:''
}

const mutations = {
 setCustomerNum:(state,n) => {state.closedNum = n}
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