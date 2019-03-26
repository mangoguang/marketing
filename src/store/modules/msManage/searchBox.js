const state = {
  titleList: [],
  timer: ''
}

const mutations = {
  setTitle: (state, obj) => state.titleList = obj,
  setTimer: (state, str) => state.timer = str
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