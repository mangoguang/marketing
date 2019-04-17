const state = {
  title:'意向详情',
  formInfo:{
    intention:{
      label:'意向产品',
      placeholder:'请选择意向产品'
    },
    store:{
      label:'所属门店',
      placeholder:'请选择门店'
    },
    time:{
      label:'进店日期',
      placeholder:'请选择进店日期'
    },
    duration:{
      label:'留店时长',
      placeholder:'请选择留店时长'
    },
    source:{
      label:'客户来源',
      placeholder:'请选择客户来源'
    },
    address:{
      label:'客户地址',
      placeholder:'请选择客户地址'
    },
    house:{
      label:'户型大小',
      placeholder:'请先选择客户地址'
    },
    elevator:{
      label:'有无电梯',
      placeholder:'请先选择客户地址'
    },
    reason:{
      label:'购买原因',
      placeholder:'请选择购买原因'
    },
    style:{
      label:'装修风格',
      placeholder:'请填写装修风格'
    },
    progress:{
      label:'装修进度',
      placeholder:'请选择装修进度'
    },
    goods:{
      label:'竞品产品',
      placeholder:'请填写竞品产品'
    },
    color:{
      label:'颜色偏好',
      placeholder:'请填写颜色偏好'
    },
    budget:{
      label:'预算金额',
      placeholder:'请填写预算金额'
    },
    deliver:{
      label:'需求日期',
      placeholder:'请填写需求日期'
    },
    paid:{
      label:'已交定金',
      placeholder:'请填写已交金额'
    },
    discount:{
      label:'已谈折扣',
      placeholder:'请选择已谈折扣'
    },
    remark:{
      label:'备注信息',
      placeholder:'添加备注信息'
    },
    classify:[],
    urgency:[]
  },
  titleModule:{
    info:'意向信息',
    report:'跟进情况',
    order:'订单信息'
  }
 
  

 
}

const mutations = {
  setClassify:(state,array) => state.classify=array,
  setUrgency:(state,array) => state.urgency=array
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