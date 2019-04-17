<template>
  <div class="dailyReport">
    <banner :title='"日报"' class="header">
      <button class="newDailyReport">+</button>
    </banner>
    <!-- 日历组件 -->
    <myDatePicker @getCurDay="getCurDay" :planList="planList" />
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
import { IndexModel } from "../../utils/"
const indexModel = new IndexModel()
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
      dailyList: {
        "cus": 3,   //接待客户数
        "cusBusiness": 2,    //成交客户数
        "guestSingleValue": 52439,    //客单值
        "opp": 3,     //新增意向数
        "tourist": 1,    //游客数
        "trackRecord": 2,   //跟进客户
        "turnoverRatio": 1, // 成交率
        "volumeBusiness": 157318   //成交金额
      },
      curDay: null,
      curDate: null,
      curNum: null, // 选择日期的中的天数
      curMonthData: [],
      dailySummaryTextarea: '',
      dailyPlanTextarea: '',
      planList: []
    }
  },
  computed: {

  },
  created() {
    // 获取当月数据
    this.getCurMonthData(this.getCurMonth())
  },
  mounted() {
    console.log('日报：', this)
    this.curDay = this.getToday()
    this.getDailyData()
  },
  methods:{
    getCurDay(curDay) {
      this.curDay = curDay
      this.curDate = curDay.split(/年|月|日/)
      this.curNum = this.curDate[2]
      this.getDailyData()
    },
    // 获取当前月份
    getCurMonth() {
      let date = new Date()
      let [year, month] = [date.getFullYear(), date.getMonth() + 1]
      if (month < 10) {
        month = '0' + month
      }
      return `${year}-${month}`
    },
    // 当日总结子组件触发更改数据
    changeDailySummaryTextarea(str) {
      this.dailySummaryTextarea = str
    },
    // 明日目标及重点工作安排子组件触发更改文本
    changeDailyPlanTextarea(str) {
      console.log('明日目标：', str)
    },
    // 获取当天日期字符串，格式如：2019年04月17日
    getToday() {
      let date = new Date()
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
    },
    // 获取选择日期的数据
    getCurMonthData(month) {
      console.log(112233, month)
      indexModel.getCurMonthData({
        date: month
      }).then((res) => {
        res = res.data
        if (res) {
          this.curMonthData = res
          if (this.curNum) {
            this.dailySummaryTextarea = res[parseInt(this.curNum) + 1].summarize
            this.dailyPlanTextarea = res[parseInt(this.curNum) + 1].plan
          }
          // 遍历一个月内有哪些天有总结
          this.planList = res.map((item) => {
            if (item) {
              let date = item.createTime
              return parseInt(date.split(' ')[0].split('-')[2])
            }
          })
        }
      })
    },
    getDailyData() {
      indexModel.getDailyReport({
        startDate: '2019-04-01',
        endDate: '2019-04-01'
      }).then((res) => {
        if (res.data) {
          // 更改数据
          this.dailyList = res.data
        }
      })
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
  &>div:first-child{
    margin: 0;
  }
  &>div:nth-child(2){
    margin-top: 21.266vw;
  }
  .header{
    background: #fff;
    border: none;
  }
  .newDailyReport{
    font-size: 36px;
    width: 10vw;
    margin-right: 4.8vw;
    font-weight: 300;
  }
}
</style>
