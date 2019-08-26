export default {
  state: {
    listScroll: 0,
    msManageList: [],
    artList: [],
    listAllScroll: []
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
    getInitList:(state,arr) => state.artList = arr,
    setListAllScroll(state, obj) {
      let count = 0
      state.listAllScroll.map(item => {
        if(item) {
          if(item.id == obj.id) {
            item.scroll = obj.scroll
          }else {
            count ++
          }
        }
      })
      if(count === state.listAllScroll.length) {
        state.listAllScroll.push(obj)
      }
    },
    getScroll(state, id) { //比较三级id
      state.listAllScroll.forEach(item => {
        if(item.id == id) {
          state.listScroll = item.scroll
        }
      })
    },
    initSrcoll:(state,str) => state.listAllScroll = str
  }
}