<template>
  <div class="newDemand">
    <ul>
      <li is="customerLi" :leftText="'意向产品'" :start="'*'">
        <input v-model="newCustomerInfo.intention" placeholder="请填写意向产品" type="text">
      </li>
      <li is="shopSelect" ></li>
      <li is="customerLi" :leftText="'进店日期'" :start="'*'" :icon="true" @click.native="selectStoreDate">
        <span :style="timeColor">{{turnDate(newCustomerInfo.storeDate) || '请选择进店日期'}}</span>
      </li>
      <li is="leaveStoreSelect" :start="true" :leaveStoreVal="newCustomerInfo.leaveStore" @leaveStoreChange="leaveStoreChange"></li>
      <li is="sourceSelect" :sourceVal="newCustomerInfo.source" @sourceChange="sourceChange" @codeChange='codeChange'></li>
      <li is="customerLi" :leftText="'客户地址'" :icon='true'>
         <span style="color: #999">请选择客户地址</span>
      </li>
      <li is="customerLi" :leftText="'户型大小'">
        <input v-model="newCustomerInfo.home" type="text" placeholder="请先选客户地址">
      </li>
       <li is="customerLi" :leftText="'有无电梯'">
        <input v-model="newCustomerInfo.lift" type="text" placeholder="请先选客户地址">
      </li>
       <li is="customerLi" :leftText="'购买原因'" :icon="true" @click.native="selectBuyReason">
        <span :style="color">{{newCustomerInfo.buyReason || '请选择购买原因'}}</span>
      </li>
       <li is="customerLi" :leftText="'装修风格'" :icon="true" @click.native="selectStylePref">
        <span :style="styleColor">{{newCustomerInfo.stylePref || '请填写风格偏好'}}</span>
      </li>
      <li is="customerLi" :leftText="'装修进度'" :icon="true" @click.native="selectProgress">
        <span :style="proColor">{{newCustomerInfo.progress || '请选择装修进度'}}</span>
      </li>
      <li is="customerLi" :leftText="'竞品产品'">
        <input v-model="newCustomerInfo.aproduct" type="text" placeholder="请填写竞品产品">
      </li>
       <li is="customerLi" :leftText="'颜色偏好'" :icon="true" @click.native="selectColorPref">
        <span :style="Color">{{newCustomerInfo.colorPref || '请填写颜色偏好'}}</span>
      </li>
      <li is="customerLi" :leftText="'预算金额'">
        <input v-model="newCustomerInfo.pay" type="number" placeholder="请填写预算金额">
      </li>
      <li is="customerLi" :leftText="'已交定金'">
        <input v-model="newCustomerInfo.pay" type="number" placeholder="请填写已交金额">
      </li>
      <li is="discountSelect" :discountVal="newCustomerInfo.discount" @discountChange="discountChange"></li>
      <!-- <li is="customerLi" :leftText="'房间数量'" :icon="true" @click.native="selectRoomNum">
        <span >{{roomNum || '请填写房间数量'}}</span>
      </li> -->
      <!-- <li is="customerLi" :leftText="'所属门店'" :icon="true" @click.native="selectShopId">
        <span>{{shopName}}</span>
      </li> -->
      <!-- <li is="customerLi" :leftText="'房间数量'">
        <input v-model="newCustomerInfo.roomNum" placeholder="请填写房间数量" type="number">
      </li> -->
      <li class="textarea">
        <h3>备注信息</h3>
        <textarea v-model="newCustomerInfo.remark" placeholder="添加备注信息"></textarea>
      </li>
      <intentionSelect :intentionVal='intentionVal'/>
      <urgentSelect :urgentVal='urgentVal'/>
      <!-- <li>
        <big-btn :text="'上一步'" @click.native="preModule"></big-btn>
        <big-btn :text="'下一步'" @click.native="nextModule"></big-btn>
      </li> -->
    </ul>
    <div class="mintComponent">
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
import sourceSelect from '../../select/sourceSelect'
import discountSelect from '../../select/discountSelect'
import intentionSelect from '../../select/intentionSelect'
import urgentSelect from '../../select/urgentSelect'
import mango from '../../../js'
import {turnParams} from '../../../utils/customer'
export default {
  name:'newDemand',
  props: ['btns', 'fromName'],
  components: {
    customerLi,
    bigBtn,
    shopSelect,
    leaveStoreSelect,
    sourceSelect,
    discountSelect,
    urgentSelect,
    intentionSelect
  },
  data(){
    return{
      popupVisible: false,
      slots: [],
      progressList: [{values: ['前期设计', '主体拆改', '水电改造', '木工', '贴砖', '刷墙面漆', '厨卫吊顶', '橱柜安装', '木门安装', '地板安装', '铺贴壁纸', '开关插座安装', '灯具安装', '五金洁具安装', '窗帘杆安装', '拓荒保洁', '家具进场', '家电安装', '家居配饰', '装修完成']}],
      buyReasonList: [{values: ['旧床换新', '新房购置', '婚房购置']}],
      roomNumList: [{values: [1, 2, 3, 4, '5及以上']}],
      colorPrefList: [{values :['暖色', '冷色']}],
      stylePrefList: [{values: ['中式风格', '自然风格', '古典风格', '现代简约风格', '乡村田园风格', '现代中式风格', '地中海风格', '欧式风格', '混合型风格']}],
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
      today: new Date(),
      color: 'color: #999',
      styleColor: 'color: #999',
      proColor: 'color: #999',
      Color: 'color: #999',
      shops:''
   }
  },
  computed: {
    ...mapState({
      newCustomerInfo: state => state.customer.newCustomerInfo,
      shopVal: state => state.select.shopVal,
      leaveStoreVal: state => state.select.leaveStoreVal,
      discountVal: state => state.select.discountVal,
       shopList: state => state.chooseShop.shopList
    })
  },
  watch: {
    //初始进来的时候初始化数据
    fromName() {
      if(this.fromName === 'NewCustomer') {
        this.setInitData()
      }
    }
  },
  mounted() {
    let shops = localStorage.getItem('shops')
    this.shops = JSON.parse(shops)
    let val = this.getShopVal()
    this.getShopId(val)
    // this.getShopName()
    // console.log('客户信息：：', this.customerInfo)
    // this.getDemand()
  },
  methods: {
    ...mapMutations(["setNewCustomerInfo",'setShopVal','setLeaveStoreVal', 'setDiscountVal', 'setSourceVal']),
    setInitData() {
      
    },
    //获取门店的值
    getShopVal() {
      let val
      if(this.shopList && this.shopList.length) {
        this.shopList.forEach((item, index) => {
          if(item.status) {
            val = item.name
          }
        })
      }
      return val
    },
    //获取门店id
    getShopId(name) {
      if(this.shops && this.shops.length) {
        this.shops.forEach((item, index) => {
          if(item.name === name) {
            this.shopId = item.id
          }
      });
      }
      console.log(this.shopId)
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
    //客户来源
    sourceChange(val) {
      this.setSourceVal(val)
      this.newCustomerInfo.source = val
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
    //客户来源的code
    codeChange(val) {
      // console.log(123,val)
    },
    //选择折扣
    discountChange(val) {
      this.setDiscountVal(val)
      this.newCustomerInfo.discount = val
    },
    //选择意向
    intentionVal(val) {
      // console.log(val)
    },
    //是否紧急
    urgentVal(val) {
      // console.log(val)
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
      this.proColor = 'color: #363636'
      this.slots = this.progressList
      this.proto = 'progress'
      // 设置性别选择插件的初始值
      this.setOptions('progress', this.progressList)
      this.popupVisible = true
    },
    selectBuyReason() {
      this.color = 'color: #363636'
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
      this.Color = 'color: #363636'
      this.slots = this.colorPrefList
      this.proto = 'colorPref'
      // 设置性别选择插件的初始值
      this.setOptions('colorPref', this.colorPrefList)
      this.popupVisible = true
    },
    selectStylePref() {
      this.styleColor = 'color: #363636'
      this.slots = this.stylePrefList
      this.proto = 'stylePref'
      // 设置性别选择插件的初始值
      this.setOptions('stylePref', this.stylePrefList)
      this.popupVisible = true
    },
    onValuesChange(picker, values) {
      // console.log('选择的装修进度', values)
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
  li:nth-child(6) {
    margin-top: 3vw;
    border-top: 1px solid #ccc;
  }
   li:nth-child(12) {
    margin-top: 3vw;
    border-top: 1px solid #ccc;
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
