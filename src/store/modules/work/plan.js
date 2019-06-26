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
                placeholder:'请填写事件标题',
                required:true
            },
            customerName:{
                label:'客户',
                placeholder:'请选择客户',
                required:false,
                showIcon:true,
                readonly:true
            },
            goodsName:{
                label:'客户意向',
                placeholder:'请选择客户意向',
                required:false,
                showIcon:true,
                readonly:true
            },
            address:{
                label:'位置',
                placeholder:'请填写位置',
                required:false
            },
            startTime:{
                label:'开始时间',
                placeholder:'请选择开始时间',
                required:true,
                showIcon:true,
                readonly:true
            },
            endTime:{
                label:'结束时间',
                placeholder:'请选择结束时间',
                required:false,
                showIcon:true,
                readonly:true
            },
            remark:{
                label:'事件详情',
                placeholder:'请输入事件详情',
                required:false
            } 
        }
    }
  
    const mutations = {
    
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