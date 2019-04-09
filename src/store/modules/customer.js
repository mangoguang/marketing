const state = {
  customerList: [],
  customerAjaxParams: {
    page: 1,   //页数
    limit: 50,    //每页条数
    type: '',     //New:意向客户，Approved：成交客户，Closed：战败客户
    sort: '',      //u：紧急排序，l：意向分类排序
    sd: '',          //跟进日期
    ed: '',
    u: '',     //1：紧急，0不紧急
    l: '',     // A B C
    key: ''    //搜索关键字，电话或名字
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