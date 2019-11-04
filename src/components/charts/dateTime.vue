<template>
  <div>
    <mt-datetime-picker
      ref="datePicker"
      type="date"
      v-model="pickerValue"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleConfirm"
      @cancel="cancle"
    ></mt-datetime-picker>
  </div>
</template>
<script>
import Vue from "vue";
import { mapState, mapMutations } from "vuex";
import moment from "moment";
import Bus from "../../utils/Bus";
import { DatetimePicker } from "mint-ui";
Vue.component(DatetimePicker.name, DatetimePicker);
export default {
  data() {
    return {
      pickerValue: new Date(),
      index: null, //开启时间选择器标识
      timeVal: "start" //辨别起始的文本
    };
  },
  computed: {
    ...mapState({
      startTimeSelect: state => state.chartSelect.startTimeSelect, //开始时间
      endTimeSelect: state => state.chartSelect.endTimeSelect //结束时间
    })
  },
  methods: {
    ...mapMutations(["setStartTime", "setEndTime"]),
    //  点击确认
    handleConfirm() {
      //   console.log(this.pickerValue);
      var time = moment(this.pickerValue).format("YYYY-MM-DD");
      // var checkTime = time.substr(0,4)
      if (this.timeVal == "start") {
        // if(this.endTimeSelect&&!this.endTimeSelect.includes(checkTime)) {
        //   alert('时间段筛选不能跨年')
        //   return
        // }
        this.setStartTime(time);
      } else {
        // if(this.startTimeSelect&&!this.startTimeSelect.includes(checkTime)) {
        //   alert('时间段筛选不能跨年')
        //   return
        // }
        this.setEndTime(time);
      }
    },
    // 点击取消
    cancle() {},
    // 开启时间选择器
    onpenPick() {
      this.$refs.datePicker.open();
    }
  },
  mounted() {
    Bus.$on("myDate", val => {
      if (val) {
        this.timeVal = "end";
        if(this.endTimeSelect) {
        this.pickerValue = this.endTimeSelect
        console.log(this.pickerValue);
        }else {
          this.pickerValue = new Date()
        }
      } else {
        this.timeVal = "start";
       if(this.startTimeSelect){
          this.pickerValue = this.startTimeSelect
          console.log(this.pickerValue);
       }else {
         this.pickerValue = new Date()
       }
      }
      console.log(this.timeVal);
      this.index = val + new Date();
    });
  },
  watch: {
    index() {
      this.onpenPick();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>