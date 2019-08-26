<!-- <keep-alive> -->
<template>
  <ul class="selectComponent" :style="{'top':`${top}vw`}">
    <li is="citySelect"></li>
    <!-- <li><input @click="openStartPicker" type="input" v-model="startTime"></li> -->
    <li @click="openEndPicker" class="timeBtn">
      <!-- <input @click="openEndPicker" type="input" v-model="endTime"> -->
      <h5>
        时间
        <span>{{endTime}}
          <img src="../../assets/imgs/back.png" alt="" class="cityChoose" :style="{transform:`${rotate}`}">
        </span>
      </h5>
      <!-- <button @click="openEndPicker" type="button">{{endTime}}</button> -->
    </li>
    <mt-datetime-picker
      ref="datePicker"
      type="date"
      v-model="pickerValue"
      year-format="{value} 年"
      month-format="{value} 月"
      @confirm="handleConfirm"
      @cancel="cancle">
    </mt-datetime-picker>
  </ul>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import Vuex, { mapState, mapMutations, mapGetters } from 'vuex'
import mango from '../../js'
import citySelect from './citySelect'
import { DatetimePicker } from 'mint-ui'

Vue.component(DatetimePicker.name, DatetimePicker)

export default {
  name: 'selectComponent',
  components: { citySelect, DatetimePicker },
  data () {
    return {
      startTime: '',
      endTime: '2018-08',
      pickerValue: new Date(),
      timeType: 'start',
      rotate:'rotate(270deg)' ,
      top:''  
    }
  },
  created() {
    this.getLocalStorageTime()
    this.isIPhoneX()
  },
  mounted() {
   
  },
  methods: {
    ...mapMutations([
      'setStartTimeSelect',
      'setEndTimeSelect'
    ]),
    getMouth(){
      var myDate = document.getElementsByClassName('picker-slot-center')[2]
      myDate.style.display = "none"
    },
    cancle(){
      this.rotate = 'rotate(270deg)'
    },
    handleConfirm(date) {
      // 选择时间
      let str = `${this.timeType}Time`
      this[str] = mango.indexTime(date)
      // this[str] = date.toLocaleDateString().split('/').slice(0, 2)
      // if (this[str][1] < 10) {
      //   this[str][1] = `0${this[str][1]}`
      // }
      // this[str] = this[str].join('-')
      localStorage.setItem(str, this[str])
      this.setEndTimeSelect(this[str])
      this.rotate = 'rotate(270deg)'
    },
    openStartPicker() {
      this.timeType = 'start'
      this.$refs.picker.open()
    },
    openEndPicker() {
      this.getMouth()
      this.timeType = 'end'
      this.$refs.datePicker.open()
      this.rotate = 'rotate(90deg)'
    },
    getLocalStorageTime() {
      let [startTime, endTime] = [localStorage.getItem('startTime'), localStorage.getItem('endTime')]
      if (startTime) {
        this.startTime = startTime
      } else {
        this.startTime = '开始时间'
      }
      if (endTime) {
        this.endTime = endTime
      } else {
        this.endTime = '结束时间'
        // this.endTime = mango.indexTime(new Daet())
      }
    },
    isIPhoneX : function(fn){
      var u = navigator.userAgent;
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isIOS) {        
        if ((screen.height == 812 && screen.width == 375) || (screen.height == 896 && screen.width == 414)) {
          this.top = '22.3'
        }else{
          this.top = '16.5'
        } 
      }else{
        this.top = '16.5'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .selectComponent{
    position: fixed;
    width: 100%;
    // top: 16.5vw;
    // top: 22.5vw;
    background: #fff;
    z-index: 1000;
    .timeBtn{
     font-family: PINGPANG;
      height: 10.6vw;
      border-bottom: 1px solid #ccc;
    }
    h5{
      position: relative;
      color: #666;
      font-weight: 300;
      line-height: 10.6vw;
      
      span{
        position: absolute;
        right: 0;
        .cityChoose{
          width: 1.33vw;
          height:2.466vw ;
          margin-left: 2vw;
        }
      }
    }
    &>li{
      // width: 100%;
      // height: 8vw;
      position: relative;
      padding: 0 4.266vw;
      // margin: 0 1vw;
      input, li, button{
        display: block;
        width: 100%;
        height: 100%;
        // background: #f8f8f8;
        text-align: center;
        // border-radius: 4vw;
        border-bottom: 1px solid #ccc;
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
        li:first-child{
          border-top: 1px solid #e1e1e1;
        }
      }
    }
  }
</style>