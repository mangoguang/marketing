// export default {
//   state: {
//     childArr: [1, 2]
//   },
//   mutations: {
//     childArr: (state, arr) => state.childArr = arr
//   },
//   actions: {

//   },
//   getters: {
//     childArrFilter: state => state.childArr.map(function(item, index, arr) {
//       return item * 3
//     })
//   }
// }

const state = {
  childArr: [1, 2]
}

const mutations = {
  childArr: (state, arr) => state.childArr = arr
}

const actions = {

}

const getters = {
  childArrFilter: state => state.childArr.map(function(item, index, arr) {
    return item * 3
  }),
  childArrAddTen: state => state.childArr.map(function(item, index, arr) {
    return item + 10
  })
}

export default {
  state,
  getters,
  actions,
  mutations
}