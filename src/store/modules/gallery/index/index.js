export default {
  state: {
    leftNavList: [],
    listVal: '',
    initlist: []
  },
  mutations: {
    setLeftNavList: (state, arr) => state.leftNavList = arr,
    setInitList: (state, arr) => state.initlist = arr,
    getListVal(state) {
      state.leftNavList.forEach(item => {
        if(item.status) {
          state.listVal =  item.name
        }
      });
    }
  }
}
