const state = {
  personMsg:{},
  chartActive: true
}

const mutations = {
  setPersonMsg: (state, obj) => state.personMsg = obj,
  setChartActive: (state, obj) => state.chartActive = obj
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