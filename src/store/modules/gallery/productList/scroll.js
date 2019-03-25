export default {
  state: {
    productScroll: 0,
    allCategoryScroll: []
  },
  mutations: {
    setProductScroll: (state, arr) => state.productScroll = arr,
    setAllCategoryList(state, obj) {
      let count = 0
      state.allCategoryScroll.forEach(item => {
        if(item) {
          if(item.category === obj.category) {
            item.scroll = obj.scroll
          }else {
            count ++
          }
        }
      })
      if(count === state.allCategoryScroll.length) {
        state.allCategoryScroll.push(obj)
      }
    },
    getProductScroll(state, category) { //比较三级id
      state.allCategoryScroll.forEach(item => {
        if(item.category == category) {
          state.productScroll = item.scroll
        }
      })
    },
    initAllCategoryScroll:(state,str) => state.allCategoryScroll = str
  }
}

// export default {
//   state: {
//     productScroll: 0,
//     allCategoryScroll: [],
//     categoryScroll: 0
//   },
//   mutations: {
//     setProductScroll: (state, str) => state.productScroll = str,
//     setAllCategoryList(state,obj) {
//       var count = 0
//       obj.forEach(item => {
//         if(item.status) {
//           state.allCategoryScroll.map(el => {
//             if(el.category === item.name) {
//               el.scroll = state.productScroll
//             }else {
//               count ++
//             }
//           })
//           if(count === state.allCategoryScroll.length) {
//             let parmas = {
//               category: item.name,
//               scroll: state.productScroll
//             }
//             state.allCategoryScroll.push(parmas)
//           }
//         }
//       });
//     },
//     getCategoryScroll(state, str) {
//       state.allCategoryScroll.forEach(el => {
//         if(el.category === str) {
//           state.categoryScroll = el.scroll
//         }
//       })
//     },
//     initAllCategoryScroll: (state, arr) => state.allCategoryScroll = arr
//   }
// }