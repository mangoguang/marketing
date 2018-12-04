import mango from '../../../js'
const state = {
  headerStatus: mango.btnList(['我的客户', '订单查询', '成交客户'], 0)
}

const mutations = {
  setHeaderStatus: (state, arr) => state.headerStatus = arr
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