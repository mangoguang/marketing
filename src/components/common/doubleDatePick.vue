<template>
  <ul class="doubleDatePick">
    <li>
      <mt-datetime-picker
        ref="startDatePick"
        type="date"
        v-model="dateInterval.startDate"
        :startDate="new Date('1930-01-01')"
        year-format="{value}"
        month-format="{value}"
        date-format="{value}"
        @confirm="selectStartDate">
      </mt-datetime-picker>
    </li>
    <li>
      <mt-datetime-picker
        ref="startDatePick"
        type="date"
        v-model="dateInterval.startDate"
        :startDate="new Date('1930-01-01')"
        year-format="{value}"
        month-format="{value}"
        date-format="{value}"
        @confirm="selectStartDate">
      </mt-datetime-picker>
    </li>
  </ul>
</template>

<script>
import Vue from 'vue'
import { DatetimePicker } from 'mint-ui'
Vue.component(DatetimePicker.name, DatetimePicker)
export default {
  name: 'doubleDatePick',
  components: {},
  data() {
    return {
      dateInterval: {
        startDate: new Date(),
        endDate: new Date()
      }
    }
  },
  mounted() {
    this.$refs.startDatePick.open()
  },
  created(){
  },
  methods: {
    selectStartDate() {
      console.log('选择开始时间！')
    }
  }
}
</script>

<style lang="scss" scoped>
.doubleDatePick{
  li{
    width: 50vw;
    position: relative;
  }
}
</style>

