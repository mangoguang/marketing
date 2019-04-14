<template>
  <div class="dailyReport">
    <banner :title='"日报"' class="header">
      <button class="newDailyReport">+</button>
    </banner>
    <!-- 日历组件 -->
    <myDatePicker @getCurDay="getCurDay" />
    <!-- 当日数据 -->
    <CurReport
    :list="dailyList"
    :curDay="curDay" />
    <!-- 当日总结 -->
    <DailySummary
    :text="dailySummaryTextarea"
    @changeDailySummaryTextarea="changeDailySummaryTextarea" />
    <!-- 明日目标及重点工作安排 -->
    <DailyPlan
    :text="dailyPlanTextarea"
    @changeDailyPlanTextarea="changeDailyPlanTextarea" />
  </div>
</template>


<script>
import myDatePicker from '../../components/work/dailyReport/myDatePicker'
import banner from '../../components/banner'
import CurReport from '../../components/work/dailyReport/curReport'
import DailySummary from '../../components/work/dailyReport/dailySummary'
import DailyPlan from '../../components/work/dailyReport/dailyPlan'
export default {
  name: 'dailyReporxt',
  components:{
    myDatePicker,
    banner,
    CurReport,
    DailySummary,
    DailyPlan
  },
  props:[],
  data(){
    return{
      dailyList: [
        {
          number: 5,
          title: '接待客户'
        }, {
          number: 3,
          title: '新增意向'
        }, {
          number: 2,
          title: '游客数'
        }, {
          number: 6,
          title: '跟进客户'
        }, {
          number: 1,
          title: '成交客户'
        }, {
          number: 12800,
          title: '成交金额'
        }, {
          number: 6000,
          title: '客单值'
        }, {
          number: '20%',
          title: '成交率'
        }
      ],
      curDay: null,
      dailySummaryTextarea: '',
      dailyPlanTextarea: ''
    }
  },
  mounted() {
    console.log('日报：', this)
  },
  methods:{
    getCurDay(curDay) {
      this.curDay = curDay
    },
    changeDailySummaryTextarea(str) {
      console.log('文本与内容，', str)
      this.dailySummaryTextarea = str
    },
    changeDailyPlanTextarea(str) {
      console.log('明日目标：', str)
    }
  }
}
</script>

<style lang="scss" scoped>

.dailyReport{
  padding-top: 1px;
  padding-bottom: 4.8vw;
  &>div{
    margin: 4.8vw 4.8vw 0 4.8vw;
    background: #fff;
    padding-top: 1px;
    border-radius: 2vw;
  }
  .header{
    background: #fff;
    border: none;
  }
  .newDailyReport{
    font-size: 18px;
    width: 10vw;
    margin-right: 4.8vw;
  }
}
</style>
