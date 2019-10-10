export default {
    state: {
        areaIndex: 0, //区域下标
        areaContent: '', //区域文本
        brandIndex: 0, //品牌下标
        brandContent: '', //品牌文本
        dateIndex: 0, //时间下标
        dateContent: '', //时间文本
        startTimeSelect: '', //开始时间
        endTimeSelect: '' //结束时间
    },
    mutations: {
        setArea: (state, str) => {
            if (!str) {
                state.areaIndex = 0
                state.areaContent = ''
                return
            }
            state.areaIndex = str.index
            state.areaContent = str.value.name
        }, //设置区域下标
        setBrand: (state, str) => {
            if (!str) {
                state.brandIndex = 0
                state.brandContent = ''
                return
            }
            state.brandIndex = str.index
            state.brandContent = str.value.name
        }, //设置品牌下标
        setDate: (state, str) => {
            if (!str) {
                state.dateIndex = 0
                state.dateContent = ''
                return
            }
            state.dateIndex = str.index
            state.dateContent = str.value.name
        }, //设置时间下标
        setStartTime: (state, str) => state.startTimeSelect = str,
        setEndTime: (state, str) => state.endTimeSelect = str

    },
    getters: {

    }
}