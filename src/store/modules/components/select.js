const state = {
  citySelect: '',
  startTimeSelect: null,
  endTimeSelect: null,
  sexVal: '',
  areaVal: '',
  enterStoreVal: '',
  sourceVal: '',
  leaveStoreVal: "",
  shopVal: '',
  ageVal: '',
  discountVal: '',
  followVal: '',
  followTiming: '',
  buyReason: '',
  stylePref: '',
  progress:'',
  colorPref:'',
  houseType: '',
  elevatorVal:''
}

const mutations = {
  setCitySelect: (state, obj) => state.citySelect = obj,
  setStartTimeSelect: (state, str) => state.startTimeSelect = str,
  setEndTimeSelect: (state, str) => state.endTimeSelect = str,
  setSexVal: (state, str) => state.sexVal = str,
  setAreaVal: (state, str) => state.areaVal = str,
  setEnterStoreVal: (state, str) => state.enterStoreVal = str,
  setSourceVal: (state, str) => state.sourceVal = str,
  setLeaveStoreVal: (state, str) => state.leaveStoreVal = str,
  setShopVal: (state, str) => state.shopVal = str,
  setAgeVal: (state, str) => state.ageVal = str,
  setDiscountVal: (state, str) => state.discountVal = str,
  setFollowVal: (state, str) => state.followVal = str,
  setFollowTiming: (state, str) => state.followTiming = str,
  setBuyReason: (state, str) => state.buyReason = str,
  setStylePref: (state, str) => state.stylePref = str,
  setProgress: (state, str) => state.progress = str,
  setColorPref: (state, str) => state.colorPref = str,
  setHouseType: (state, str) => state.houseType = str,
  setElevatorVal: (state, str) => state.elevatorVal = str
}

const actions = {
  // asynsSelect(ctx) {		
  //   ctx.commit('setCitySelect')
  //   ctx.commit('setStartTimeSelect')
  //   ctx.commit('setEndTimeSelect')
  //   console.log(7878,ctx.state)
  // }
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