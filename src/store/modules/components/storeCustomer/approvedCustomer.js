const state = {
  approvedNum:0,
  approvedParams:{
    type:'Approved',   //New:意向客户，Approved:成交客户，Closed:战败客户
    key:'',    //搜索关键字，电话或名字、微信
    sd:'',          //跟进日期
    ed:'',
    page: 1,  //页数
    limit: 30,    //每页条数
    userId:''
  },
  list:[],
  allLoaded:false,
  scroll:0
}

const mutations = {
 setApprovedNum:(state,n) => {state.approvedNum = n},
 setApprovedParams:(state,obj) => {state.approvedParams=obj},
 setApprovedList:(state,array) => {
   state.list=[...state.list,...array]
 },
 setApprovedAllLoaded:(state,boolean) => {
   state.allLoaded=boolean
 },
 setApprovedScroll:(state,n) => {
   state.scroll=n;
 },
 setApprovedPage:(state) => {
   state.approvedParams.page++
 },
 initApprovedList:(state,array) => {
   state.list=array
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