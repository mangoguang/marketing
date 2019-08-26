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
    :disabled="true"
    @changeDailySummaryTextarea="changeDailySummaryTextarea" />
    <!-- 明日目标及重点工作安排 -->
    <DailyPlan
    :text="''"
    :disabled="true"
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
import { doubleDigit } from "../../utils/common/"
const indexModel = new IndexModel()
let Base64 = require('js-base64').Base64
export default {
  name: 'newPlan',
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
    let [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    if (month < 10) {
      month = `0${month}`
    }
    this.curDay = `${year}-${doubleDigit(month)}-${doubleDigit(day)}`
    // 获取当日数据
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
      }).catch((reject) => {
        if (reject === 510) {
          this.getDailyData(data)
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
      if (this.dailySummaryTextarea === '' && this.dailyPlanTextarea === '') {
        mango.tip('总结与计划不能同时为空！')
        return
      }
      indexModel.savePlan({
        summarize: Base64.encode(this.dailySummaryTextarea),
        plan: Base64.encode(this.dailyPlanTextarea),
        date: this.curDay         //获取当前日期
      }).then((res) => {
        if (res) {
          if (res.status) {
            mango.tip('保存成功！')
            this.$router.back(-1)
          }
        }
      }).catch((reject) => {
        if (reject === 510) {
          this.save()
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
