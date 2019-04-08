const state = {
 title:'地址管理',
 addressList:[]
}

const mutations = {
  updateAddress:(state, array) => {state.addressList=array},
  delAddress:(state, index) => state.addressList.splice(index,1)
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