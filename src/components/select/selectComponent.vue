<!-- <keep-alive> -->
<template>
  <ul class="selectComponent">
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
      ref="picker"
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
  components: {citySelect, DatetimePicker},
  data () {
    return {
      startTime: '',
      endTime: '2018-08',
      pickerValue: new Date(),
      timeType: 'start',
      rotate:'rotate(270deg)'   
    }
  },
  created() {
    this.getLocalStorageTime()
    
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
      this.$refs.picker.open()
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
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .selectComponent{
    // display: flex;
    // justify-content: flex-end;
    // align-items: center;
    // height: 8vw;
    // margin-right: 2%;
    // padding: 3vw;
      // margin-top: 16vw;
      // margin-bottom: -16vw;
    .picker-items{
      background: red
    }
    .timeBtn{
     font-family: PINGPANG;
      height: 10.6vw;
      // background: #f8f8f8;
      border-bottom: 1px solid #ccc;
      // box-shadow: 0px 1px 0px 0px 	#cccccc, inset 0px 1px 0px 0px 	#cccccc;
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
        // li{
        //   border-radius: 0;
        //   border-top: none;
        // }
        li:first-child{
          border-top: 1px solid #e1e1e1;
        }
      }
    }
  }
</style>