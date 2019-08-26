<template>
   <div class="time">
    <span class="demonstration">{{date}}</span>
    <div class="calendar" @click="openPicker()"></div>
      <mt-datetime-picker
        ref="datePicker"
        type="date"
        :endDate="new Date()"
        v-model="pickerVisible"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="sendDate">
      </mt-datetime-picker>
  </div>
</template>

<script>

import Vue from 'vue'
import VueRouter from 'vue-router'
import { DatetimePicker } from 'mint-ui'
import mango from '../../js'
Vue.component(DatetimePicker.name, DatetimePicker)

export default {
  components:{DatetimePicker},
  data() {
    return {
      date: new Date(),
      pickerVisible: new Date(),
      ajaxData: {},
      dailyData: {}
    };
  },
  computed:{

  },
  methods:{
    //打开日历
    openPicker(){
      this.$refs.datePicker.open()
    },
    //确认选择日期
    sendDate(){
      if(this.pickerVisible){
        this.date = mango.indexTimeB(this.pickerVisible)[0]
        let date = mango.indexTimeB(this.pickerVisible)[1]
        this.getData(date)
      }
    },
    //获取数据
    getData(date){
      mango.getAjax(this, 'daily', {
        account: this.ajaxData.account,
        date,
        tenantId: this.ajaxData.tenantId
      }, 'v2','get')
      .then((res) => {
        if (res) {
          this.dailyData = res.data 
          this.$emit('dailyData',[this.dailyData,date])
        }
      })
    }
  },
  created(){
    let temp = this.date
    this.date =  mango.indexTimeB(temp)[0]
    // 获取本地存储信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    //获取数据
    let date = mango.indexTimeB(temp)[1]
    this.getData(date)
  }
  }

</script>

<style lang="scss" scoped>
.time{
  padding: 5.3vw 4.13vw;
  position: relative;
  .demonstration{
    color: #363636;
    font-size: 6.13vw;
    line-height: 1em;
  }
  .calendar{
    background: url('../../assets/imgs/calendar.png') no-repeat center;
    background-size: 100% 100%;
    width: 3.46vw;
    height: 3.46vw;
    position: absolute;
    right: 4.26vw;
    top: 7vw;
  }
}
</style>
