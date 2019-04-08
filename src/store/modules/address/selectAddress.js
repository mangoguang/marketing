const state = {
 title:'选择地址',
 addressList:[]
}

const mutations = {
  updateAddress:(state, array) => {state.addressList=array}
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