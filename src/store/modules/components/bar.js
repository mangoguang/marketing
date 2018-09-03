const state = {
  barData: {
    legendData: ['利润', '支出', '收入'],
    yAxisData: ['3D', 'V6', '0769', '凯奇', '慕思儿童'],
    series: [{
      "data": [ 7, 1, 3, 1, 2 ],
      "name": "2018-07"
    }, {
      "data": [ 2, 5, 18, 1, 6 ],
      "name": "2017-08"
    }]
  }
}

const mutations = {
  setBarData: (state, obj) => state.barData = obj
}

const actions = {

}

const getters = {
  // homeArrFilter: state => state.homeArr.map(function(item, index, arr) {
  //   return item + '0'
  // })
}

export default {
  state,
  getters,
  actions,
  mutations
}