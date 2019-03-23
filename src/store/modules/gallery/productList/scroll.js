export default {
  state: {
    productScroll: 0,
    allCategoryScroll: [],
    categoryScroll: 0
  },
  mutations: {
    setProductScroll: (state, str) => state.productScroll = str,
    setAllCategoryList(state,obj) {
      var count = 0
      obj.forEach(item => {
        if(item.status) {
          state.allCategoryScroll.map(el => {
            if(el.category === item.name) {
              el.scroll = state.productScroll
            }else {
              count ++
            }
          })
          if(count === state.allCategoryScroll.length) {
            let parmas = {
              category: item.name,
              scroll: state.productScroll
            }
            state.allCategoryScroll.push(parmas)
          }
        }
      });
    },
    getCategoryScroll(state, str) {
      state.allCategoryScroll.forEach(el => {
        if(el.category === str) {
          state.categoryScroll = el.scroll
        }
      })
    }
  }
}