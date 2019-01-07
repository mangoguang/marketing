<template>
  <div class="demandForm">
    <ul>
      <li is="customerLi" :leftText="'意向产品'">
        <input @change="emitEvent" v-model="demand.intention" placeholder="请填写意向产品" type="text">
      </li>
      <li is="customerLi" :leftText="'颜色偏好'" :icon="true" @click.native="selectColorPref">
        <span >{{demand.colorPref || '请填写颜色偏好'}}</span>
      </li>
      <li is="customerLi" :leftText="'风格偏好'" :icon="true" @click.native="selectStylePref">
        <span >{{demand.stylePref || '请填写风格偏好'}}</span>
      </li>
       <li is="customerLi" :leftText="'购买原因'" :icon="true" @click.native="selectBuyReason">
        <span>{{demand.buyReason || '请选择购买原因'}}</span>
      </li>
      <li is="customerLi" :leftText="'装修进度'" :icon="true" @click.native="selectProgress">
        <span>{{demand.progress || '请选择装修进度'}}</span>
      </li>
      <li is="customerLi" :leftText="'房间数量'" :icon="true" @click.native="selectRoomNum">
        <span>{{roomNum || '请填写房间数量'}}</span>
      </li>
      <li is="shopSelect" @shopChange="shopChange"></li>
      <!-- <li is="customerLi" :leftText="'所属门店'" :icon="true" @click.native="selectShopId">
        <span>{{shopName || '请选择门店'}}</span>
      </li> -->
      <!-- <li is="customerLi" :leftText="'房间数量'">
        <input @change="emitEvent" v-model="demand.roomNum" placeholder="请填写房间数量" type="number">
      </li> -->
      <li class="textarea">
        <h3>备注：</h3>
        <textarea @change="emitEvent" v-model="demand.remark" name="" id="" cols="30" rows="10" placeholder="描述一下情况吧"></textarea>
      </li>
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
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuex, { mapMutations, mapState } from 'vuex'
import { Picker, Popup } from 'mint-ui'

Vue.component(Picker.name, Picker)
Vue.component(Popup.name, Popup)
import customerLi from '../../components/customer/customerLi'
import bigBtn from '../../components/customer/bigBtn'
import shopSelect from '../select/shopSelect'
import mango from '../../js'
import {turnParams} from '../../utils/customer'
export default {
  name:'demandForm',
  components: {
    customerLi,
    bigBtn,
    shopSelect
  },
  props: ['defaultVal'],
  data(){
    return{
      demand: {},
      popupVisible: false,
      slots: [],
      progressList: [{values: ['装修中', '装修完成', '毛坯阶段', '水电木工', '油漆吊顶', '橱柜安装', '地板安装', '木门安装', '洁具安装', '灯饰安装']}],
      buyReasonList: [{values: ['旧床换新', '新房购置', '婚房购置']}],
      roomNumList: [{values: [1, 2, 3, 4, '5及以上']}],
      colorPrefList: [{values :['暖色', '冷色']}],
      stylePrefList: [{values: ['现代', '中式古典', '欧式', '美式', '新中式']}],
      shopNameList: [{values: []}],
      proto: '',
      roomNum:'',
      shopName: '',
      shopId: '',
      shops: []
    }
  },
  computed: {
    ...mapState({
      customerDemand: state => state.customer.customerDemand,
      shopVal: state => state.select.shopVal
    })
  },
  destroyed(){
    this.setShopVal('')
  },
  created() {
    //获取本地缓存信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    let shops = localStorage.getItem('shops')
    this.shops = JSON.parse(shops)
  },
  mounted() {
    // console.log(this.personMsg.shops)
    // this.getShopName()
    if (this.defaultVal) {
      this.demand = this.customerDemand
      this._isRoomNum()
      let tempId = this.customerDemand.shopId
      this._changeShopName(tempId)
    }
  },
  methods: {
    ...mapMutations(['setShopVal']),
    shopChange(val) {
      this.setShopVal(val)
      this.getShopID(this.shopVal)
    },
    //判断房间数量是否大于5
    _isRoomNum() {
      if(this.customerDemand.roomNum === 5) {
        this.roomNum = '5及以上'
      }else {
        this.roomNum = this.customerDemand.roomNum
      }
    },
    // getShopName(id) {
    //   let shopName = []
    //   if(this.shops) {
    //     this.shops.forEach((item, index) => {
    //     shopName.push(item.name)
    //     this.shopNameList[0].values = shopName
    //   });
    //   }
    // },
    _changeShopName(id) {
      if(id) {
        this.shops.forEach((item, index) => {
          if(item.id === id) {
            this.setShopVal(item.name) 
          }
      });
      } 
    },
    getShopID(name) {
      if(this.shops) {
        this.shops.forEach((item, index) => {
          item.name === name? this.shopId = item.id : ''
      });
      this.$set(this.demand, 'shopId', this.shopId)
      }
    },
    // selectShopId() {
    //   this.slots = this.shopNameList
    //   this.proto = 'shopId'
    //   // 设置性别选择插件的初始值
    //   this.$refs.Picker.setSlotValue(0, this.shopName)
    //   this.popupVisible = true
    // },
    setOptions(data, dataList) {
      if(!this.demand[`${data}`]) {
        this.demand[`${data}`] = dataList[0].values[0]
      }else {
        this.$refs.Picker.setSlotValue(0, this.demand[`${data}`])
      }
    },
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
      //设置性别选择插件的初始值
      setTimeout(() => {
        if(!this.demand.roomNum) {
          this.roomNum = this.roomNumList[0].values[0]
        }else {
          this.$refs.Picker.setSlotValue(0, this.roomNum)
        }
      }, 100);
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
      // this.demand.progress = values[0]
      // if(this.proto == 'shopId') {
      //   this.shopName = values[0]
      //   this.getShopID(this.shopName)
      //   this.demand.shopId= this.shopId
        
      // }else 
      if(this.proto == 'roomNum') {
        this.roomNum = values[0]
        if(this.roomNum === '5及以上') {
          this.demand.roomNum = 5
        }else {
          this.demand.roomNum = this.roomNum
        }
      }else {
        this.demand[this.proto] = values[0]
      }
    },
    emitEvent() {
      this.$emit('changeDemand', this.demand)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/common.scss";
.demandForm{
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
  .picker{
    width: 100vw;
  }
}
</style>
