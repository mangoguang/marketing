
const state = {
  dealOrderInfoDetails: {
    demandList: []
  }
}

const mutations = {
  setDealOrderInfoDetails: (state, arr) => state.dealOrderInfoDetails = arr
  // setCustomerAjaxParams: (state, obj) => state.customerAjaxParams = obj
}

const actions = {

}

const getters = {
  // demandList: state => {
  //   // console.log(444, state, state.dealOrderInfoDetails.demandList)
  //   if (state.dealOrderInfoDetails.demandList) {
  //     state.dealOrderInfoDetails.demandList.map(item => {
  //       return item.intention
  //     })
  //   }
  // }
}

export default {
  state,
  getters,
  actions,
  mutations
}