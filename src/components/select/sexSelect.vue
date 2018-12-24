<template>
  <li is="customerLi" :leftText="'客户性别'" :icon="true" @click="selectSex">
    <span>{{val == 1 ? '男' : '女'}}</span>
  </li>
</template>

<script>

import Vue from 'vue'
import VueRouter from 'vue-router'
import { DatetimePicker, Picker, Popup } from 'mint-ui'
// import { DatetimePicker } from 'mint-ui'
// import mango from '../../js'
// Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Picker.name, Picker)
Vue.component(Popup.name, Popup)
import customerLi from '../customer/customerLi'

export default {
  name: 'sexSelect',
  components:{customerLi},
  props: ['val'],
  data() {
    return {

    };
  },
  computed:{

  },
  created() {
    // let temp = this.date
    // this.date =  mango.indexTimeB(temp)[0]
    // // 获取本地存储信息
    // let ajaxData = localStorage.getItem('ajaxData')
    // this.ajaxData = JSON.parse(ajaxData)
    // let account = localStorage.getItem('accountMsg')
    // this.account = JSON.parse(account)
    // //获取数据
    // let date = mango.indexTimeB(temp)[1]
    // this.getData(date)
  },
  methods:{
    // //打开日历
    // openPicker(){
    //   this.$refs.datePicker.open()
      
    // },
    // //确认选择日期
    // sendDate(){
    //   if(this.pickerVisible){
    //     this.date = mango.indexTimeB(this.pickerVisible)[0]
    //     let date = mango.indexTimeB(this.pickerVisible)[1]
    //     this.getData(date)
    //   }
    // },
    // //获取数据
    // getData(date){
    //   mango.getAjax(this, 'daily', {
    //     account: this.ajaxData.account,
    //     date:date,
    //     tenantId: this.ajaxData.tenantId
    //   }, 'v2','get')
    //   .then((res) => {
    //     if (res) {
    //       this.dailyData = res.data 
    //       this.$emit('dailyData',[this.dailyData,date])
    //     }
    //   })
    // }
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
