export default {
  state: {
    collectLimit: 0,
    collectScorll: 0
  },
  mutations: {
    setCollectLimit(state, num) {
      state.collectLimit = num
    },
    setCollectScorll: (state, num) => state.collectScorll = num
  }
}