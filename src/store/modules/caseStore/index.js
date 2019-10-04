export default {
  state: {
    browseData: {
      imgs: [],
      createByName: '',
      remark: ''
    },
    provice: '', //省市
    listStyle: 'cell-box',
    goodCase: {
      enable: '',
      goodId: '',
      remark: '666',
      source: '',
      frontImgFile: '',
      flankImgFile: '',
      diagonalImgFile: '',
      spareImgFile1: '',
      spareImgFile2: '',
      spareImgFile3: ''
    }
  },
  mutations: {
    setBrowseData: (state, data) => state.browseData = data,
    setProvice: (state, data) => state.provice = data,
    setListStyle: (state, data) => state.listStyle = data,
    setGoodCase: (state, data) => state.goodCase = Object.assign(state.goodCase, data)
  },
  getters: {

  }
}