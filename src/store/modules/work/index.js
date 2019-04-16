const state = {
  textArea: '文本域文本'
}

const mutations = {
  setTextArea: (state, str) => state.textArea = str
}

export default {
  namespaced: true,
  state,
  mutations
}