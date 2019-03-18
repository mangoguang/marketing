export default {
  state: {
    listScroll: 0,
    msManageList: [],
    artList: []
  },
  mutations: {
    setListScroll: (state, arr) => state.listScroll = arr,
    setMsManageList(state,obj) {
      let count = 0
      state.msManageList.forEach(item => {
        if(item) {
          if(item[0].id == obj[0].id) {
            item[1].list = obj[1].list
          }else {
            count ++
          }
        }
      })
      if(count === state.msManageList.length) {
        state.msManageList = [...state.msManageList, obj]
      }
    },
    getList(state, id) { //比较三级id
      state.msManageList.forEach(item => {
        if(item[0].id == id) {
          state.artList = item[1].list
        }
      });
    },
    getInitList:(state,arr) => state.artList = arr
  }
}