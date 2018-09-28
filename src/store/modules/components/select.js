const state = {
  citySelect: {},
  startTimeSelect: '',
  endTimeSelect: ''
}

const mutations = {
  setCitySelect: (state, obj) => state.citySelect = obj,
  setStartTimeSelect: (state, str) => state.startTimeSelect = str,
  setEndTimeSelect: (state, str) => state.endTimeSelect = str
}

const actions = {

}

const getters = {
  // homeArrFilter: state => state.homeArr.map(function(item, index, arr) {
  //   return item + '0'
  // })
}

export default {
  state,
  getters,
  actions,
  mutations
}