<!-- <keep-alive> -->
<template>
  <div :class="`rightContainer ${rightContainerStatus}`" @click.prevent="test">
    <div class="content" @click="hideRightBar">
      <div>
        <ul>
          <li class="time">
            <h3>时间</h3>
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
              <li><span>共{{countTime}}日</span></li>
            </ul>
          </li>
          <li>
            <h3>紧急</h3>
            <ul>
              <li v-for="(item, index) in urgencyBtns"
              :key="`urgencyBtns${index}`">
                <button 
                :class="{on: item.status}"
                @click="urgencySelect(index)">{{item.name}}</button>
              </li>
            </ul>
          </li>
          <li>
            <h3>关键</h3>
            <ul>
              <li v-for="(item, index) in keyBtns"
              :key="`keyBtns${index}`">
                <button 
                :class="{on: item.status}"
                @click="keySelect(index)">{{item.name}}</button>
              </li>
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
<!-- </keep-alive> --> 

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex, { mapState, mapMutations, mapGetters } from 'vuex'
import mango from '../../js'
import { DatetimePicker } from 'mint-ui'
Vue.use(Vuex)
Vue.component(DatetimePicker.name, DatetimePicker)
export default {
  name: 'rightContainer',
  props:[''],
  data () {
    return {
      paramsObj: {},
      pickerValue: new Date(),
      startDateVal: '',
      endDateVal: mango.indexTime(new Date(), 'day'),
      dateType: '',
      urgencyBtns: mango.btnList(['是', '否']),
      keyBtns: mango.btnList(['高', '中', '低']),
      ajaxData:[]
    }
  },
  computed: {
    ...mapState({
      rightContainerStatus: state => state.rightContainer.rightContainerStatus,
      customerAjaxParams: state => state.customer.customerAjaxParams
    }),
    // startDateVal() {
    //   return mango.indexTime(this.startTime, 'day')
    // },
    // endDateVal() {
    //   return mango.indexTime(this.endTime, 'day')
    // },
    countTime() {
      let [start, end] = [(new Date(this.startDateVal)).getTime(), (new Date(this.endDateVal)).getTime()]
      console.log('time:', start/86400000, end/86400000)
      return Math.ceil((end - start)/86400000)
    }
  },
  // watch:{
  //   rightContainerStatus() {
  //     console.log(123,this.rightContainerStatus)
  //   }
  // },
  created() {
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    this.initStartDateVal()
  },
  mounted(){
    let str = new Date()
    // console.log(333, str.getTime())
    // 对象深拷贝
    let temp = this.customerAjaxParams
    for (let key in temp) {
      this.paramsObj[key] = temp[key]
    }
  },
  methods:{
    ...mapMutations([
      'setRightContainerStatus',
      'setCustomerAjaxParams',
      'setAllLoaded',
      'setCustomerList'  
    ]),
    test() {
      console.log('success')
    },
    // 初始化起始日期
    initStartDateVal() {
      let date = new Date()
      date = mango.indexTime(date, 'day')
      date = `${date.slice(0, 8)}01`
      this.startDateVal = date
    },
    // 打开日期插件
    openDatePicker(type) {
      this.dateType = type
      this.$refs.datePicker.open()
    },
    //重置
    resizeCustomerList() {
      console.log(111,this.customerAjaxParams)
      // this.setRightContainerStatus('hideRightContainer')
    },
    // 隐藏右侧边栏
    hideRightContainer() {
      // this.paramsObj.startTime = this.startDateVal
      this.$set(this.paramsObj, 'startTime', this.startDateVal)
      this.$set(this.paramsObj, 'endTime', this.endDateVal)
      // this.paramsObj.endTime = this.endDateVal
      console.log(222,this.paramsObj)
      if(this.paramsObj.u == 2) {     //非紧急写死了为9
        this.paramsObj.u = 9
      }
      console.log(112233, this.paramsObj)
      // this.setCustomerAjaxParams(mango.customerAjaxParams)
      // this.paramsObj.page = 1
      // this.setAllLoaded(false)
      this.setCustomerAjaxParams(this.paramsObj)
      console.log(11111,this.customerAjaxParams)
      this.setRightContainerStatus('hideRightContainer')
    },
    hideRightBar() {
      // this.setRightContainerStatus('hideRightContainer')
    },
    // 紧急程度选择
    urgencySelect(i) {
      let status = this.urgencyBtns[i].status
      if (status) {
        // 反选
        this.urgencyBtns[i].status = false
        this.paramsObj.u = ''
      } else {
        mango.changeBtnStatus(this.urgencyBtns, i)
        this.paramsObj.u = i + 1
      }
    },
    // 关键程度选择
    keySelect(i) {
      let status = this.keyBtns[i].status
      if (status) {
        // 反选
        this.keyBtns[i].status = false
        this.paramsObj.i = ''
      } else {
        mango.changeBtnStatus(this.keyBtns, i)
        this.paramsObj.i = i + 1
      }
    },
    // 选择时间
    handleConfirm(date) {
      let [start, end, dateVal] = [null, null, null]
      if (this.dateType === 'start') {
        start = new Date(date).getTime()
        console.log(mango.indexTime(date, 'day'), this.startDateVal)
        if ((start - new Date(this.endDateVal).getTime()) > 0) {
          alert('起始日不能大于结束日')
          return
        }
      } else {
        end = new Date(date).getTime()
        if ((new Date(this.startDateVal).getTime() - end) > 0) {
          alert('结束日不能小于起始日')
          return
        }
      }
      dateVal = mango.indexTime(date, 'day')
      this[`${this.dateType}DateVal`] = dateVal
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../assets/common.scss";
.rightContainer{
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
.hideRightContainer{
  display: none; 
}
.showRightContainer{
  display: block;
}
</style>