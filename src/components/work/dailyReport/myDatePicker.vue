<template>
  <div class="myDatePicker">
    <div class="date-header">
      <div class="prev-month" @click="prevMonth"><</div>
      <div class="show-date">{{`${year}年${month}月`}}</div>
      <div class="next-month" @click="nextMonth">></div>
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
            'active-day': `${year}-${month}-${item - getBeginDay}` === `${year}-${month}-${day}`
          }"
          @click="changeCurDay(item - getBeginDay)">{{item - getBeginDay}}</span>
          <!-- <span
          v-if="item - getBeginDay > curDay"
          class="other-day">{{item - getBeginDay - curDay}}</span> -->
        </li>
      </ul>
    </div>
  </div>
</template>


<script>


export default {
  name: 'myDatePicker',
  components:{

  },
  props:[],
  data(){
    return{
      year: null,
      month: null,
      day: null,
      curDate: null
    }
  },
  created() {
    this.getDate()
  },
  mounted() {

  },
  computed: {
    getBeginDay() {
      return new Date(this.year, this.month - 1, 1).getDay()
    },
    curDay() {
      return new Date(this.year, this.month, 0).getDate()
    },
    prevDay() {
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
    },
    changeCurDay(day) {
      this.day = day
      this.$emit('getCurDay', `${this.year}年${this.month}月${day}日`)
    },
    prevMonth() {
      if (this.month === 1) {
        this.year --
        this.month = 12
      } else {
        this.month --
      }
    },
    nextMonth() {
      if (this.month === 12) {
        this.year ++
        this.month = 1
      } else {
        this.month ++
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.myDatePicker{
  margin: 21.266vw 4.8vw 0 4.8vw;
  // padding: 1px;
  background: #fff;
  border-radius: 2vw;
  .date-header{
    width: 100%;
    display: flex;
    line-height: 30px;
  }
  .prev-month, .next-month{
    height: 10.6vw;
    width: 14.28%;
    line-height: 10.6vw;
    font-size: 12px;
    text-align: center;
    color: #363636;
    cursor: pointer;
  }
  .show-date{
    flex: 1;
    height: 10.6vw;
    line-height: 10.6vw;
    text-align: center;
    color: #363636;
    font-size: 14px;
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
      padding: 1vw 0;
      span{
        display: block;
        width: 100%;
        height: 100%;
        font-size: 14px;
        line-height: 2em;
        padding-bottom: 2.4vw;
        background: url('../../../assets/imgs/yes.png') no-repeat;
        background-size: 2.4vw 2.4vw;
        background-position: bottom center;
      }
      span.now-day{
        background: url('../../../assets/imgs/now.png') no-repeat;
        background-size: 2.4vw 2.4vw;
        background-position: bottom center;
      }
    }
  }
  .other-day{
    color: #ccc;
  }
  span.active-day{
    box-sizing: border-box;
    // border: 2px solid #007fff;
    // height: 46px;
  }
}
</style>
