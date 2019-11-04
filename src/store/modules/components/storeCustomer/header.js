const state = {
  headerStatus: [{
      name: '个人客户',
      status: true
    },
    {
      name: '门店客户',
      status: false
    }

  ],
  subHeaderStatus: [{
      name: '跟进意向',
      status: true
    },
    {
      name: '成交意向',
      status: false
    },
    {
      name: '流失意向',
      status: false
    },
    {
      name: '所有客户',
      status: false
    }
  ],
  subHeaderStatus2: [{
      name: '跟进意向',
      status: true
    },
    {
      name: '成交意向',
      status: false
    },
    {
      name: '流失意向',
      status: false
    }

  ],
  filterList: [{
      name: '全部',
      val: ''
    },
    {
      name: '紧急降序',
      val: 'u'
    },
    {
      name: '级别A到D',
      val: 'la'
    },
    {
      name: '级别D到A',
      val: 'ld'
    }
  ]
}

const mutations = {
  setHeaderStatus: (state, array) => {
    state.headerStatus = array
  },
  setSubHeaderStatus: (state, array) => {
    state.subHeaderStatus = array
  },
  setSubHeaderStatus2: (state, array) => {
    state.subHeaderStatus2 = array
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