<template>
  <div class="customerDemand">
    <ul>
      <li is="customerLi" :leftText="'意向产品'">
        <input v-model="customerDemand.intention" placeholder="请填写意向产品" type="text">
      </li>
      <li is="customerLi" :leftText="'颜色偏好'" :icon="true" @click.native="selectColorPref">
        <span >{{customerDemand.colorPref || '请填写颜色偏好'}}</span>
      </li>
      <li is="customerLi" :leftText="'风格偏好'" :icon="true" @click.native="selectStylePref">
        <span >{{customerDemand.stylePref || '请填写风格偏好'}}</span>
      </li>
      <li is="customerLi" :leftText="'购买原因'" :icon="true" @click.native="selectBuyReason">
        <span>{{customerDemand.buyReason || '请选择购买原因'}}</span>
      </li>

      <li is="customerLi" :leftText="'装修进度'" :icon="true" @click.native="selectProgress">
        <span>{{customerDemand.progress || '请选择装修进度'}}</span>
      </li>
      <!-- <li is="customerLi" :leftText="'房间数量'">
        <input v-model="customerDemand.roomNum" placeholder="请填写房间数量" type="number">
      </li> -->
      <li is="customerLi" :leftText="'房间数量'" :icon="true" @click.native="selectRoomNum">
        <span>{{roomNum || '请填写房间数量'}}</span>
      </li>
      <li is="customerLi" :leftText="'所属门店'" :icon="true" @click.native="selectShopId">
        <span>{{shopName || '请选择门店'}}</span>
      </li>
      <li class="textarea">
        <h3>备注：</h3>
        <textarea name="" id="" cols="30" rows="10" placeholder="描述一下情况吧"></textarea>
      </li>
      <li>
        <big-btn :text="'保存'" @click.native="saveCustomerDemand"></big-btn>
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
import customerLi from '../../../components/customer/customerLi'
import bigBtn from '../../../components/customer/bigBtn'
import mango from '../../../js'
import {turnParams} from '../../../utils/customer'
export default {
  name:'customerDemand',
  components: {
    customerLi,
    bigBtn
  },
  data(){
    return{
      customerDemand: {},
      popupVisible: false,
      slots: [],
      progressList: [{values: ['装修中', '装修完成', '毛坯阶段', '水电木工', '油漆吊顶', '橱柜安装', '地板安装', '木门安装', '洁具安装', '灯饰安装']}],
      buyReasonList: [{values: ['旧床换新', '新房购置', '婚房购置']}],
      roomNumList:[{values: [1, 2, 3, 4, '5及以上']}],
      colorPrefList: [{values :['暖色', '冷色']}],
      stylePrefList: [{values: ['现代', '中式古典', '欧式', '美式', '新中式', '辅助查询']}],
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
      shopId: ''
    }
  },
  computed: {
    ...mapState({
      customerInfo: state => state.dealOrderInfoDetails.dealOrderInfoDetails,
      personMsg: state => state.personMsg.personMsg
    })
  },
  watch: {
    // 'customerInfo': function(){
    //   console.log(888, this)
    //   this.customerDemand = {
    //     intention: '',
    //     colorPref: '',
    //     stylePref: '',
    //     buyReason: '',
    //     progress: '',
    //     roomNum: '',
    //     remark: ''
    //   }
    //   let arr = this.customerInfo.demandList
    //   if (arr) {
    //     arr = arr.map(item => {
    //       return item.intention
    //     })
    //     this.customerDemand.intention = arr.join('、')
    //   }
    // }
  },
  created() {
    //获取本地缓存信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
  },
  mounted() {
    this.getShopName()
    // console.log(15646,this.personMsg)
    // console.log('客户信息：：', this.customerInfo)
    // this.getDemand()
  },
  methods: {
    //获取门店信息
    getShopName() {
      let shopName = []
      if(this.personMsg.shops) {
        this.personMsg.shops.forEach((item, index) => {
        shopName.push(item.name)
        this.shopNameList[0].values = shopName
      });
      }
      this.shopName = this.shopNameList[0].values[0]
      // this.getShopID(this.shopName)
      // this.$set(this.newCustomerInfo, 'shopId', this.shopId)
    },
    getShopID(name) {
      if(this.personMsg.shops) {
        this.personMsg.shops.forEach((item, index) => {
          item.name === name? this.shopId = item.id : ''
          console.log(this.shopId)
      });
      }
    },
    getDemand() {
      mango.getAjax(this, 'demand', {
        account: this.ajaxData.account,   //登录账户
        tenantId: this.ajaxData.tenantId,
        id: this.$route.params.id,
        ...turnParams(this.customerDemand, 'demand')
      },'v2', 'post').then((res) => {
        console.log('保存数据成功', res)
      })
    },
    selectShopId() {
      this.slots = this.shopNameList
      this.proto = 'shopId'
      // 设置性别选择插件的初始值
      this.$refs.Picker.setSlotValue(0, this.shopName)
      this.popupVisible = true
    },
    selectProgress() {
      this.slots = this.progressList
      this.proto = 'progress'
      // 设置性别选择插件的初始值
      this.$refs.Picker.setSlotValue(0, this.customerDemand.progress)
      this.popupVisible = true
    },
    selectBuyReason() {
      this.slots = this.buyReasonList
      this.proto = 'buyReason'
      // 设置性别选择插件的初始值
      this.$refs.Picker.setSlotValue(0, this.customerDemand.buyReason)
      this.popupVisible = true
    },
    selectRoomNum() {
      this.slots = this.roomNumList
      this.proto = 'roomNum'
      // 设置性别选择插件的初始值
      this.$refs.Picker.setSlotValue(0, this.roomNum)
      this.popupVisible = true
    },
    selectColorPref() {
      this.slots = this.colorPrefList
      this.proto = 'colorPref'
      // 设置性别选择插件的初始值
      this.$refs.Picker.setSlotValue(0, this.customerDemand.colorPref)
      this.popupVisible = true
    },
    selectStylePref() {
      this.slots = this.stylePrefList
      this.proto = 'stylePref'
      // 设置性别选择插件的初始值
      this.$refs.Picker.setSlotValue(0, this.customerDemand.stylePref)
      this.popupVisible = true
    },
    onValuesChange(picker, values) {
      console.log('选择的装修进度', values)
     if(this.proto == 'roomNum') {
        this.roomNum = values[0]
        if(this.roomNum === '5及以上') {
          this.customerDemand.roomNum = 5
        }else {
          this.customerDemand.roomNum = this.roomNum
        }
      }else if(this.proto == 'shopId') {
        this.shopName = values[0]
      }
      else{
        this.customerDemand[this.proto] = values[0]
      }
    },
    hasShopId() {
      if(this.shopName) {
        this.getShopID(this.shopName)
        this.$set(this.customerDemand, 'shopId', this.shopId)
      }
    },
    saveCustomerDemand() {
      let id = this.$route.params.id
      this.hasShopId()
      if (this.customerDemand.intention && this.customerDemand.intention != '') {
        mango.getAjax(this, 'customer/update', {
          customerId: id,
          account: this.ajaxData.account,   //登录账户
          tenantId: this.ajaxData.tenantId,
          'details.phone': this.customerInfo.phone,
          shopId: this.customerDemand.shopId,
          ...turnParams(this.customerDemand, 'demand')
        },'v2', 'post').then((res) => {
          if (res) {
            // this.$router.go(0)
            mango.tip('保存成功！')
          }
        })
      } else {
        mango.tip('请填写意向产品！')
      }
      console.log('客户信息：：', this.customerDemand)      
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/common.scss";
.customerDemand{
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
