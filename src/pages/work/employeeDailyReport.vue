<template>
    <div >
        <banner title='张三日报' class="header"></banner>
        <tabCurReport  :list="dailyList" :curDay="curDay"/>
        <div class="summary">
                <!-- 当日总结 -->
            <DailySummary
            :text="dailySummaryTextarea"
            :disabled="false" />
            <!-- 明日目标及重点工作安排 -->
            <DailyPlan
            :text="dailyPlanTextarea"
            :disabled="false"/>
        </div>
    </div>
</template>
<script>
import banner from '../../components/banner'
import tabCurReport from '../../components/work/dailyReport/tabCurReport'
import DailySummary from '../../components/work/dailyReport/dailySummary'
import DailyPlan from '../../components/work/dailyReport/dailyPlan'
import { IndexModel } from '../../utils'
const indexModel = new IndexModel()
export default {
    name:'employeeDailyReport',
    data(){
        return {
            dailyList: {
                "cus": 0,   //接待客户数
                "cusBusiness": 0,    //成交客户数
                "guestSingleValue": 0,    //客单值
                "opp": 0,     //新增意向数
                "tourist": 0,    //游客数
                "trackRecord": 0,   //跟进客户
                "turnoverRatio": 0, // 成交率
                "volumeBusiness": 0   //成交金额
            },
            dailySummaryTextarea:'',
            dailyPlanTextarea:'',
            curDay:'2019年6月21日'
        }
    },
    components:{
      banner,
      tabCurReport,
      DailySummary,
      DailyPlan
    },
    created(){
     
    },
    methods:{
      
     
        
    }
}
</script>
<style lang="scss" scoped>
.summary{
    &>div{
        background: #fff;
        margin:4.266vw;
        border-radius: 2.66vw;
    }
}
</style>
