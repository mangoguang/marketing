<template>
  <li class="deliverDate">
    <ul>
      <li is="customerLi" :leftText="'需求日期'"  :icon="true" @click.native="selectFollowTime">
        <span :style="timeColor">{{turnDate(newCustomerInfo.deliverDate) || '请选择需求日期'}}</span>
      </li>
      <!-- 性别选择插件 -->
      <li>
      <mt-datetime-picker
      ref="followDatePicker"
      type="date"
      v-model="today"
      :startDate="new Date()"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="setFollowTime">
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
  name: 'deliverDate',
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
    if(this.newCustomerInfo.deliverDate){
      this.timeColor = 'color: #363636'
    }
  },
  methods:{
     selectFollowTime() {
      this.$refs.followDatePicker.open()
    },
    //需求日期
    setFollowTime(value) {
      this.timeColor = 'color: #363636'
      this.$set(this.newCustomerInfo, 'deliverDate', mango.indexTimeB(value)[1])
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
  .deliverDate{
    ul{
      width: 100%;
    }
  }
 
</style>