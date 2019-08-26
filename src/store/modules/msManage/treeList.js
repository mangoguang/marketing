const state = {
  parmas: {},
  list: [],
  baseUrl: ''
}

const mutations = {
  setParmas: (state, obj) => state.parmas = obj,
  setList: (state, obj) => state.list = obj,
  setBaseUrl: (state, obj) => state.baseUrl = obj
}

const actions = {

}

const getters = {

}

export default {
  state,
  getters,
  actions,
  mutations
}