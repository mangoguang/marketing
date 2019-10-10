export default {
    state:{
        areaLine:0,//区域下标
        dateLine:0,//时间下标
        areaMsg:''//区域信息
    },
    mutations:{
        setAreaLine:(state,str) => {
            state.areaLine = str
        },
        setdateLine:(state,str) => {
            state.dateLine = str
        },
        setAreaName:(state,str) => {
            state.areaMsg = str
        }
    }
}