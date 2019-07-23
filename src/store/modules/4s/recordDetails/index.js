export default {
  state: {
    type: 'check',
    categories: [],
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
    }
  },
  mutations: {
    setType: (state, str) => state.type = str,
    setShopId: (state, shopId) => state.submitScoreData.shopId = shopId, //记录门店
    setCategories: (state, categories) => state.categories = categories
  },
  getters: {
    getCategories: (state) => state.categories
  }
}