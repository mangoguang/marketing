<template>
  <li class="nextDate">
    <ul>
      <li is="customerLi"  :leftText="'下次跟进'" :icon="true" @click.native="selectTime">
        <span :style="timeColor">{{turnDate(newCustomerInfo.nextDate) || '请选择日期'}}</span>
      </li>
      <!-- 性别选择插件 -->
      <li>
      <mt-datetime-picker
      ref="DatePicker"
      type="date"
      v-model="today"
      :startDate="new Date()"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="setTime">
    </mt-datetime-picker>
      </li>
    </ul>
  </li>
</template>

<script>
import Vuex, { mapMutations, mapState } from "vuex"
import { DatetimePicker, Picker, Popup } from 'mint-ui'
import mango from '../../js'
import Vue from 'vue'
Vue.component(Picker.name, Picker)

import customerLi from '../customer/customerLi'

export default {
  name: 'nextDate',
  components:{customerLi},
  data() {
    return {
      today:new Date(),
      timeColor:'color: #999'
    }
  },
  computed:{
   ...mapState({
      newCustomerInfo: state => state.customer.newCustomerInfo
    })
  },
  created() {
    
  },
  mounted(){
    if(this.newCustomerInfo.nextDate){
      this.timeColor = 'color: #363636'
    }
  },
  methods:{
    selectTime() {
      this.$refs.DatePicker.open()
    },
    //下次跟进日期
    setTime(value) {
      this.timeColor = 'color: #363636'
      this.$set(this.newCustomerInfo, 'nextDate', mango.indexTimeB(value)[1])
    },
    //转变日期格式
    turnDate(date) {
      if (date) {
        let arr = date.split('-')
        if (arr.length > 1) {
          return `${arr[0]}年${arr[1]}月${arr[2]}日`
        } else {
          return date
        }
      }
    }
  }
  }

</script>

<style lang="scss">
  .nextDate{
    ul{
      width: 100%;
    }
  }
 
</style>