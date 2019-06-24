<template>
    <div >
        <banner :title='`${username}日报`' class="header"></banner>
        <tabCurReport/>
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
    props:['id','username'],
    data(){
        return {
            dailySummaryTextarea:'',
            dailyPlanTextarea:''
            
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
