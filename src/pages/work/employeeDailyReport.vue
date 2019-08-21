<template>
    <div >
        <banner :title='`${username}日报`' class="header"></banner>
        <tabCurReport :username='username' :id="id" :date="date" :shopId="shopId"/>
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
import mango from '../../js'
const indexModel = new IndexModel()
let Base64 = require('js-base64').Base64
export default {
    name:'employeeDailyReport',
    props:['id','username','date','shopId'],
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
     this.getPerDaily()
    },
    methods:{
      getPerDaily(){
            indexModel.getPerDaily({userId:this.id,date:this.date}).then((res) => {
                console.log(res);
                if(res.status===1){
                    let date = this.date.replace(/\-/g,'/')
                    if(new Date(date)< mango.setReportTime()){
                        this.dailySummaryTextarea=res.data.summarize
                        this.dailyPlanTextarea=res.data.plan
                    }else{
                        this.dailySummaryTextarea=Base64.decode(res.data.summarize)
                        this.dailyPlanTextarea=Base64.decode(res.data.plan)
                    }
                    
                }
            }).catch((reject) => {
                if(reject===510){
                    this.getPerDaily()
                }
            })
      }
     
        
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
