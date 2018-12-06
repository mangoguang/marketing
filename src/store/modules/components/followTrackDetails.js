
const state = {
  followTrackDetails: []
}

const mutations = {
  setFollowTrackDetails: (state, arr) => state.followTrackDetails = arr
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