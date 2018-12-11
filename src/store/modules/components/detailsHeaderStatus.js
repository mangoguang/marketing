import mango from '../../../js'

const state = {
  tabStatus:mango.btnList(['订单信息', '跟踪记录', '个人评级'], 0)
}

const mutations = {
  setTabStatus: (state, str) => state.tabStatus= str
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