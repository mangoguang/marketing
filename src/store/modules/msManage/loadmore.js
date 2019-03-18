export default {
  state: {
    listScroll: 0,
    msManageList: [],
    listId: {}
  },
  mutations: {
    setListScroll: (state, arr) => state.listScroll = arr,
    setMsManageList: (state, arr) => state.msManageList = arr,
    setListId: (state, arr) => state.listId = arr
  }
}