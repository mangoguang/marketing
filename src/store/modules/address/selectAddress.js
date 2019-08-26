const state = {
  title:'选择地址',
  hasRecord:true,
  path:''
}

const mutations = {
  updateHasRecord:(state,boolean) => {state.hasRecord=boolean},
  updatePath:(state,str) => {state.path=str}
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