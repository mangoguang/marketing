import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import home from './modules/home'
import child from './modules/child'

export default new Vuex.Store({
  modules: {
    home,
    child
  }
})

// const store = new Vuex.Store({
//   state: {
//     homeArr: [1, 2],
//     childArr: [],
//     count: 0,
//     people: [{
//       'name': '张三',
//       'age': 25
//     }, {
//       'name': '李四',
//       'age': 26
//     }, {
//       'name': '王五',
//       'age': 27
//     }]
//   },
//   mutations: {
//     increment: state => state.count++,
//     decrement: state => state.count--,
//     homeArr: (state, arr) => state.homeArr = arr,
//     childArr: (state, arr) => state.childArr = arr
//   },
//   actions: {
//     incrementAsync({
//       commit
//     }) {
//       setTimeout(() => {
//         commit('increment')
//       }, 1000)
//     }
//   },
//   getters: {
//     peopleMsg: state => {
//       return state.people[1].name;
//     }
//   }
// })

// export default store