<template>
  <ul class="timeSelect">
    <li>
      <button 
        v-for="(item, index) in timeBtns" 
        :key="`timeBtns${index}`"
        @click="selectTime(index)"
        :class="{on: item.status}">{{item.name}}</button>
    </li>
    <li
    class="last">
      <TimeInterval
      @getTimeInterval="getTimeInterval" />
    </li>
  </ul>
</template>

<script>
import mango from '../../../js'
import TimeInterval from '../../common/timeInterval'
import Vuex, { mapState } from "vuex"
import { IndexModel } from "../../../utils/index"
import weekDate from '../../../utils/weekDate'
const indexModel = new IndexModel();
export default {
  name: 'timeSelect',
  props: [],
  components: {TimeInterval},
  data() {
    return{
      btnIndex: 0,
      timeBtns: mango.btnList(['今日', '本周', '本月', '本年'], 0),
      ajaxData: {}
    }
  },
  watch: {
    dateInterVal(val) {
      console.log('时间区间改变', val)
      let  btns = this.timeBtns
      for (let i = 0; i < btns.length; i++) {
        btns[i].status = false
      }
      this.btnIndex = -1
      // this.timeBtns = mango.btnList(['今日', '本周', '本月', '本年'], 0)
    }
  },
  computed: {
    ...mapState({
      dateInterVal: state => state.common.dateInterVal
    })
  },
  mounted() {
    this.ajaxData = JSON.parse(localStorage.getItem('ajaxData'))
  },
  created(){
  },
  methods: {
    selectTime(index) {
      if (index === this.btnIndex) {
        return
      }
      // console.log('按钮状态', index, this.timeBtns)
      // 按钮状态更改
      let  btns = this.timeBtns
      for (let i = 0; i < btns.length; i++) {
        btns[i].status = index === i
        if (index === i) {
          this.btnIndex = i
        }
      }
      // this.timeBtns.forEach((element, i) => {
      //   element.status = index === i
      // })
      // 选择时间区间
      let dateInterVal = this.computeDateInterval(index)
      this.$emit('changeDateInterVal', dateInterVal)
    },
    getTimeInterval(obj) {
      this.$refs.startDatePick.open()
    },
    computeDateInterval(i) {
      let date = new Date()
      const [day, week, month, year] = [date.getDate(), date.getDay(), date.getMonth() + 1, date.getFullYear()]
      switch(i) {
        case 0:
          // 本日
          return {
            startDate: `${year}-${month}-${day}`,
            endDate: `${year}-${month}-${day}`
          }
          break
        case 1:
          // 本周
          return weekDate
          break
        case 2:
          // 本月
          return {
            startDate: `${year}-${month}-01`,
            endDate: `${year}-${month}-31`
          }
          break
        default:
          // 本年
          return {
            startDate: `${year}-01-01`,
            endDate: `${year}-12-31`
          }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .timeSelect{
    padding: 0 2vw;
    position: relative;
    li{
      line-height: 10.6vw;
      button{
        font-size: 15px;
        color: #363636;
        padding: 0 2vw;
      }
      button.on{
        position: relative;
        color: #007aff;
        // border-bottom: 1px solid #007aff;
      }
      button.on:after{
        content: '';
        position: absolute;
        display: block;
        width: 6vw;
        height: 1px;
        bottom: 0;
        left: 50%;
        margin-left: -3vw;
        background: #007aff;
      }
    }
    li:last-child{
      position: absolute;
      top: 50%;
      right: 4vw;
      margin-top: -3vw;
    }
  }
</style>

