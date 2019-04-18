<template>
  <div class="newPlan">
    <my-banner :title="'今日日报'">
      <button
      @click="save"
      class="save">保存</button>
    </my-banner>
    <!-- 当日数据 -->
    <CurReport
    :list="dailyList"
    :curDay="'今日数据'" />
    <!-- 当日总结 -->
    <DailySummary
    :text="''"
    @changeDailySummaryTextarea="changeDailySummaryTextarea" />
    <!-- 明日目标及重点工作安排 -->
    <DailyPlan
    :text="dailyPlanTextarea"
    @changeDailyPlanTextarea="changeDailyPlanTextarea" />
  </div>
</template>


<script>
import Vuex, { mapMutations } from "vuex"
import myBanner from '../../components/banner'
import CurReport from '../../components/work/dailyReport/curReport'
import DailySummary from '../../components/work/dailyReport/dailySummary'
import DailyPlan from '../../components/work/dailyReport/dailyPlan'
import mango from "../../js"
import { IndexModel } from "../../utils/"
const indexModel = new IndexModel()
export default {
  components: {
    myBanner,
    CurReport,
    DailySummary,
    DailyPlan,
    curDay: ''
  },
  data() {
    return {
      dailyList: {},
      dailySummaryTextarea: '',
      dailyPlanTextarea: ''
    }
  },
  computed: {

  },
  created() {
  },
  mounted() {
    let date = new Date()
    const [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    this.curDay = `${year}-${month}-${day}`
    // 获取当月数据
    this.getDailyData({
      startDate: this.curDay,
      endDate: this.curDay
    })
  },
  methods: {
    getDailyData(data) {
      indexModel.getDailyReport(data).then((res) => {
        if (res.data) {
          // 更改数据
          this.dailyList = res.data
        }
      })
    },
    // 当日总结子组件触发更改数据
    changeDailySummaryTextarea(str) {
      this.dailySummaryTextarea = str
    },
    // 明日目标及重点工作安排子组件触发更改文本
    changeDailyPlanTextarea(str) {
      this.dailyPlanTextarea = str
    },
    save() {
      indexModel.getCurMonthData({
      summarize: this.dailySummaryTextarea,
      plan: this.dailyPlanTextarea,
      date: this.curDay         //获取当前日期
      }).then((res) => {
        if (res) {
          if (res.status) {
            mango.tip('保存成功！')
          }
        }
      })
    }
  }
};
</script>

<style lang="scss">
.newPlan {
  .curReport{
    margin: 21.266vw 4.8vw 0 4.8vw;
    background: #fff;
    border-radius: 2vw;
  }
  .dailySummary,.dailyPlan{
    margin: 4vw 4.8vw 0 4.8vw;
    background: #fff;
    border-radius: 2vw;
  }
}
</style>
