const state = {
  customerAjaxParams:{
    type:'New',   //New:意向客户，Approved:成交客户，Closed:战败客户
    key:'',    //搜索关键字，电话或名字、微信
    sort:'',      //u:紧急排序，la:意向分类升序，ld:意向分类倒序
    sd:'',          //跟进日期
    ed:'',
    u:'',     //1:紧急，0不紧急
    l:'',    //
    page: 1,  //页数
    limit: 30,    //每页条数
    userId:''
  },
  list:[],
  allLoaded:false,
  scroll:0
}

const mutations = {
 setSort:(state,str) => {state.customerAjaxParams.sort=str},
 setKey:(state,str) => {state.customerAjaxParams.key=str},
 setStoreCustomerAjaxParams:(state,obj) => {state.customerAjaxParams=obj},
 setCustomerList:(state,array) => {
   state.list=[...state.list,...array]
 },
 setCustomerAllLoaded:(state,boolean) => {
   state.allLoaded=boolean
 },
 setCustomerScroll:(state,n) => {
   state.scroll=n;
 },
 setCustomerPage:(state) => {
   state.customerAjaxParams.page++
 },
 initCustomerList:(state,array) => {
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