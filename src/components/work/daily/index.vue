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
        "cus": 0,   //接待客户数
        "cusBusiness": 0,    //成交客户数
        "guestSingleValue": 0,    //客单值
        "opp": 0,     //新增意向数
        "tourist": 0,    //游客数
        "trackRecord": 0,   //跟进客户
        "turnoverRatio": 0, // 成交率
        "volumeBusiness": 0   //成交金额
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
      }).catch((reject) => {
        if (reject === 510) {
          this.getDailyData(obj)
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

