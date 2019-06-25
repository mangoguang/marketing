<template>
  <div class="myDatePicker">
    <div class="date-header">
      <div class="prev-month" @click="prevMonth">
        <img src="../../../assets/imgs/prev.png" alt="">
      </div>
      <div class="show-date">{{`${year}.${month<10?`0${month}`:month}`}}</div>
      <div class="next-month" @click="nextMonth">
         <img src="../../../assets/imgs/next.png" alt="">
      </div>
    </div>

    <div class="date-content">
      <ul class="week-header">
        <li>日</li>
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li>六</li>
      </ul>

      <ul class="week-day">
        <li class="every-day" v-for="(item, index) in 42" :key="`every_day${index}`">
          <!-- <span
          v-if="item - getBeginDay <= 0"
          class="other-day">{{item - getBeginDay + prevDay}}</span> -->
          <span
          v-if="item - getBeginDay > 0 && item - getBeginDay <= curDay"
          :class="{
            'now-day': `${year}-${month}-${item - getBeginDay}` === curDate,
            'active-day': `${year}-${month}-${item - getBeginDay}` === selectDate,
            'summary': dateListCompare(`${year}-${month < 10 ? `0${month}` : month}-${item - getBeginDay < 10 ? `0${item - getBeginDay}` : item - getBeginDay}`),
            'future-day': dateCompare(`${year}-${month}-${item - getBeginDay}`, curDate)
          }"
          @click="dateListCompare(`${year}-${month < 10 ? `0${month}` : month}-${item - getBeginDay < 10 ? `0${item - getBeginDay}` : item - getBeginDay}`) ? changeCurDay(item - getBeginDay) : noSummary(item - getBeginDay)">
          {{item - getBeginDay}}
          </span>
          <!-- <span
          v-if="item - getBeginDay > curDay"
          class="other-day">{{item - getBeginDay - curDay}}</span> -->
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import mango from '../../../js/'

export default {
  name: 'myDatePicker',
  components:{

  },
  props:['curMonthData'],
  data(){
    return{
      year: null,
      month: null,
      day: null,
      curDate: null, // 当天日期
      dateList: [], // 当月有总结的日期。
      selectDate: ''
    }
  },
  watch: {
    curMonthData(val) {
      if (val.length) {
        console.log(val);
        this.dateList = val.map(element => element.createTime)
        console.log(this.dateList)
      }
    }
  },
  created() {
    this.getDate()
  },
  mounted() {
    
  },
  computed: {
    getBeginDay() {
      console.log('getBeginDay',new Date(this.year, this.month - 1, 1).getDay())
      return new Date(this.year, this.month - 1, 1).getDay()
    },
    curDay() {
      console.log('getBeginDay111',new Date(this.year, this.month, 0).getDate())
      return new Date(this.year, this.month, 0).getDate()
    },
    prevDay() {
      console.log('getBeginDay2222',new Date(this.year, this.month - 1, 0).getDate())
      return new Date(this.year, this.month - 1, 0).getDate()
    }
  },
  methods:{
    getDate() {
      let date = new Date()
      this.year = date.getFullYear()
      this.month = date.getMonth() + 1
      this.day = date.getDate()
      this.curDate = `${this.year}-${this.month}-${this.day}`
      this.selectDate = `${this.year}-${this.month}-${this.day}`
    },
    changeCurDay(day) {
      this.day = day
      this.selectDate = `${this.year}-${this.month}-${this.day}`
      this.$emit('getCurDay', `${this.year}年${this.month}月${day}日`)
    },
    prevMonth() {
      if (this.month === 1) {
        this.year --
        this.month = 12
      } else {
        this.month --
      }
      this.$emit('changeCurMonthData', `${this.year}-${this.month < 10 ? `0${this.month}` : this.month}`)
    },
    nextMonth() {
      if (this.month === 12) {
        this.year ++
        this.month = 1
      } else {
        this.month ++
      }
      this.$emit('changeCurMonthData', `${this.year}-${this.month < 10 ? `0${this.month}` : this.month}`)
    },
    noSummary(curDay) {
      if (this.curDate === `${this.year}-${this.month}-${curDay}`) {
        this.$router.push({path: '/newPlan'})
      } else {
        mango.tip(`当日无总结！`)
      }
    },
    dateCompare(date1, date2) {
      let [arr1, arr2] = [date1.split('-'), date2.split('-')]
      console.log(parseInt(arr1[0]), parseInt(arr2[0]))
      if (parseInt(arr1[0]) === parseInt(arr2[0])) { // 选择年份小于等于当前年份
        if (parseInt(arr1[1]) <= parseInt(arr2[1])) {
          if (parseInt(arr1[1]) === parseInt(arr2[1])) {
            if (parseInt(arr1[2]) <= parseInt(arr2[2])) {
              return false
            } else {
              return true
            }
          } else {
            return false
          }
        } else {
          return true
        }
      } else if (parseInt(arr1[0]) < parseInt(arr2[0])) {
        return false
      } else {
        return true
      }
    },
    dateListCompare(date) {
      let arr = this.dateList.map(item => item.substr(0, 10))
      //console.log('22',arr.includes(date))
      return arr.includes(date)
    }
  }
}
</script>

<style lang="scss" scoped>

.myDatePicker{
  margin: 21.266vw 4.8vw 0 4.8vw;
  //margin: 0 4.8vw 0 4.8vw;
  // padding: 1px;
  background: #fff;
  border-radius: 2vw;
  .date-header{
    width: 100%;
    display: flex;
    line-height: 10.466vw;
    height:10.66vw;
    border-bottom: 1px solid #E1E1E1;
  }
  .prev-month, .next-month{
    height: 10.6vw;
    width: 14.28%;
    line-height: 10.6vw;
    font-size: 12px;
    text-align: center;
    color: #363636;
    cursor: pointer;
    img{
      width:2.933vw;
    }
  }
  .show-date{
    flex: 1;
    height: 10.6vw;
    line-height: 10.6vw;
    text-align: center;
    color: #363636;
    font-size:16px;
  }

  .week-header{
    display: flex;
    li{
      flex: 1;
      font-size: 16px;
      text-align: center;
      line-height: 30px;
      font-weight: 400;
      color: #666;
    }
    li:first-child, li:last-child{
      color: #FF964B;
    }
  }
  .week-day{
    width: 100%;
      li{
      display: inline-block;
      width: 14.28%;
      text-align: center;
      cursor: pointer;
      padding: 1vw 0 4.4vw 0;
      span{
        position: relative;
        display: block;
        width: 8vw;
        height: 8vw;
        font-size: 14px;
        line-height: 8vw;
        margin: auto;
      }
      span:after{
        content: '';
        display: block;
        width: 2.4vw;
        height: 2.4vw;
        margin: auto;
        background: url('../../../assets/imgs/no.png') no-repeat;
        background-size: 2.4vw 2.4vw;
        background-position: bottom center;
        padding: 1vw 0;
      }
      span.summary:after{
        background: url('../../../assets/imgs/yes.png') no-repeat;
        background-size: 2.4vw 2.4vw;
        background-position: bottom center;
      }
      span.now-day:after{
        background: url('../../../assets/imgs/now.png') no-repeat;
        background-size: 2.4vw 2.4vw;
        background-position: bottom center;
      }
      span.future-day:after{
        background: none;
      }
    }
  }
  .other-day{
    color: #ccc;
  }
  span.active-day{
    background: #007fff;
    border-radius: 4vw;
    color: #fff;
    // box-sizing: border-box;
    // border: 2px solid #007fff;
    // height: 46px;
  }
}
</style>
