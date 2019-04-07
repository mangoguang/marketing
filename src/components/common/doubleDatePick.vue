<template>
  <ul class="doubleDatePick">
    <li>
      <mt-datetime-picker
        ref="startDatePick"
        type="date"
        confirmText="确定开始时间"
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
        ref="endDatePick"
        type="date"
        confirmText="确定结束时间"
        v-model="dateInterval.endDate"
        :startDate="new Date('1930-01-01')"
        year-format="{value}"
        month-format="{value}"
        date-format="{value}"
        @confirm="selectEndDate">
      </mt-datetime-picker>
    </li>
  </ul>
</template>

<script>
import Vue from 'vue'
import Vuex, { mapMutations } from "vuex"
import { DatetimePicker } from 'mint-ui'
Vue.component(DatetimePicker.name, DatetimePicker)
import mango from '../../js/'
export default {
  name: 'doubleDatePick',
  props: ['show'],
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
    // this.$refs.startDatePick.open()
  },
  created() {
  },
  methods: {
    ...mapMutations([
      "setDateInterVal"
    ]),
    selectStartDate() {
      let date = this.dateInterval.startDate
      this.$refs.endDatePick.open()
      // this.$set(this.dateInterval, 'startDate', date)
    },
    selectEndDate() {
      let [startDate, endDate] = [this.dateInterval.startDate, this.dateInterval.endDate]
      startDate = mango.indexTime(startDate, 'day')
      endDate = mango.indexTime(endDate, 'day')
      if (this.dateInterval.endDate >= this.dateInterval.startDate) {
        this.setDateInterVal({
          startDate,
          endDate
        })
      } else {
        mango.tip('设置失败，结束时间必须大于开始时间！')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.doubleDatePick{

}
</style>

