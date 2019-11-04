import mango from '../../../js'
const state = {
  headerStatus: mango.btnList(['跟进意向', '成交意向', '流失意向', '所有客户'], 0),
  searchKey: ''
}

const mutations = {
  setHeaderStatus: (state, arr) => state.headerStatus = arr,
  setSearchKey: (state, str) => state.searchKey = str
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