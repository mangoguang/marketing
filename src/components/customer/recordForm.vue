<template>
  <div>
    <ul class="recordForm">
      <li class="noPadding">
        <remark :title="'跟进情况'">
          <textarea
          @change="changeFollowSituation"
          v-model="recordForm.followSituation"
          placeholder="描述一下跟进情况"></textarea>
        </remark>
      </li>
      <li>
        <my-range :title="'成交概率'" @changeVal="changeMyRangeVal" />
      </li>
      <li class="timeLi" is="customerLi" :leftText="'下次跟进时间'" :icon="true" @click.native="selectTime">
        <span>{{recordForm.followTime}}</span>
      </li>
      <li class="noPadding">
        <remark :title="'跟进计划'">
          <textarea
          @change="changeFollowPlan"
          v-model="recordForm.followPlan" 
          placeholder="接下来该怎么跟进呢？"></textarea>
        </remark>
      </li>
    </ul>
    <mt-datetime-picker
      ref="followDatePicker"
      type="date"
      v-model="today"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="setTime">
    </mt-datetime-picker>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuex, { mapMutations, mapState } from "vuex"
import { DatetimePicker } from 'mint-ui'

Vue.component(DatetimePicker.name, DatetimePicker)
import remark from './remark'
import myRange from './myRange'
import customerLi from './customerLi'
import mango from '../../js'
import {turnParams, returnDate} from '../../utils/customer'
export default {
  name:'recordForm',
  components: {
    remark,
    myRange,
    customerLi
  },
  props: ['btns'],
  data(){
    return{
      today: new Date(),
      recordForm: {}
    }
  },
  watch: {
    // 'recordForm': function(value) {
    //   console.log('recordForm数据改变了', value)
    //   this.$emit('getRecordForm', this.recordForm)
    // }
  },
  created() {
    //获取本地缓存信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    // 获取当天日期
    let temp = new Date()
    this.recordForm.followTime = mango.indexTimeB(temp)[0]
  },
  mounted() {
    this.recordForm.percent = 50
    this.emitParentEvent()
  },
  methods: {
    changeMyRangeVal(val) {
      this.recordForm.percent = val
      this.emitParentEvent()
    },
    changeFollowSituation() {
      this.emitParentEvent()
    },
    changeFollowPlan() {
      this.emitParentEvent()
    },
    selectTime() {
      this.$refs.followDatePicker.open()
    },
    setTime(value) {
      this.recordForm.followTime = mango.indexTimeB(value)[0]
      this.emitParentEvent()
    },
    emitParentEvent() {
      this.$emit('getRecordForm', this.recordForm)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/common.scss";
  .newRecord{
    li{
      padding: 2vw 5vw;
      display: flex;
      flex-direction: column;
      strong{
        font-size: 20px;
        color: $fontCol;
      }
      &>span{
        line-height: 1em;
      }
    }
    li.noPadding{
      padding: 0;
    }
    li.timeLi{
      flex-direction: row;
    }
  }
  .btnsBox{
    display: flex;
    button{
      margin: 5vw;
    }
  }
</style>
