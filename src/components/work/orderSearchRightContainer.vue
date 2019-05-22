<!-- <keep-alive> -->
<template>
  <div :class="`rightContainer ${rightContainerStatus}`">
    <div class="content" @click.self="hideRightBar">
      <div>
        <ul>
          <li class="time">
            <h3>订单交期</h3>
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
          <div>
            <h3>订单状态</h3>
            <ul class="status">
              <li v-for="(item, index) in orderSearchBtns"
              :key="`orderSearchBtns${index}`">
                <button 
                :class="{on: item.status}"
                @click="orderSearchSelect(index)">{{item.name}}</button>
              </li>
            </ul>
          </div>
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
import { deepclone } from "../../utils/customer";
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex, { mapState, mapMutations, mapGetters } from 'vuex'
import mango from '../../js'
import { DatetimePicker } from 'mint-ui'
Vue.use(Vuex)
Vue.component(DatetimePicker.name, DatetimePicker)
import { IndexModel } from "../../utils/"
const indexModel = new IndexModel()
export default {
  name: 'rightContainer',
  props:[''],
  data () {
    return {
      pickerValue: new Date(),
      startDateVal: '',
      endDateVal: mango.indexTime(new Date(), 'day'),
      dateType: '',
      orderSearchBtns: [],
      orderStatusList: [],
      orderStatus: {},
      ajaxData:[],
      marginTop:'',
      orderSelectParam: {}
    }
  },
  computed: {
    ...mapState({
      orderData: state => state.work.orderData,
      orderSearchParam: state => state.work.orderSearchParam,
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
      // console.log('time:', start/86400000, end/86400000)
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
    this.isIPhoneX()
    let str = new Date()
    // console.log(333, str.getTime())
    // 对象深拷贝
    this.getOrderStatusList()
  },
  methods:{
    ...mapMutations([
      "setOrderData",
      'setOrderSearchParam',
      'setRightContainerStatus',
      'setCustomerAjaxParams',
      'setAllLoaded',
      'setCustomerList'
    ]),
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
      mango.changeBtnStatus(this.orderSearchBtns, '')
      let params = {
        page: 1,
        limit: 30
      }
      this.setOrderSearchParam(params)
      this.getOrderList(params)
      this.setRightContainerStatus('hideRightContainer')
    },
    // 隐藏右侧边栏
    hideRightContainer() {
      let params = {
        page: 1,
        limit: 30,
        status: this.orderStatus.code,
        startTime: this.startDateVal, //交期时间（需求时间）
        endTime: this.endDateVal
      }
      // 提交请求参数到vuex
      this.setOrderSearchParam(params)
      this.getOrderList(params)
      this.setRightContainerStatus('hideRightContainer')
    },
    hideRightBar() {
      this.setRightContainerStatus('hideRightContainer')
    },
    // 订单状态选择
    orderSearchSelect(i) {
      if (this.orderStatus.code === this.orderStatusList[i].code) {
        mango.changeBtnStatus(this.orderSearchBtns)
        this.orderStatus = {}
      } else {
        this.orderStatus = {
          name: this.orderStatusList[i].name,
          code: this.orderStatusList[i].code
        }
        mango.changeBtnStatus(this.orderSearchBtns, i)
      }
      console.log(11111111, this.orderStatus)
    },
    // 选择时间
    handleConfirm(date) {
      let [start, end, dateVal] = [null, null, null]
      if (this.dateType === 'start') {
        start = new Date(date).getTime()
        // console.log(mango.indexTime(date, 'day'), this.startDateVal)
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
    },
    getOrderStatusList() {
      indexModel.getArea('FS_ORDER_STATUS').then((res) => {
        res = res.data
        if (res) {
          this.orderStatusList = res
          const arr = res.map(item => item.name)
          this.orderSearchBtns = mango.btnList(arr)
        }
      }).catch((reject) => {
        if (reject === 510) {
          this.getOrderStatusList()
        }
      })
    },
    getOrderList(obj) {
      indexModel.getOrderList(obj).then((res) => {
        res = res.data
        if (res) {
          this.setOrderData(res)
        }
      }).catch((reject) => {
        if (reject === 510) {
          this.getOrderList(obj)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../assets/common.scss";
.rightContainer{
  // position: fixed;
  // top: 0;
  // right: 0;
  // z-index: 999;
  div.content{
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    position: fixed;
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
      padding: 4.53vw;
      padding-top:5.333vw;
      box-sizing: border-box;
      &>ul{
        // width: 100%;
        h3{
          font-size: $fontSize;
          color: $fontSubCol;
          margin-top: 5.333vw;
          margin-bottom: 2.666vw;
        }
        li:first-child{
          h3{
            margin-top: 0;
          }
        }
        ul{
          display: flex;
          // justify-content: space-between;
          width: 100%;
          li{
          }
          button{
            padding: 0 4vw;
            line-height: 3em;
            border-radius: 2vw;
            background: $bgCol;
            font-weight: 400;
            margin-right: 2vw;
            margin-top: 2vw;
            color: #666;
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
        display: flex;
        justify-content: space-between;
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
    ul.status{
      display: flex;
      flex-wrap: wrap;
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