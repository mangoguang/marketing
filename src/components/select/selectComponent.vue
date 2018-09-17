<!-- <keep-alive> -->
<template>
  <ul class="selectComponent">
    <li is="citySelect"></li>
    <li><input type="input" v-model="startTime" disabled="disabled"></li>
    <li><input type="input" v-model="endTime" disabled="disabled"></li>
    <mt-datetime-picker
      ref="picker"
      type="date"
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

Vue.component(DatetimePicker.name, DatetimePicker)

export default {
  name: 'selectComponent',
  components: {citySelect, DatetimePicker},
  data () {
    return {
      startTime: '2018-07',
      endTime: '2018-08'
    }
  },
  mounted() {

  },
  methods: {
    handleConfirm(date) {
      this.dateVal = date.toLocaleDateString().split('/').join('-')
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