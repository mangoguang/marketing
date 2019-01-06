<template>
  <div class="timeSelect">
    <div class="content" @click.self="hideRightBar" :style="{'marginTop': `${marginTop}vw`}">
      <div>
        <ul>
          <li class="time">
            <h3>{{rightHeadTitle}}</h3>
            <ul>
              <li @click="openDatePicker('start')">
                <p>起始日</p>
                <strong>{{startDateVal}}</strong>
              </li>
              <li><span>至</span></li>
              <li @click="openDatePicker('end')">
                <p>结束日</p>
                <strong>{{endDateVal}}</strong>
              </li>
              <li><span>共{{countTime + 1}}日</span></li>
            </ul>
          </li>
          <li>
            <!-- 日期插件 -->
            <mt-datetime-picker
              ref="datePicker"
              type="date"
              v-model="pickerValue"
              year-format="{value} 年"
              month-format="{value} 月"
              day-format="{value} 日"
              @confirm="handleConfirm">
            </mt-datetime-picker>
          </li>
        </ul>
        <div class="botBtns">
          <button @click="resizeCustomerList">重置</button>
          <button class="on" @click="hideRightContainer">完成</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex, { mapState, mapMutations, mapGetters } from 'vuex'
import mango from '../../js'
import { DatetimePicker } from 'mint-ui'
Vue.use(Vuex)
Vue.component(DatetimePicker.name, DatetimePicker)

export default {
  props:[],
  data() {
    return {
      startDateVal: '',
      endDateVal: mango.indexTime(new Date(), 'day'),
      pickerValue: new Date(),
      dateType: '',
      headTitle: '',
      ajaxData: [],
      account: '',
      marginTop:''
    }
  },
  computed: {
    countTime() {
      let [start, end] = [(new Date(this.startDateVal)).getTime(), (new Date(this.endDateVal)).getTime()]
      console.log('time:', start/86400000, end/86400000)
      return Math.ceil((end - start)/86400000)
    },
    ...mapState({
      rightTimeSelect: state => state.rightContainer.rightTimeSelect,
      rightHeadTitle: state => state.rightContainer.rightHeadTitle,
      customerTime: state => state.rightContainer.customerTime,
      dealTime: state => state.rightContainer.dealTime
    })
  },
  created() {
    this.isIPhoneX()
    this.initStartDateVal()
    let ajaxData = localStorage.getItem("ajaxData");
    this.ajaxData = JSON.parse(ajaxData);
    this.account = this.ajaxData.account
  },
  mounted() {
  },
  methods: {
    ...mapMutations(['setRightTimeSelect', 'setCustomerTime', 'setDealTime']),
    openDatePicker(type) {
      this.dateType = type
      this.$refs.datePicker.open()
    },
    // 初始化起始日期
    initStartDateVal() {
      let date = new Date()
      date = mango.indexTime(date, 'day')
      date = `${date.slice(0, 8)}01`
      this.startDateVal = date
    },
     // 选择时间
    handleConfirm(date) {
      let [start, end, dateVal] = [null, null, null]
      if (this.dateType === 'start') {
        start = new Date(date).getTime()
        if(mango.indexTimeB(date)[1] === mango.indexTimeB(new Date(this.endDateVal))[1]) {
        }else{
          if ((start - new Date(this.endDateVal).getTime()) > 0) {
            alert('起始日不能大于结束日')
            return
          }
        }
      } else {
        end = new Date(date).getTime()
        if(mango.indexTimeB(date)[1] === mango.indexTimeB(new Date(this.startDateVal))[1]) {
        }else{
          if ((new Date(this.startDateVal).getTime() - end) > 0) {
            alert('结束日不能小于起始日')
            return
          }
        }
      }
      dateVal = mango.indexTime(date, 'day')
      this[`${this.dateType}DateVal`] = dateVal
    },
    //重置
    resizeCustomerList() {
      let time = {startTime: '', endTime: ''}
      if(this.rightHeadTitle === '订单交单日期') {
        this.setCustomerTime(time)
      }else {
        this.setDealTime(time)
      }
      this.setRightTimeSelect(false)
    },
    //确认的时候传递时间
    hideRightContainer() {
      let time = {startTime: this.startDateVal, endTime: this.endDateVal}
      if(this.rightHeadTitle === '订单交单日期') {
        this.setCustomerTime(time)
      }else {
        this.setDealTime(time)
      }
      this.setRightTimeSelect(false)
    },
    //点击隐藏
    hideRightBar() {
      this.setRightTimeSelect(false)
    },
    isIPhoneX: function(fn) {
      var u = navigator.userAgent;
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isIOS) {
        if (
          (screen.height == 812 && screen.width == 375) ||
          (screen.height == 896 && screen.width == 414)
        ) {
          this.marginTop = "-5.86";
          
        } else {
          this.marginTop = "";
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/common.scss";
.timeSelect{
  div.content{
    display: flex;
    justify-content: flex-end;
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .5);
    z-index: 1000;
    &>div{
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      position: relative;
      width: 80vw;
      height: 100vh;
      background: #fff;
      padding: 4vw;
      box-sizing: border-box;
      &>ul{
        // width: 100%;
        h3{
          font-size: $fontSize;
          color: $fontSubCol;
          margin-top: 3vw;
        }
        ul{
          display: flex;
          justify-content: space-between;
          width: 100%;
          li{
          }
          button{
            padding: 0 10vw;
            line-height: 3em;
            border-radius: 2vw;
            background: $bgCol;
            font-weight: 400;
          }
          button.on{
            color: $btnCol;
            background: $btnSubCol;
          }
        }
      }
      .botBtns{
        display: flex;
        position: absolute;
        bottom: 0;
        left: 0;
        // align-self: flex-end;
        font-size: 0;
        button{
          align-self: flex-start;
          width: 40vw;
          height: 22vw;
          background: #b2d7ff;
          color: #007aff;
          font-weight: 300;
        }
        button.on{
          background: #007aff;
          color: #fff;
        }
      }
    }
    .time{
      ul{
        background: $bgCol;
        padding: 1vw 4vw;
        line-height: 1.4em;
        box-sizing: border-box;
        border-radius: 2vw;
        li{
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          span{
            align-self: flex-end;
          }
        }
        p, span{
          color: $fontSubCol;
        }
      }
    }
  }
}
</style>
