// // 获取本地存储信息
// let ajaxData = localStorage.getItem('ajaxData')
// ajaxData = JSON.parse(ajaxData)

const state = {
  dealCustomerList: []
}

const mutations = {
  setDealCustomerList: (state, arr) => state.dealCustomerList = arr
  // setCustomerAjaxParams: (state, obj) => state.customerAjaxParams = obj
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