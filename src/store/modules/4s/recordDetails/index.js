export default {
  state: {
    type: 'check',
    categories: [], //日常检查二级列表
    submitScoreData: { //提交打分数据
      "levelId": "", //星级id，一星检查id
      "shopId": "", //门店id
      "categoryList": [{
        "categoryId": "", //分类id
        "standardList": [{
          "standardId": "", //打分细项id
          "deduct": 0, //扣分分数
          "reason": "", //扣分理由
          "urls": [] //上传文件url集合
        }]
      }]
    },
    categoryListIndex: 0,
    standardListIndex: 0
  },
  mutations: {
    setType: (state, str) => state.type = str,
    setShopId: (state, shopId) => state.submitScoreData.shopId = shopId, //记录门店
    setLevelId: (state, levelId) => state.submitScoreData.levelId = levelId, //记录星级
    setCategories: (state, categories) => state.categories = categories, //日常检查二级列表
    setSubmitScoreData: (state, submitScoreData) => state.submitScoreData = submitScoreData, //提交打分数据
    setCategoryListIndex: (state, categoryListIndex) => state.categoryListIndex = categoryListIndex, //三级列表选中索引
    setStandardListIndex: (state, standardListIndex) => state.standardListIndex = standardListIndex //三级列表选中具体项索引
  },
  getters: {
    getCategories: (state) => state.categories //日常检查二级列表

  }
}