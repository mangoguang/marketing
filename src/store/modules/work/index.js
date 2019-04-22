const state = {
  textArea: '文本域文本',
  curdayPlan: {},
  orderData: {}
}

const mutations = {
  setTextArea: (state, str) => state.textArea = str,
  setCurdayPlan: (state, obj) => state.curdayPlan = obj,
  setOrderData: (state, obj) => state.orderData = obj
}

const getters = {
  orderList: state => state.orderData.records || []
}

export default {
  state,
  getters,
  mutations
}