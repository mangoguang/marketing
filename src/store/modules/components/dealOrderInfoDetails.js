
const state = {
  dealOrderInfoDetails: {
    demandList: []
  },
  totalPrice: 0,
  discountPrice: 0
}

const mutations = {
  setDealOrderInfoDetails: (state, arr) => state.dealOrderInfoDetails = arr,
  setTotalPrice: (state, arr) => state.totalPrice = arr,
  setDiscountPrice: (state, arr) => state.discountPrice = arr
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