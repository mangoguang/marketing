const state = {
 title:'意向产品',
 list:[
   {
     id:1,
     item:'意向一',
     num:1
   },
   {
    id:2,
    item:'意向一',
    num:1
  },
  {
    id:3,
    item:'意向一',
    num:1
  }
 ]
}

const mutations = {
  updateList:(state, array) => {state.list=array},
  delList:(state, index) => state.list.splice(index,1)
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