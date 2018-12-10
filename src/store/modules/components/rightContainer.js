const state = {
  rightContainerStatus: 'hideRightContainer'
}

const mutations = {
  setRightContainerStatus: (state, str) => state.rightContainerStatus = str
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