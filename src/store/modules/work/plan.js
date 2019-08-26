    const state = {
        plan:{
            planName:'',
            address:'',
            startTime:'',
            endTime:'',
            customerId:'',
            customerName:'',
            opportunityId:'',
            remark:''
        },
        info:{
            planName:{
                label:'计划名称',
                placeholder:'请填写事件标题'
            },
            customerName:{
                label:'客户',
                placeholder:'请选择客户'
            },
            goodsName:{
                label:'客户意向',
                placeholder:'请选择客户意向'
            },
            address:{
                label:'位置',
                placeholder:'请填写位置'
            },
            startTime:{
                label:'开始时间',
                placeholder:'请选择开始时间'
            },
            endTime:{
                label:'结束时间',
                placeholder:'请选择结束时间'
            },
            remark:{
                label:'事件详情',
                placeholder:'请输入事件详情'
            } 
        },
        searchList:[]
    }
  
    const mutations = {
        setSearchList:(state,array) => {
            state.searchList = array
        },
        setPlan:(state,obj) => {
            state.plan = obj
        }
    }
    
    const getters = {
        
    }
    const actions = {

    }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations

  }