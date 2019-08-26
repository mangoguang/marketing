const state = {
  tabList:[{title:'总部',status:true},{title:'经销商',status:false}],
  list:[],
  bossList:[],
  params:{
      publisher:0,
      page:1,
      limit:10,
      titleName:''
  },
  bossParams:{
      publisher:1,
      page:1,
      limit:10,
      titleName:''
  },
  allLoaded:false,
  bossAllLoaded:false,
  scroll:0,
  bossScroll:0
}

const mutations = {
  setList:(state,array) => {
    state.list=[...state.list,...array]
  },
  initList:(state,array) => {
    state.list=array
  },
  setBossList:(state,array) => {
    state.bossList=[...state.bossList,...array]
  },
  initBossList:(state,array) => {
    state.bossList=array
  },
  paramsAddPage:(state) => {
    state.params.page++
  },
  bossAddPage:(state) => {
    state.bossParams.page++
  },
  setAllLoaded:(state,boolean) => {
    state.allLoaded = boolean
  },
  setBossAllLoaded:(state,boolean) => {
    state.bossAllLoaded = boolean
  },
  setScroll:(state,n) => {
    state.scroll = n
  },
  setBossScroll:(state,n) => {
    state.bossScroll = n
  },
  setParams:(state,obj) => {
    state.params = obj
  },
  setBossParams:(state,obj) => {
    state.bossParams = obj
  },
  setTabList:(state,array) => {
    state.tabList = array
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