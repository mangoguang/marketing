<!-- <keep-alive> -->
<template>
  <ul class="selectComponent">
    <li is="citySelect"></li>
    <li><input @click="openStartPicker" type="input" v-model="startTime"></li>
    <li><input @click="openEndPicker" type="input" v-model="endTime"></li>
    <mt-datetime-picker
      ref="picker"
      type="date"
      v-model="pickerValue"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleConfirm">
    </mt-datetime-picker>
  </ul>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import citySelect from './citySelect'
import { DatetimePicker } from 'mint-ui'

import 'mint-ui/lib/style.min.css'

Vue.component(DatetimePicker.name, DatetimePicker)

export default {
  name: 'selectComponent',
  components: {citySelect, DatetimePicker},
  data () {
    return {
      startTime: '',
      endTime: '2018-08',
      pickerValue: new Date(),
      timeType: 'start'
    }
  },
  created() {
    this.getLocalStorageTime()
  },
  mounted() {

  },
  methods: {
    handleConfirm(date) {
      if (this.timeType === 'start') {
        this.startTime = date.toLocaleDateString().split('/').join('-')
        localStorage.setItem('startTime', this.startTime)
      } else {
        this.endTime = date.toLocaleDateString().split('/').join('-')
        localStorage.setItem('endTime', this.endTime)
      }
    },
    openStartPicker() {
      this.timeType = 'start'
      this.$refs.picker.open()
    },
    openEndPicker() {
      this.timeType = 'end'
      this.$refs.picker.open()
    },
    getLocalStorageTime() {
      let [startTime, endTime] = [localStorage.getItem('startTime'), localStorage.getItem('endTime')]
      if (startTime) {
        this.startTime = startTime
      } else {
        this.startTime = '开始时间'
      }
      if (endTime) {
        this.endTime = endTime
      } else {
        this.endTime = '结束时间'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .selectComponent{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 8vw;
    margin-right: 2%;
    &>li{
      width: 25vw;
      height: 8vw;
      position: relative;
      margin: 0 1vw;
      input, li{
        display: block;
        width: 100%;
        height: 100%;
        background: #f8f8f8;
        text-align: center;
        border-radius: 4vw;
        border: 1px solid #e1e1e1;
        color: #666;
        font-weight: 300;
      }
      &>ul{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 1000;
        li{
          border-radius: 0;
          border-top: none;
        }
        li:first-child{
          border-top: 1px solid #e1e1e1;
        }
      }
    }
  }
</style>