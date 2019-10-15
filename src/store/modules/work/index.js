const state = {
  textArea: '文本域文本',
  curdayPlan: {},
  orderData: {},
  orderSearchParam: {}
}

const mutations = {
  setTextArea: (state, str) => state.textArea = str,
  setCurdayPlan: (state, obj) => state.curdayPlan = obj,
  setOrderData: (state, obj) => state.orderData = obj,
  setOrderSearchParam: (state, obj) => state.orderSearchParam = obj
}

const getters = {
  orderList: state => state.orderData.records || ['1']
}

export default {
  state,
  getters,
  mutations
}