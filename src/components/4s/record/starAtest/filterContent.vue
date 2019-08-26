<!--  -->
<template>
  <div class="wrapper right">
    <div class="filter">
      <h5 class="title">时间</h5>
      <ul class="time-box">
        <li @click="openDatePicker('start')">
          <p>起始日</p>
          <strong>{{startDateVal}}</strong>
        </li>
        <li>
          <div class="center">至</div>
        </li>
        <li @click="openDatePicker('end')">
          <p>结束日</p>
          <strong>{{endDateVal}}</strong>
        </li>
        <li>
          <div class="center">共{{countTime + 1}}日</div>
        </li>
      </ul>
    </div>
    <div class="filter">
      <h5 class="title">认证星级</h5>
      <ul class="filter-box">
        <egg-filterBtn class="filter_item"
                       v-for="(item, index) in starlist"
                       :key='item + index'
                       :text="item"
                       :class="{active: starActiveIndex === index}"
                       @click.native="handleStarClick(index)" />
      </ul>
    </div>
    <div class="filter">
      <h5 class="title">处理情况</h5>
      <ul class="filter-box">
        <egg-filterBtn class="filter_item"
                       v-for="(item, index) in handleList"
                       :key='item + index'
                       :text="item"
                       :class="{active: situationActiveIndex === index}"
                       @click.native="handleSituationClick(index)" />
      </ul>
    </div>
    <!-- 日期插件 -->
    <mt-datetime-picker ref="datePicker"
                        type="date"
                        v-model="pickerValue"
                        year-format="{value} 年"
                        month-format="{value} 月"
                        date-format="{value} 日"
                        @confirm="handleConfirm">
    </mt-datetime-picker>
    <div class="btn">
      <button class="reset"
              @click="handleReset">重置</button>
      <button class="comfirm"
              @click="handleComfirm">完成</button>
    </div>
  </div>
</template>

<script>
import mango from '../../../js'
import eggFilterBtn from '../filter/filterBtn'
import { DatetimePicker, Toast } from 'mint-ui'
import Vue from 'vue'
Vue.component(DatetimePicker.name, DatetimePicker)
export default {
  components: {
    eggFilterBtn
  },
  data () {
    return {
      starlist: ['一星', '二星', '三星', '四星', '五星'],
      handleList: ['认证中', '已认证', '认证失败'], //['已申请', '已退回', '认证通过', '未通过', '已撤销', '已评分', '已受理']
      starActiveIndex: -1,
      situationActiveIndex: -1,
      pickerValue: new Date(),
      startDateVal: '',
      endDateVal: mango.indexTime(new Date(), 'day'),
      dateType: ''
    };
  },
  computed: {
    countTime () {
      let [start, end] = [(new Date(this.startDateVal)).getTime(), (new Date(this.endDateVal)).getTime()]
      return Math.ceil((end - start) / 86400000)
    }
  },
  created () {
    this.initStartDateVal()
  },
  methods: {
    //星级
    handleStarClick (index) {
      if (this.starActiveIndex == index) {
        this.starActiveIndex = -1
        return
      }
      this.starActiveIndex = index
    },
    //处理情况
    handleSituationClick (index) {
      if (this.situationActiveIndex == index) {
        this.situationActiveIndex = -1
        return
      }
      this.situationActiveIndex = index
    },
    handleReset () {
      this.initStartDateVal();
      this.endDateVal = mango.indexTime(new Date(), 'day');

      this.starActiveIndex = - 1
      this.situationActiveIndex = -1
      const data = this.getData()
      this.$emit('getVal', data)
    },
    handleComfirm () {
      const data = this.getData()
      if (data.starActiveIndex == -1) {
        Toast('请选择星级')
        return
      }
      if (data.situationActiveIndex == -1) {
        Toast('请选择处理情况')
        return
      }
      this.$emit('getVal', data)
    },
    getData () {
      return {
        starlist: this.starlist,
        starActiveIndex: this.starActiveIndex,
        handleList: this.handleList,
        situationActiveIndex: this.situationActiveIndex,
        startDay: this.startDateVal,
        endDay: this.endDateVal
      }
    },
    initStartDateVal () {
      let date = new Date()
      date = mango.indexTime(date, 'day')
      date = `${date.slice(0, 8)}01`
      this.startDateVal = date
    },
    // 打开日期插件
    openDatePicker (type) {
      this.dateType = type
      this.$refs.datePicker.open()
    },
    handleConfirm (date) {
      let [start, end, dateVal] = [null, null, null]
      if (this.dateType === 'start') {
        start = new Date(date).getTime()
        // console.log(mango.indexTime(date, 'day'), this.startDateVal)
        if (mango.indexTimeB(date)[1] === mango.indexTimeB(new Date(this.endDateVal))[1]) {
        } else {
          if ((start - new Date(this.endDateVal).getTime()) > 0) {
            Toast('起始日不能大于结束日')
            return
          }
        }
      } else {
        end = new Date(date).getTime()
        if (mango.indexTimeB(date)[1] === mango.indexTimeB(new Date(this.startDateVal))[1]) {
        } else {
          if ((new Date(this.startDateVal).getTime() - end) > 0) {
            Toast('结束日不能小于起始日')
            return
          }
        }
      }
      dateVal = mango.indexTime(date, 'day')
      this[`${this.dateType}DateVal`] = dateVal
    }
  }
}
</script>
<style lang='scss' scoped>
.wrapper {
  width: 80vw;
  height: 100vh;
  background: #fff;
  padding: 0 4.53vw;
  box-sizing: border-box;
  padding-top: 7.6vw;
  .filter {
    .title {
      color: #999;
      font-size: 3.73vw;
    }
    .filter-box {
      margin-top: 2.4vw;
      display: flex;
      flex-wrap: wrap;
      .filter_item {
        margin-right: 2.6vw;
        &:nth-child(3n) {
          margin-right: 0;
        }
      }
    }
    .active {
      background: #b2d7ff;
      color: #007aff;
    }
  }
  .btn {
    width: 80vw;
    display: flex;
    height: 22vw;
    font-size: 4.53vw;
    position: fixed;
    bottom: 0;
    right: 0;
    .reset {
      width: 50%;
      height: 100%;
      background: #b2d7ff;
      color: #007aff;
    }
    .comfirm {
      width: 50%;
      height: 100%;
      background: #007aff;
      color: #fff;
    }
  }
}
.time-box {
  width: 71.2vw;
  height: 16vw;
  border-radius: 1.6vw;
  background: #f8f8f8;
  padding: 4vw;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  li {
    height: 8vw;
  }
  p {
    color: #999;
    font-size: 2.93vw;
    line-height: 3vw;
  }
  .center {
    color: #999;
    font-size: 2.93vw;
    padding-top: 3.8vw;
  }
  strong {
    color: #363636;
    font-size: 3.7vw;
    line-height: 3vw;
  }
}
</style>