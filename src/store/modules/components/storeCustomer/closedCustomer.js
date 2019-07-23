const state = {
  closedNum:0,
  params:{
    type:'Closed',   //New:意向客户，Approved:成交客户，Closed:战败客户
    key:'',    //搜索关键字，电话或名字、微信
    sd:'',          //跟进日期
    ed:'',
    page: 1,  //页数
    limit: 30,   //每页条数
    userId:''
  },
  list:[],
  allLoaded:false,
  scroll:0
}

const mutations = {
 setClosedNum:(state,n) => {state.closedNum = n},
 setClosedParams:(state,obj) => {state.params=obj},
 setClosedList:(state,array) => {
   state.list=[...state.list,...array]
 },
 setClosedAllLoaded:(state,boolean) => {
   state.allLoaded=boolean
 },
 setClosedScroll:(state,n) => {
   state.scroll=n;
 },
 setClosedPage:(state) => {
   state.params.page++
 },
 initClosedList:(state,array) => {
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