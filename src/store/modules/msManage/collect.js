const state = {
  title:'我的收藏',
  activeIndex:0,
  activeComponent:'collectArticle',
  tabList:[
    {
      tabName:'文章',
      componentName:'collectArticle'
    },
    {
      tabName:'常见问题',
      componentName:'collectFaq'
    },
    {
      tabName:'产品',
      componentName:'collectProduct'
    }
  ],
  messageBox:{
    showMessageBox:false,
    tip:'文章已不存在，是否从收藏夹中移除？',
    btnNum:2,
    type:false
  },
  singleArt:{
    articleId:'',
    index:''
  },
  articleData:[], 
  FaqList:[]
}

const mutations = {
  setActiveIndex: (state, index) => state.activeIndex=index,
  setActiveComponent :(state,index) => state.activeComponent=state.tabList[index].componentName,
  setMessageBox: (state, obj) => {
    state.messageBox.showMessageBox = obj.showMessageBox;
    state.messageBox.tip = obj.tip;
    state.messageBox.btnNum = obj.btnNum;
    state.messageBox.type = obj.type
  },
  clearSingleArt: (state, obj) => state.singleArt = obj,
  setArticleData: (state, array) => state.articleData =[...state.articleData,...array],
  setFaqList: (state, array) => state.FaqList =[...state.FaqList,...array],
  clearArticleData: state => state.articleData = [],
  removeArticle: (state,index) => state.articleData = state.articleData.splice(index,1),
  updateArticleData:(state, array) => state.articleData = array
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