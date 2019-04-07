const state = {
  title:'意见反馈',
  remark:'',
  contact:'',
  contactObj:{
    label:'联系方式',
    placeholder:'请留下您的联系方式'
  },
  messageBox:{
    showMessageBox:false,
    btnNum:1,
    type:true,
    tip:'提交成功！感谢您的反馈~'
  },
  imgList:[]
}

const mutations = {
  setMessageBox: (state, obj) => {
    state.messageBox.showMessageBox = obj.showMessageBox;
    state.messageBox.tip = obj.tip;
    state.messageBox.btnNum = obj.btnNum;
    state.messageBox.type = obj.type
  },
  updateRemark:(state, val) => {
    state.remark = val
  },
  updateContact:(state, val) => {
    state.contact = val
  },
  updateImgList:(state,array) => {
    state.imgList =array
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