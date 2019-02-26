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
    }
  ],
  messageBox:{
    showMessageBox:false,
    tip:'文章已不存在，是否从收藏夹中移除？',
    btnNum:2,
    type:false
  },
  articleId:'',
  FaqList:[
    {
      title: '床垫除螨哪种工具最好？', // 问题标题
      questionId: '1' // 问题id
    },
     {
      title: '客户投诉怎么处理？', // 问题标题
      questionId: '2'// 问题id
    },
     {
      title: '按摩椅怎么安装？', // 问题标题
      questionId: '3' // 问题id
    },
     {
      title: '床架怎么安装？', // 问题标题
      questionId: '4' // 问题id
    },
     {
      title: '床垫除螨哪种工具最好？', // 问题标题
      questionId: '5'// 问题id
    },
     {
      title: '客户投诉怎么处理？', // 问题标题
      questionId: '6' // 问题id
    },
     {
      title: '客户投诉怎么处理？', // 问题标题
      questionId: '7' // 问题id
    },
     {
      title: '按摩椅怎么安装？', // 问题标题
      questionId: '8' // 问题id
    },
     {
      title: '床架怎么安装？', // 问题标题
      questionId: '9' // 问题id
    }
  ]
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