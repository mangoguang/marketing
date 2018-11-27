<template>
   <div class="time">
    <span class="demonstration">{{date}}</span>
    <div class="calendar" @click="openPicker()"></div>
      <mt-datetime-picker
        ref="datePicker"
        type="date"
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
      date: '',
      pickerVisible :''
      
    };
  },
  computed:{

  },
  methods:{
    openPicker(){
      this.$refs.datePicker.open()
      
    },
    sendDate(){
      if(this.pickerVisible){
        this.date = mango.indexTimeB(this.pickerVisible)
      }
      
    }
  },
    created(){
    let year = new Date().getFullYear()
    let month = new Date().getMonth() + 1
    let day = new Date().getDate()
    this.date =  year + '年' + month + '月' + day + '日'
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
