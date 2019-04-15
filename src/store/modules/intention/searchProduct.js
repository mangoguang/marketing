const state = {
 title:'选择产品',
 list:[]
}

const mutations = {
  updateList:(state, array) => {state.list=array}
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