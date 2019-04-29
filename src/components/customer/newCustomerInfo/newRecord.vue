<template>
  <div>
    <ul class="newRecord">
      <li is="followSelect" @followWayChange="followWayChange" ></li>
      <li class="timeLi" is="customerLi" :start="'*'" :leftText="'跟进时间'" :icon="true" @click.native="selectFollowTime">
        <span>{{turnDate(newCustomerInfo.followDate || '请选择日期')}}</span>
      </li>
      <li is="leaveStoreSelect" :start="true" :text='"跟进时长"' :type='true' @leaveStoreChange2="leaveStoreChange2"></li>
      
      <li class="noPadding">
        <remark :title="'跟进情况'">
          <textarea v-model="newCustomerInfo.situation" name="" id="" placeholder="描述一下跟进情况" oninput="if(value.length>5)value=value.slice(0,200)"></textarea>
        </remark>
      </li>
      <!-- <li>
        <my-range :title="'成交概率'" @changeVal="changeMyRangeVal" />
      </li> -->
      <li class="timeLi top" is="customerLi" :start="'*'" :leftText="'下次跟进'" :icon="true" @click.native="selectTime">
        <span>{{turnDate(newCustomerInfo.nextDate) || '请选择日期'}}</span>
      </li>
      <li class="noPadding">
        <remark :title="'下一步计划'">
          <textarea v-model="newCustomerInfo.plan" name="" id="" placeholder="请填写下一步跟进计划" oninput="if(value.length>5)value=value.slice(0,200)"></textarea>
        </remark>
      </li>
    </ul>
    <upLoad ref="upload" :path="path" picLen='5' :clear="isClear"/>
    <!-- <upLoad /> -->
    <p class="bottom">到底啦</p>
    <!-- <div class="btnsBox">
      <big-btn :text="'上一步'" @click.native="preModule"></big-btn>
      <big-btn :text="'保存'" @click.native="saveTalksRecord"></big-btn>
    </div> -->
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
  </div>
</template>

<script>
import Vue from 'vue'
import Vuex, { mapMutations, mapState } from "vuex"
import { DatetimePicker, MessageBox } from 'mint-ui'
import followSelect from '../../select/followSelect'
import leaveStoreSelect from '../../select/leaveStoreSelect'
// import upLoad from './upload'
import upLoad from '../../upload/filesUpload'
Vue.component(DatetimePicker.name, DatetimePicker)
import remark from '../remark'
import myRange from '../myRange'
import customerLi from '../customerLi'
import bigBtn from '../bigBtn'
import mango from '../../../js'
import {turnParams, returnDate} from '../../../utils/customer'
export default {
  name:'newRecord',
  components: {
    remark,
    myRange,
    customerLi,
    bigBtn,
    followSelect,
    leaveStoreSelect,
    upLoad
  },
  props: ['btns'],
  data(){
    return{
      today: new Date(),
      setDay: '',
      path:this.$route.fullPath,
      isClear:true
    }
  },
  watch: {
      //初始进来的时候初始化数据
    fromName() {
      if(this.fromName === 'NewCustomer') {
        this.setInitData()
      }
    }
  },
  computed: {
    ...mapState({
      newCustomerInfo: state => state.customer.newCustomerInfo,
      followVal: state => state.select.followVal
    })
  },
  created() {
    //获取本地缓存信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    this.setDay = mango.indexTimeB(this.today)[0]
  },
  methods: {
    ...mapMutations(["setNewCustomerInfo", 'setFollowVal', 'setFollowTiming']),
    // changeMyRangeVal(val) {
    //   // console.log('mtrange:', val)
    //   this.newCustomerInfo.percent = val
    // },
    //初始化
    setInitData() {
      this.newCustomerInfo.followDate = mango.indexTimeB(this.today)[1]
      this.setNewCustomerInfo(this.newCustomerInfo)
      this.setFollowVal('')
      this.setFollowTiming('')
    },
    selectTime() {
      this.$refs.DatePicker.open()
    },
    selectFollowTime() {
      this.$refs.followDatePicker.open()
    },
    //跟进日期
    setFollowTime(value) {
      this.$set(this.newCustomerInfo, 'followDate', mango.indexTimeB(value)[1])
    },
    //下次跟进日期
    setTime(value) {
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
    },
    //跟进方式
    followWayChange(val) {
      this.setFollowVal(val)
      this.newCustomerInfo.source2 = val
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
    //跟进时长
    leaveStoreChange2(val) {
      this.setFollowTiming(val)
      this.newCustomerInfo.residentTime2 = val
      this.setNewCustomerInfo(this.newCustomerInfo)
    }
    // preModule() {
    //   this.btns[1].status = true
    //   this.btns[2].status = false
    //   this.$emit('changeBtnsStatus', this.btns)  
    // },
    // updateParams(obj) {
    //   let tempObj = {}
    //   let temp = {
    //     account: this.ajaxData.account,   //登录账户
    //     tenantId: this.ajaxData.tenantId,
    //     'details.username': obj.username,
    //     'details.sex': obj.sex === '男' ? 1 : 2,  //性别(1:男,2:女,0:未知)，
    //     'details.storeDate': returnDate(obj.storeDate),
    //     'details.phone': obj.phone,
    //     'details.source': obj.source,
    //     'details.province': '440000',
    //     'details.city': '441900',
    //     'details.area': '441911',
    //     'details.address': obj.address,
    //     'details.leaveStore': obj.leaveStore,    //留店时间，
    //     'details.urgency': obj.urgency,   //紧急，1/2/3级，一级最高
    //     'details.important': obj.important,  //重要，1/2/3级，一级最高
    //     'demand.intention': obj.intention,   //意向产品，
    //     'demand.colorPref': obj.colorPref,
    //     'demand.stylePref': obj.stylePref,
    //     'demand.buyReason': obj.buyReason,
    //     'demand.progress': obj.progress,
    //     'demand.roomNum': obj.roomNum,
    //     'demand.remark': obj.remark,
    //     'demand.shopId': obj.shopId,
    //     'record.followSituation': obj.followSituation,
    //     'record.probability': obj.percent,
    //     'record.followTime': returnDate(obj.followTime) || mango.indexTimeB(new Date())[1],   //默认为今天
    //     'record.followPlan': obj.followPlan
    //   }
    //   for (let key in temp) {
    //     if (temp[key] || temp[key] === 0) {
    //       tempObj[key] = temp[key]
    //     }
    //   }
    //   return tempObj
    // }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/common.scss";
  .newRecord{
    li{
      // padding: 0 5vw;
      display: flex;
      flex-direction: column;
      strong{
        font-size: 20px;
        color: $fontCol;
      }
      &>span{
        line-height: 1em;
      }
    }
    li.noPadding{
      padding: 1vw 0;
    }
    li.timeLi{
      flex-direction: row;
    }
    .top {
      margin-top: 2vw;
      border-top: 1px solid #ccc;
    }
  }
  .btnsBox{
    display: flex;
    button{
      margin: 5vw;
    }
  }
  .bottom {
    width: 100vw;
    text-align: center;
    color: #909090;
    font-size: 3.4vw;
  }
</style>
