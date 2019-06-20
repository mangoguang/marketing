<template>
  <div class="dailyReport">
    <banner :title='"日报"' class="header">
      <button @click="newPlan" class="newDailyReport" v-if="tabList[0].status">+</button>
    </banner>
    <tabUI :list="tabList" @getIndex="getIndex"/>
    <!-- 日历组件 -->
    <div class="perDaily" v-if="tabList[0].status">
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
    <div v-else>
      <employeeDailyList/>
    </div>
  </div>
</template>


<script>
import myDatePicker from '../../components/work/dailyReport/myDatePicker'
import banner from '../../components/banner'
import CurReport from '../../components/work/dailyReport/curReport'
import DailySummary from '../../components/work/dailyReport/dailySummary'
import DailyPlan from '../../components/work/dailyReport/dailyPlan'
import tabUI from '../../components/work/storeDailyReport/tabUI'
import employeeDailyList from '../../components/work/storeDailyReport/employeeDailyList'
import { IndexModel } from "../../utils/"
import mango from "../../js"
import Bus from '../../utils/Bus'
import { mapMutations } from 'vuex';
const indexModel = new IndexModel()
export default {
  name: 'dailyReporxt',
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
    let date = new Date()
    const [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    this.curNum = parseInt(date.getDate())
    // 获取当月数据
    this.getCurMonthData(this.getCurMonth())
    this.getDailyData({
      startDate: `${year}-${month}-${day}`,
      endDate: `${year}-${month}-${day}`
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
        endDate: `${this.curDate[0]}-${this.curDate[1]}-${this.curDate[2]}`
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
    },
    // 明日目标及重点工作安排子组件触发更改文本
    changeDailyPlanTextarea(str) {
      this.dailyPlanTextarea = str
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
      if (res) {
        // 获取res数组里面的日期。
        arr = res.map(element => parseInt(element.createTime.substr(8, 2)))
      } else {
        return
      }
      const index = arr.indexOf(num)
      if (index >= 0) {
        this.dailySummaryTextarea = res[index].summarize
        this.dailyPlanTextarea = res[index].plan
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
    },
    // 跳转新建计划页面
    newPlan() {
      if (this.dailySummaryTextarea === '' && this.dailyPlanTextarea === '') {
        this.$router.push({path: '/newPlan'})
      } else  {
        mango.tip('当日已提交日报，请勿重复提交！')
        return
      }
    },
    getIndex(i){
      console.log(i)
      let array=this.tabList.map((item,index) => {
        if(index===i){
          item.status=true
        }else{
          item.status=false
        }
        return item;
      })
      this.tabList=array;
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
      margin: 2.66vw 4.8vw 0 2.66vw;
      background: #fff;
      padding-top: 1px;
      border-radius: 2vw;
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
