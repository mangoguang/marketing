<template>
  <div>
        <myDatePicker
        @getCurDay="getCurDay"
        :curMonthData="curMonthData"
        @changeCurMonthData="changeCurMonthData" />
        <!-- 当日数据 -->
        <CurReport
        :list="dailyList"
        :curDay="curDay" />
        <!-- 当日总结 -->
        <DailySummary
        :text="dailySummaryTextarea"
        :disabled="false"
        @changeDailySummaryTextarea="changeDailySummaryTextarea" />
        <!-- 明日目标及重点工作安排 -->
        <DailyPlan
        :text="dailyPlanTextarea"
        :disabled="false"
        @changeDailyPlanTextarea="changeDailyPlanTextarea" />
  </div>
</template>


<script>
import myDatePicker from '../dailyReport/myDatePicker'
import banner from '../../banner'
import CurReport from '../dailyReport/curReport'
import DailySummary from '../dailyReport/dailySummary'
import DailyPlan from '../dailyReport/dailyPlan'
import tabUI from '../storeDailyReport/tabUI'
import employeeDailyList from '../storeDailyReport/employeeDailyList'
import { IndexModel } from "../../../utils/"
import mango from "../../../js"
import Bus from '../../../utils/Bus'
import { mapMutations } from 'vuex';
const indexModel = new IndexModel()
let Base64 = require('js-base64').Base64
export default {
  name: 'perdailyReporxt',
  components:{
    myDatePicker,
    banner,
    CurReport,
    DailySummary,
    DailyPlan,
    tabUI,
    employeeDailyList
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
      planList: [],
      dailyList: [],
      tabList:[{title:'个人日报',status:true},{title:'员工日报',status:false}]
    }
  },
  computed: {

  },
  created() {
    Bus.$on('dailyPlanTextarea', val => {
      console.log('dailyPlanTextarea', val)
    })
  },
  mounted() {
    this.curDay = this.getToday()
    this.curDate = this.curDay.split(/年|月|日/)
    let date = new Date()
    const [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    this.curNum = parseInt(date.getDate())
    // 获取当月数据
    this.getCurMonthData(this.getCurMonth())
    this.getDailyData({
      startDate: `${year}-${month}-${day}`,
      endDate: `${year}-${month}-${day}`,
      QueryYourself:1
    })
    // this.setSumAndPlan(this.curMonthData)
  },
  methods:{
    getCurDay(curDay) {
      if (this.curDay === curDay) {
        return
      }
      this.curDay = curDay
      this.curDate = curDay.split(/年|月|日/)
      this.curNum = this.curDate[2]
      // 显示选择日期的当日总结和明日计划
      this.setSumAndPlan(this.curMonthData)
      this.getDailyData({
        startDate: `${this.curDate[0]}-${this.curDate[1]}-${this.curDate[2]}`,
        endDate: `${this.curDate[0]}-${this.curDate[1]}-${this.curDate[2]}`,
        QueryYourself:1
      })
    },
    changeCurMonthData(date) {
      // console.log('当前月份', this.getCurMonth(), date)
      this.getCurMonthData(date)
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
    // getSelectMonth() {

    // },
    // 当日总结子组件触发更改数据
    changeDailySummaryTextarea(str) {
      this.dailySummaryTextarea = str
      this.$emit('changeDailySummaryTextarea',str)
    },
    // 明日目标及重点工作安排子组件触发更改文本
    changeDailyPlanTextarea(str) {
      this.dailyPlanTextarea = str
      this.$emit('changeDailyPlanTextarea',str)
    },
    // 获取当天日期字符串，格式如：2019年04月17日
    getToday() {
      let date = new Date()
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
    },
    // 获取选择日期的数据
    getCurMonthData(month) {
      console.log(month);
      indexModel.getCurMonthData({
        date: month
      }).then((res) => {
        res = res.data
        if (res) {
          console.log(res);
          this.curMonthData = res
          if (this.curNum) {
            // 显示选择日期的当日总结和明日计划
            this.setSumAndPlan(res)
          }
          // 遍历一个月内有哪些天有总结
          // this.dailyList = res.map((item) => {
          //   let date = item.createTime
          //   return parseInt(date.split(' ')[0].split('-')[2])
          // })
        }
      }).catch((reject) => {
        if (reject === 510) {
          this.getCurMonthData(month)
        }
      })
    },
    // 显示选择日期的当日总结和明日计划
    setSumAndPlan(res) {
      // 获取当前选择的日期数的整数值
      const num = parseInt(this.curNum)
      let arr = []
      let arr2 = []
      if (res) {
        // 获取res数组里面的日期。
        arr = res.map(element => parseInt(element.createTime.substr(8, 2)))
        arr2 = res.map(element => element.createTime.substr(0, 10))
        console.log('日期',arr2);
      } else {
        return
      }
      const index = arr.indexOf(num)
      if (index >= 0) {
        let date = `${this.curDate[0]}/${this.curDate[1]}/${this.curDate[2]}`
        console.log('日期',date)
        if(new Date(date)< mango.setReportTime()){
          this.dailySummaryTextarea = res[index].summarize
          this.dailyPlanTextarea = res[index].plan
        }else{
          this.dailySummaryTextarea = Base64.decode(res[index].summarize)
          this.dailyPlanTextarea = Base64.decode(res[index].plan)
        }
        
        this.$emit('changeDailySummaryTextarea', this.dailySummaryTextarea)
        this.$emit('changeDailyPlanTextarea',this.dailyPlanTextarea)
      }
    },
    getDailyData(data) {
      indexModel.getDailyReport(data).then((res) => {
        if (res.data) {
          console.log(res)
          // 更改数据
          this.dailyList = res.data
        }
      }).catch((reject) => {
        if (reject === 510) {
          this.getDailyData(data)
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
  .perDaily{
     margin-top:30.85vw;
    &>div{
      &>div{
      
      margin: 2.66vw 2.66vw 0 2.66vw;
      background: #fff;
      padding-top: 1px;
      border-radius: 2vw;
    
      }
    }
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
