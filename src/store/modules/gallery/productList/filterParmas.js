export default {
  state: {
    filterParmas: {
      account: '',
      category: '',
      brand: '',
      key: '',
      st: 0,
      rp: '',
      page: 1,
      limit: 10
    }
  },
  mutations: {
    setParmas(state, obj) {
      for(var item in obj) {
        if(item === 'category') {
          state.filterParmas.category = obj[item]
        }else if(item === 'brand'){
          state.filterParmas.brand = obj[item]
        }else if(item === 'key') {
          state.filterParmas.key = obj[item]
        }else if(item === 'st') {
          state.filterParmas.st = obj[item]
        }else if(item === 'rp') {
          state.filterParmas.rp = obj[item]
        }else if(item === 'page') {
          state.filterParmas.page = obj[item]
        }else if(item === 'limit') {
          state.filterParmas.limit = obj[item]
        }else if(item === 'account') {
          state.filterParmas.account = obj[item]
        }
      }
    }
  }
}