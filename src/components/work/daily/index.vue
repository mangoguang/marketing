<template>
  <div class="daily">
    <TimeSelect
    @changeDateInterVal="changeDateInterVal" />
    <DailyUl
    :list="dailyList" />
  </div>
</template>

<script>
import TimeSelect from './timeSelect'
import DailyUl from './dailyUl'
import { IndexModel } from "../../../utils/";
import { mapState } from 'vuex';
const indexModel = new IndexModel();
export default {
  name: 'daily',
  props: [],
  components: {TimeSelect, DailyUl},
  data() {
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
      }
    }
  },
  computed: {
    ...mapState({
      dateInterVal: state => state.common.dateInterVal
    })
  },
  watch: {
    dateInterVal(val) {
      this.getDailyData(val)
    }
  },
  mounted(){
    let date = new Date()
    const [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    this.curDay = `${year}-${month}-${day}`
    this.getDailyData({
      startDate: this.curDay,
      endDate: this.curDay
    })
  },
  created(){

  },
  methods:{
    changeDateInterVal(obj) {
      this.getDailyData(obj)
    },
    getDailyData(obj) {
      indexModel.getDailyReport(obj).then((res) => {
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
  .daily{
    margin: 0 4.8vw;
    background: #fff;
    border-radius: 2vw;
    border-bottom: 1px solid #e1e1e1;
  }
</style>

