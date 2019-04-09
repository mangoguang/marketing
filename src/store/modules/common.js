const state = {
  dateInterVal: {}  // 日期插件的日期区间
}

const mutations = {
  setDateInterVal: (state, obj) => state.dateInterVal = obj
}

export default {
  state,
  mutations
}