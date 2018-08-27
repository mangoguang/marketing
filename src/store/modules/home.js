// export default {
//   state: {
//     homeTit: '',
//     homeArr: [1, 2]
//   },
//   mutations: {
//     homeTit: (state, str) => state.homeTit = str,
//     homeArr: (state, arr) => state.homeArr = arr
//   },
//   actions: {

//   },
//   getters: {

//   }
// }
const state = {
  homeTit: '',
  homeText: '123',
  homeArr: [1, 2]
}

const mutations = {
  setHomeTit: (state, str) => state.homeTit = str,
  setHomeText: (state, str) => state.homeText = str,
  setHomeArr: (state, arr) => state.homeArr = arr
}

const actions = {

}

const getters = {
  homeArrFilter: state => state.homeArr.map(function(item, index, arr) {
    return item + '0'
  })
}

export default {
  state,
  getters,
  actions,
  mutations
}