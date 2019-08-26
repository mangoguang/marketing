const state = {
  allLoaded:false,
  list:[],
  params:{
    key:'',
    page:1,
    limit:30
  },
  scroll:0,
  storeNum:0
}

const mutations = {
  setStoreParmas:(state,obj) => {
    state.parmas=obj
  },
  setStoreList:(state,array) => {
    state.list=[...state.list,...array]
  },
  initStoreList:(state,array) => {
    state.list=array;
  },
  setAllLoaded:(state,boolean) => {
    state.allLoaded=boolean
  },
  setStoreScroll:(state,n) => {
    state.scroll=n
  },
  setPage:(state) => {
    state.params.page++
  },
  setStoreNum:(state,n) => {
    state.storeNum=n
  }
}

const actions = {

}

const getters = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}