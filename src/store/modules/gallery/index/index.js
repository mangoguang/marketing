export default {
  state: {
    leftNavList: [],
    listVal: ''
  },
  mutations: {
    setLeftNavList: (state, arr) => state.leftNavList = arr,
    getListVal(state) {
      state.leftNavList.forEach(item => {
        if(item.status) {
          state.listVal =  item.name
        }
      });
    }
  }
}
