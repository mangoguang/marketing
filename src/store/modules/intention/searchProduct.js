const state = {
 title:'选择产品',
 list:[
   {
     id:1,
     item:'BCK1-001'
   },
   {
    id:2,
    item:'BCK1-002'
  },
  {
    id:3,
    item:'BCK1-003'
  }
 ]
}

const mutations = {
  updateList:(state, array) => {state.list=array}
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