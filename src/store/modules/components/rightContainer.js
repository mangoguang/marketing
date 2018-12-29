const state = {
  rightContainerStatus: 'hideRightContainer',
  rightTimeSelect: false,
  rightHeadTitle:'',
  customerTime:{
    stratTime: '',
    endTime: ''
  },
  isSelectStatus:false,
  dealTime:{
    stratTime: '',
    endTime: ''
  }
}

const mutations = {
  setRightContainerStatus: (state, str) => state.rightContainerStatus = str,
  setRightTimeSelect: (state, str) => state.rightTimeSelect = str,
  setRightHeadTitle: (state, str) => state.rightHeadTitle = str,
  setCustomerTime: (state, str) => state.customerTime = str,
  setIsSelectStatus: (state, str) => state.isSelectStatus = str,
  setDealTime: (state, str) => state.dealTime = str
}

const actions = {

}

const getters = {
  // homeArrFilter: state => state.homeArr.map(function(item, index, arr) {
  //   return item + '0'
  // })
}

export default {
  state,
  getters,
  actions,
  mutations
}