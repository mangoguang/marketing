import mango from '../../../js'

const state = {
  // tabStatus:mango.btnList(['订单信息', '需求信息', '个人评级'], 0),
  tabStatus:mango.btnList(['订单信息', '需求信息'], 0),
  // customerTabStatus:mango.btnList(['客户描述', '需求信息'], 0)
  customerTabStatus:mango.btnList(['客户描述', '需求信息'], 0),
  dealTabStatus: mango.btnList(['订单信息', '客户信息', '意向信息'], 0)
}

const mutations = {
  setTabStatus: (state, str) => state.tabStatus= str,
  setCustomerTabStatus: (state, str) => state.customerTabStatus= str,
  setDealTabStatus: (state, str) => state.dealTabStatus= str
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