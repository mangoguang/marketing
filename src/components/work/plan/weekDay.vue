<template>
  <ul class="weekDay">
    <li :class="compareDate(`${item}`)?'hasPlan':''"
        v-for="(item,index) in list"
        :key="index">
      <span :class="item===activeDay?'active':''"
            :id="item"
            @click="getSelectDate(item)">
        {{parseInt(item.split('-')[2])}}
      </span>
    </li>

  </ul>
</template>
<script>
import { IndexModel } from '../../../utils'
const indexModel = new IndexModel()
export default {
  props: ['dateList'],
  name: 'weekDay',
  data() {
    return {
      startDate: '',
      endDate: '',
      nowDay: '',
      dayIndex: '',
      year: null,
      month: null,
      day: null,
      oneDayLong: 24 * 60 * 60 * 1000,
      week: {},
      list: [],
      activeDay: ''
    }
  },
  created() {
    this.getDate()
  },
  methods: {
    ChangeTime(time) {
      let year = new Date(time).getFullYear()
      let month = new Date(time).getMonth() + 1
      let day = new Date(time).getDate()
      return `${year}-${month > 9 ? month : `0${month}`}-${
        day > 9 ? day : `0${day}`
      }`
    },
    getDate() {
      this.year = new Date().getFullYear()
      this.month = new Date().getMonth() + 1
      this.day = new Date().getDate()
      this.dayIndex = new Date().getDay()
      this.activeDay = `${this.year}-${
        this.month > 9 ? this.month : `0${this.month}`
      }-${this.day > 9 ? this.day : `0${this.day}`}`
      this.startDate = new Date().getTime() - this.dayIndex * this.oneDayLong
      this.endDate =
        new Date().getTime() + (6 - this.dayIndex) * this.oneDayLong
      this.week = {
        startDate: this.ChangeTime(this.startDate),
        endDate: this.ChangeTime(this.endDate)
      }
      this.getWeekList(this.startDate)
      this.$emit('getWeekParams', this.week)
      this.$emit('getSelectDate', this.activeDay)
    },
    getWeekList(startTime) {
      let list = []
      for (let i = 0; i < 7; i++) {
        let day = this.ChangeTime(startTime + i * this.oneDayLong)
        list.push(day)
      }
      this.list = list
    },
    getSelectDate(date) {
      this.activeDay = date
      this.$emit('getSelectDate', date)
    },
    compareDate(date) {
      let arr = this.dateList.map((item, index) => {
        return item.dateTime
      })
      return arr.indexOf(date) != -1
    }
  }
}
</script>
<style lang="scss" scoped>
.weekDay {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  li {
    display: inline-block;
    width: 14.28%;
    text-align: center;
    color: #363636;
    font-size: 4.8vw;
    padding: 2.66vw 0;
  }
  span:after {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #ccc;
    text-align: center;
    position: absolute;
    left: 50%;
    bottom: -3vw;
    transform: translate(-50%);
  }
  span {
    display: inline-block;
    width: 8.53vw;
    height: 8.53vw;
    border-radius: 50%;
    background: transparent;
    position: relative;
  }
  span.active {
    background: #007aff;
    color: #fff;
  }
  li.hasPlan {
    span:after {
      background: #007aff;
    }
  }
}
</style>
