<template>
  <div class="newDemand">
    <ul>
      <li is="customerLi" :leftText="'意向产品'" :start="'*'">
        <input v-model="newCustomerInfo.intention" placeholder="请填写意向产品" type="text">
      </li>
      <li is="shopSelect"  @shopChange="shopChange"></li>
      <li is="customerLi" :leftText="'进店日期'" :icon="true" @click.native="selectStoreDate">
        <span :style="timeColor">{{turnDate(newCustomerInfo.storeDate) || '请选择进店日期'}}</span>
      </li>
      <li is="leaveStoreSelect" :leaveStoreVal="newCustomerInfo.leaveStore" @leaveStoreChange="leaveStoreChange"></li>
      <li is="customerLi" :leftText="'颜色偏好'" :icon="true" @click.native="selectColorPref">
        <span >{{newCustomerInfo.colorPref || '请填写颜色偏好'}}</span>
      </li>
      <li is="customerLi" :leftText="'风格偏好'" :icon="true" @click.native="selectStylePref">
        <span >{{newCustomerInfo.stylePref || '请填写风格偏好'}}</span>
      </li>
       <li is="customerLi" :leftText="'购买原因'" :icon="true" @click.native="selectBuyReason">
        <span >{{newCustomerInfo.buyReason || '请选择购买原因'}}</span>
      </li>
      <li is="customerLi" :leftText="'装修进度'" :icon="true" @click.native="selectProgress">
        <span >{{newCustomerInfo.progress || '请选择装修进度'}}</span>
      </li>
      <li is="customerLi" :leftText="'房间数量'" :icon="true" @click.native="selectRoomNum">
        <span >{{roomNum || '请填写房间数量'}}</span>
      </li>
      <!-- <li is="customerLi" :leftText="'所属门店'" :icon="true" @click.native="selectShopId">
        <span>{{shopName}}</span>
      </li> -->
      <!-- <li is="customerLi" :leftText="'房间数量'">
        <input v-model="newCustomerInfo.roomNum" placeholder="请填写房间数量" type="number">
      </li> -->
      <li class="textarea">
        <h3>备注：</h3>
        <textarea v-model="newCustomerInfo.remark" placeholder="描述一下情况吧"></textarea>
      </li>
      <!-- <li>
        <big-btn :text="'上一步'" @click.native="preModule"></big-btn>
        <big-btn :text="'下一步'" @click.native="nextModule"></big-btn>
      </li> -->
    </ul>
    <div class="mintComponent">
      <!-- 性别选择插件 -->
      <mt-popup 
      position="bottom"
      v-model="popupVisible">
        <mt-picker
        :slots="slots"
        @change="onValuesChange"
        ref="Picker"></mt-picker>
      </mt-popup>
       <mt-datetime-picker
        ref="datePicker"
        type="date"
        v-model="today"
        :startDate="new Date('1930-01-01')"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="setStoreDate">
      </mt-datetime-picker>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuex, { mapMutations, mapState } from 'vuex'
