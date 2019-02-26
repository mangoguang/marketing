const state = {
  messageBox:{
    showMessageBox:false,
    tip:'文章已不存在，是否从收藏夹中移除？',
    btnNum:2,
    type:false
  },
  articleId:''
}

const mutations = {
  setMessageBox: (state, obj) => {
    state.messageBox.showMessageBox = obj.showMessageBox;
    state.messageBox.tip = obj.tip;
    state.messageBox.btnNum = obj.btnNum;
    state.messageBox.type = obj.type
  },
  setArticleId: (state, id) => state.articleId = id
  
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