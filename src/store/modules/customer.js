const state = {
  customerList: [],
  customerAjaxParams: {
    page: 1,   //页数
    limit: 9,    //每页条数
    u: '',   //1:紧急排序，0：非
    i: '',   //1关键排序
    uo: 1,   // 1:紧急排序，0：非
    io: 1,   // //1关键排序
    key: '',     //搜索关键字，电话或名字
    startTime: '',
    endTime: '',
    tut: 0,   //只看今天更新数据 ,优先级最高
    tenantId: '',
    account: ''
  },
  newCustomerInfo: {},
  customerDemand: {},
  customerInfoBtns: [],
  allLoaded: false
}

const mutations = {
  setCustomerList: (state, arr) => state.customerList = arr,
  setCustomerAjaxParams: (state, obj) => state.customerAjaxParams = obj,
  setNewCustomerInfo: (state, obj) => state.newCustomerInfo = obj,
  setCustomerDemand: (state, obj) => state.customerDemand = obj,
  setCustomerInfoBtns: (state, arr) => state.customerInfoBtns = arr,
  setAllLoaded: (state, boolean) => state.allLoaded = boolean
}

const actions = {

}

const getters = {
  // customerListFilter: state => state.customerList.records.map(function(item, index, arr) {
  //   return item + '0'
  // })
}

export default {
  state,
  getters,
  actions,
  mutations
}