import { Picker, Popup } from 'mint-ui'
import leaveStoreSelect from '../../select/leaveStoreSelect'
Vue.component(Picker.name, Picker)
Vue.component(Popup.name, Popup)
import customerLi from '../../../components/customer/customerLi'
import bigBtn from '../../../components/customer/bigBtn'
import shopSelect from '../../select/shopSelect'
import mango from '../../../js'
import {turnParams} from '../../../utils/customer'
export default {
  name:'newDemand',
  props: ['btns'],
  components: {
    customerLi,
    bigBtn,
    shopSelect,
    leaveStoreSelect
  },
  data(){
    return{
      popupVisible: false,
      slots: [],
      progressList: [{values: ['装修中', '装修完成', '毛坯阶段', '水电木工', '油漆吊顶', '橱柜安装', '地板安装', '木门安装', '洁具安装', '灯饰安装']}],
      buyReasonList: [{values: ['旧床换新', '新房购置', '婚房购置']}],
      roomNumList: [{values: [1, 2, 3, 4, '5及以上']}],
      colorPrefList: [{values :['暖色', '冷色']}],
      stylePrefList: [{values: ['现代', '中式古典', '欧式', '美式', '新中式']}],
      shopNameList: [{values: []}],
      pickerShow: {
        progress: false,
        buyReason: false,
        roomNum: false,
        colorPref: false,
        stylePref: false
      },
      proto: '',
      roomNum: '',
      shopName: '',
      shopId: '',
      timeColor: 'color: #999',
      today: new Date()
   }
  },
  computed: {
    ...mapState({
      newCustomerInfo: state => state.customer.newCustomerInfo,
      shopVal: state => state.select.shopVal,
      leaveStoreVal: state => state.select.leaveStoreVal
    })
  },
  created() {
    //获取本地缓存信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
  },
  mounted() {
    // this.getShopName()
    // console.log('客户信息：：', this.customerInfo)
    // this.getDemand()
  },
  methods: {
    ...mapMutations(["setNewCustomerInfo",'setShopVal','setLeaveStoreVal']),
    shopChange(val) {
      this.setShopVal(val)
    },
    //选择门店
    leaveStoreChange(val) {
      // console.log('sex改变了：', val)
      this.setLeaveStoreVal(val)
      this.newCustomerInfo.leaveStore = val
    },
    //打开日期选择插件
    selectStoreDate() {
      this.$refs.datePicker.open()
    },
    //选择日期
    setStoreDate(value) {
      this.timeColor = 'color: #363636'
      this.$set(this.newCustomerInfo, 'storeDate', mango.indexTimeB(value)[1])
    },
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
    // getShopName() {
    //   let shopName = []
    //   if(this.shops) {
    //     this.shops.forEach((item, index) => {
    //     shopName.push(item.name)
    //     this.shopNameList[0].values = shopName
    //   });
    //   }
    //   this.shopName = this.shopNameList[0].values[0]
    //   this.getShopID(this.shopName)
    //   this.$set(this.newCustomerInfo, 'shopId', this.shopId)
    // },
    // getShopID(name) {
    //   if(this.shops) {
    //     this.shops.forEach((item, index) => {
    //       if(item.name === name) {
    //         this.shopId = item.id
    //       }
    //   });
    //   }
    // },
    // setDemand() {
    //   this.setNewCustomerInfo(this.newCustomerInfo)
    // },
    setOptions(data, dataList) {
      if(!this.newCustomerInfo[`${data}`]) {
        this.newCustomerInfo[`${data}`] = dataList[0].values[0]
      }else {
        this.$refs.Picker.setSlotValue(0, this.newCustomerInfo[`${data}`])
      }
    },
    // selectShopId() {
    //   this.slots = this.shopNameList
    //   this.proto = 'shopId'
    //   // 设置性别选择插件的初始值
    //   this.$refs.Picker.setSlotValue(0, this.shopName)
    //   this.popupVisible = true
    // },
    selectProgress() {
      this.slots = this.progressList
      this.proto = 'progress'
      // 设置性别选择插件的初始值
      this.setOptions('progress', this.progressList)
      this.popupVisible = true
    },
    selectBuyReason() {
      this.slots = this.buyReasonList
      this.proto = 'buyReason'
      // 设置性别选择插件的初始值
      this.setOptions('buyReason', this.buyReasonList)
      this.popupVisible = true
    },
    selectRoomNum() {
      this.slots = this.roomNumList
      this.proto = 'roomNum'
      // 设置性别选择插件的初始值
      if(this.roomNum === '') {
        this.roomNum = this.roomNumList[0].values[0]
      }else {
        this.$refs.Picker.setSlotValue(0, this.roomNum)
      }
      this.popupVisible = true
    },
    selectColorPref() {
      this.slots = this.colorPrefList
      this.proto = 'colorPref'
      // 设置性别选择插件的初始值
      this.setOptions('colorPref', this.colorPrefList)
      this.popupVisible = true
    },
    selectStylePref() {
      this.slots = this.stylePrefList
      this.proto = 'stylePref'
      // 设置性别选择插件的初始值
      this.setOptions('stylePref', this.stylePrefList)
      this.popupVisible = true
    },
    onValuesChange(picker, values) {
      console.log('选择的装修进度', values)
      // this.newCustomerInfo.progress = values[0]
    //  if(this.proto == 'shopId') {
    //     this.shopName = values[0]
    //     if(this.shopName) {
    //       this.getShopID(this.shopName)
    //       this.newCustomerInfo.shopId = this.shopId
    //     }
    //     // else {
    //     //   this.newCustomerInfo.shopId = ''
    //     // }
    //   }else
       if(this.proto == 'roomNum') {
        this.roomNum = values[0]
        if(this.roomNum === '5及以上') {
          this.newCustomerInfo.roomNum = 5
        }else {
          this.newCustomerInfo.roomNum = this.roomNum
        }
      }else{
        this.newCustomerInfo[this.proto] = values[0]
      }
    }
    // preModule() {
    //   this.setDemand()
    //   this.btns[0].status = true
    //   this.btns[1].status = false
    //   this.$emit('changeBtnsStatus', this.btns)     
    // },
    // nextModule() {
    //   this.setDemand()
    //   this.btns[1].status = false
    //   this.btns[2].status = true
    //   this.$emit('changeBtnsStatus', this.btns)
    // }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/common.scss";
.newDemand{
  background: #f8f8f8;
  li{
    display: flex;
    h3{
      color: $fontCol;
      font-size: $fontSize;
      padding: 0 5vw;
      line-height: 3em;
      border-bottom: 1px solid #ccc;
    }
    textarea{
      background: #fff;
      width: 100vw;
      height: 40vw;
      padding: 3vw 5vw;
      box-sizing: border-box;
      font-size: $fontSize;
    }
  }
  li.textarea{
    display: block;
  }
  button{
    margin: 5vw;
  }
  .picker{
    width: 100vw;
  }
}
</style>
