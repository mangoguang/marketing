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
import { IndexModel } from "../../../utils/index";
const indexModel = new IndexModel();
export default {
  name: 'timeSelect',
  props: [],
  components: {TimeInterval},
  data() {
    return{
      timeBtns: mango.btnList(['今日', '本周', '本月', '本年'], 0),
      ajaxData: {}
    }
  },
  computed: {
    ...mapState({
      dateInterVal: state => state.common.dateInterVal
    })
  },
  mounted() {
    this.ajaxData = JSON.parse(localStorage.getItem('ajaxData'))
    console.log(this.getWeek())
  },
  created(){
  },
  methods: {
    selectTime(index) {
      // 按钮状态更改
      this.timeBtns.forEach((element, i) => {
        element.status = index === i
      })
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
          return `${year}-${month}-${day}`
          break
        case 1:
          return {
            startDate: `${year}-${month}-${day}`,
            endDate: `${year}-${month}-${day}`
          }
          break
        case 2:
          return {
            startDate: `${year}-${month}-01`,
            endDate: `${year}-${month}-31`
          }
          break
        default:
          return {
            startDate: `${year}-01-01`,
            endDate: `${year}-12-31`
          }
      }
    },
    getWeek() {
      let date = new Date()
      // const [day, week, month, year] = [date.getDate(), date.getDay(), date.getMonth() + 1, date.getFullYear()]
      // console.log(date.get)
      // 起止日期数组    
      var startStop = new Array()
      // 获取当前时间
      var currentDate = date
      // 返回date是一周中的某一天
      var week = currentDate.getDay()
      // 返回date是一个月中的某一天
      var month = currentDate.getDate()

      // 一天的毫秒数
      var millisecond = 1000 * 60 * 60 * 24
      // 减去的天数    
      var minusDay = week != 0 ? week - 1 : 6
      // alert(minusDay)
      //本周 周一
      var monday = new Date(currentDate.getTime() - (minusDay * millisecond))
      // 本周 周日
      var sunday = new Date(monday.getTime() + (6 * millisecond))
      // 添加本周时间
      startStop.push(monday) // 本周起始时间
      // 添加本周最后一天时间
      startStop.push(sunday) // 本周终止时间
      // 返回
      return startStop
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

