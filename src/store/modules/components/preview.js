const state = {
  picVal:[]
}

const mutations = {
  updatePic:(state,index) => state.picVal.splice(index,1)
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