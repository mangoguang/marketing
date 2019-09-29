export default {
  state: {
    browseData: {
      imgs: [],
      createByName: '',
      remark: ''
    },
    provice: '广州', //省市
    listStyle: 'cell-box'
  },
  mutations: {
    setBrowseData: (state, data) => state.browseData = data,
    setProvice: (state, data) => state.provice = data,
    setListStyle: (state, data) => state.listStyle = data
  },
  getters: {

  }
}