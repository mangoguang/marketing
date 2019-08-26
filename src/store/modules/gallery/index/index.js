export default {
  state: {
    leftNavList: [],    //主页左导航条的品牌分类加状态
    listVal: '',        //选中的值
    initlist: [],        //品牌分类
    classifyScroll: 0,
    classifyScrollList: []
  },
  mutations: {
    initListVal: (state, arr) => state.listVal = arr,
    setLeftNavList: (state, arr) => state.leftNavList = arr,
    setInitList: (state, arr) => state.initlist = arr,
    getListVal(state) {
      state.leftNavList.forEach(item => {
        if(item.status) {
          state.listVal =  item.name
        }
      });
    },
    setClassifyScrollList(state, obj) {
      let count = 0
      state.classifyScrollList.map(item => {
        if(item.name === obj.name) {
          item.scroll = obj.scroll
        }else {
          count ++
        }
      })
      if(count === state.classifyScrollList.length) {
        state.classifyScrollList.push(obj)
      }
    },
    getClassScroll(state, name) {
      state.classifyScrollList.forEach(item => {
        if(item.name === name) {
          state.classifyScroll = item.scroll
        }
      })
    },
    initClassifyScrollList: (state, arr) => state.classifyScrollList = arr,
    initClassifyScroll: (state, num) => state.classifyScroll = num
  }
}
