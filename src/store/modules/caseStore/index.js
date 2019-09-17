export default {
  state: {
    browseData: {
      imgs: [],
      createByName: '',
      remark: ''
    }
  },
  mutations: {
    setBrowseData: (state, data) => state.browseData = data
  },
  getters: {

  }
}