const state = {
  allCustomerNum:0,
  params:{
    type:'',   //New:意向客户，Approved:成交客户，Closed:战败客户
    key:'',    //搜索关键字，电话或名字、微信
    page: 1,  //页数
    limit: 30,   //每页条数
    userId:''
  },
  list:[],
  allLoaded:false,
  scroll:0
}

const mutations = {
 setAllCustomerNum:(state,n) => {state.allCustomerNum = n},
 setAllCustomerParams:(state,obj) => {state.params=obj},
 setAllCustomerList:(state,array) => {
   state.list=[...state.list,...array]
 },
 setAllCustomerAllLoaded:(state,boolean) => {
   state.allLoaded=boolean
 },
 setAllCustomerScroll:(state,n) => {
   state.scroll=n;
 },
 setAllCustomerPage:(state) => {
   state.params.page++
 },
 initAllCustomerList:(state,array) => {
   state.list=array
   /*state.list = ['setAllCustomerNum','setAllCustomerParams','setAllCustomerList',
   'setAllCustomerAllLoaded','setAllCustomerScroll','setAllCustomerPage','initAllCustomerList']*/
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