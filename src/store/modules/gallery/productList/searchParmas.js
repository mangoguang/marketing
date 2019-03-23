export default {
  state: {
    searchParmas: {
      category: '',
      account: '',
      brand: '',
      key: '',
      st: 0,
      rp: '',
      page: 1,
      limit: 10
    },
    initParmas: {
      category: '',
      account: '',
      brand: '',
      key: '',
      st: 0,
      rp: '',
      page: 1,
      limit: 10
    }
  },
  mutations: {
    setSearchParmas(state, obj) {
      for(var item in obj) {
        if(item === 'category') {
          state.searchParmas.category = obj[item]
        }else if(item === 'brand'){
          state.searchParmas.brand = obj[item]
        }else if(item === 'key') {
          state.searchParmas.key = obj[item]
        }else if(item === 'st') {
          state.searchParmas.st = obj[item]
        }else if(item === 'rp') {
          state.searchParmas.rp = obj[item]
        }else if(item === 'page') {
          state.searchParmas.page = obj[item]
        }else if(item === 'limit') {
          state.searchParmas.limit = obj[item]
        }else if(item === 'account') {
          state.searchParmas.account = obj[item]
       }
      }
    },
    setInitParmas(state) {
      state.searchParmas = state.initParmas
      state.searchParmas.key = ''
    }
  }
}