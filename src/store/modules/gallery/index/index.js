export default {
  state: {
    leftNavList: [],    //主页左导航条的品牌分类加状态
    listVal: '',        //选中的值
    initlist: []        //品牌分类
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
