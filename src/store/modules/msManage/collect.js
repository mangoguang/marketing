const state = {
  title: '我的收藏',
  activeIndex: 0,
  activeComponent: 'collectArticle',
  tabList: [{
      tabName: '文章',
      componentName: 'collectArticle'
    },
    {
      tabName: '常见问题',
      componentName: 'collectFaq'
    },
    {
      tabName: '产品',
      componentName: 'collectProduct'
    },
    {
      tabName: '案例',
      componentName: 'collectCase'
    }
  ],
  messageBox: {
    showMessageBox: false,
    tip: '文章已不存在，是否从收藏夹中移除？',
    btnNum: 2,
    type: false
  },
  singleArt: {
    articleId: '',
    index: ''
  },
  singleFaq: {
    id: '',
    index: ''
  },
  articleData: [],
  FaqList: []
}

const mutations = {
  setActiveIndex: (state, index) => state.activeIndex = index,
  setActiveComponent: (state, index) => state.activeComponent = state.tabList[index].componentName,
  setMessageBox: (state, obj) => {
    state.messageBox.showMessageBox = obj.showMessageBox;
    state.messageBox.tip = obj.tip;
    state.messageBox.btnNum = obj.btnNum;
    state.messageBox.type = obj.type
  },
  clearSingleArt: (state, obj) => state.singleArt = obj,
  clearSingleFaq: (state, obj) => state.singleFaq = obj,
  setArticleData: (state, array) => state.articleData = [...state.articleData, ...array],
  setFaqList: (state, array) => state.FaqList = [...state.FaqList, ...array],
  clearArticleData: state => state.articleData = [],
  clearFaqList: state => state.FaqList = [],
  removeArticle: (state, index) => state.articleData.splice(index, 1),
  removeFaq: (state, index) => state.FaqList.splice(index, 1)
}

const actions = {
  //delArt:({commit}, i) => commit("removeArticle",i),
  //delFaq:({commit}, i) => commit("removeFaq",i)
}

const getters = {
  newArtData: state => state.articleData,
  newFaqList: state => state.FaqList
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}