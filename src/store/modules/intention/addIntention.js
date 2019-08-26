const state = {
  title:'新增意向',
  formInfo:{
    intention:{
      label:'意向产品',
      placeholder:'请选择意向产品'
    },
    store:{
      label:'所属门店',
      placeholder:'请选择门店',
      required:true
    },
    time:{
      label:'创建日期',
      placeholder:'请选择创建日期',
      required:true
    },
    duration:{
      label:'留店时长',
      placeholder:'请选择留店时长',
      required:true
    },
    source:{
      label:'客户来源',
      placeholder:'请选择客户来源',
      required:true
    },
    address:{
      label:'客户地址',
      placeholder:'请选择客户地址',
      required:true
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
    classify:["A","B","C","D"],
    urgency:['是','否']
  },
  titleModule:{
    info:'意向信息',
    report:'跟进情况',
    order:'订单信息'
  }
 
  

 
}

const mutations = {
  updateTitle:(state,str) => {state.title=str},
  setClassify:(state,array) => {state.formInfo.classify=array}
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