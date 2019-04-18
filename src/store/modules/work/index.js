const state = {
  textArea: '文本域文本',
  curdayPlan: {}
}

const mutations = {
  setTextArea: (state, str) => state.textArea = str,
  setCurdayPlan: (state, obj) => state.curdayPlan = obj
}

export default {
  namespaced: true,
  state,
  mutations
}