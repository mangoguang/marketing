<template>
  <div class="newDemand">
    <ul>
      <li is="customerLi" :leftText="'意向产品'" :start="'*'">
        <input v-model="newCustomerInfo.intention" placeholder="请填写意向产品" type="text">
      </li>
      <li is="shopSelect" ></li>
      <li is="customerLi" :leftText="'进店日期'" :start="'*'" :icon="true" @click.native="selectStoreDate">
        <span :style="timeColor">{{turnDate(newCustomerInfo.arrivalDate) || day}}</span>
      </li>
      <li is="leaveStoreSelect" :start="true"  @leaveStoreChange="leaveStoreChange"></li>
      <li is="sourceSelect" :sourceVal="newCustomerInfo.source" @sourceChange="sourceChange" @codeChange='codeChange'></li>
      <li is="customerLi" :leftText="'客户地址'" :icon='true'>
         <span style="color: #999">请选择客户地址</span>
      </li>
      <li is="customerLi" :leftText="'户型大小'">
        <input v-model="newCustomerInfo.apartmentType" type="text" placeholder="请先选客户地址">
      </li>
       <li is="customerLi" :leftText="'有无电梯'">
        <input v-model="newCustomerInfo.elevator" type="text" placeholder="请先选客户地址">
      </li>
      <li is="BuyReason"  @buyReasonChange="buyReasonChange" @brCodeChange='brCodeChange'></li>
      <li is="StylePref"  @stylePrefChange="stylePrefChange" @spCodeChange='spCodeChange'></li>
      <li is="progressSelect"  @progressChange="progressChange" @pgCodeChange='pgCodeChange'></li>
      <li is="customerLi" :leftText="'竞品产品'">
        <input v-model="newCustomerInfo.competingGoods" type="text" placeholder="请填写竞品产品">
      </li>
      <li is="colorSelect"  @colorChange="colorChange" @colorCodeChange='colorCodeChange'></li>
      <li is="customerLi" :leftText="'预算金额'">
        <input v-model="newCustomerInfo.budget" type="number" placeholder="请填写预算金额">
      </li>
      <li is="customerLi" :leftText="'已交定金'">
        <input v-model="newCustomerInfo.depositPaid" type="number" placeholder="请填写已交金额">
      </li>

      <li is="discountSelect" @discountChange="discountChange"></li>
      <li class="textarea">
        <h3>备注信息</h3>
        <textarea v-model="newCustomerInfo.remark2" placeholder="添加备注信息"></textarea>
      </li>
      <intentionSelect :intentionVal='intentionVal'/>
      <urgentSelect :urgentVal='urgentVal'/>
    </ul>
    <div class="mintComponent">
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
import BuyReason from '../../select/buyReason'
import StylePref from '../../select/stylePref'
import colorSelect from '../../select/colorSelect'
import progressSelect from '../../select/progressSelect'
import discountSelect from '../../select/discountSelect'
import intentionSelect from '../../select/intentionSelect'
import urgentSelect from '../../select/urgentSelect'
import mango from '../../../js'
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
    intentionSelect,
    BuyReason,
    StylePref,
    progressSelect,
    colorSelect
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
      shops:'',
      day: ''
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
      }else {
        if(this.newCustomerInfo.arrivalDate) {
          this.timeColor = 'color: #363636'
        }
      }
      //获取shopid
      let val = this.getShopVal()
      this.getShopId(val)
    }
  },
  mounted() {
    let shops = localStorage.getItem('shops')
    this.shops = JSON.parse(shops)
    //获取默认进店时间
    this.day = mango.indexTimeB(this.today)[0]
  },
  methods: {
    ...mapMutations(["setNewCustomerInfo",'setShopVal','setLeaveStoreVal', 'setDiscountVal', 'setSourceVal','setBuyReason','setStylePref','setProgress','setColorPref']),
    setInitData() {
      this.newCustomerInfo.arrivalDate = this.day
      this.setNewCustomerInfo(this.newCustomerInfo)
      this.setBuyReason('')
      this.setLeaveStoreVal('')
      this.setDiscountVal('')
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
      this.newCustomerInfo.shopId = this.shopId
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
    //选择留店时长
    leaveStoreChange(val) {
      // console.log('sex改变了：', val)
      this.setLeaveStoreVal(val)
      this.newCustomerInfo.residentTime = val
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
    //打开日期选择插件
    selectStoreDate() {
      this.$refs.datePicker.open()
    },
    //选择日期
    setStoreDate(value) {
      this.timeColor = 'color: #363636'
      this.$set(this.newCustomerInfo, 'arrivalDate', mango.indexTimeB(value)[1])
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
    //选择购买原因
    buyReasonChange(val) {
      // console.log('sex改变了：', val)
      this.setBuyReason(val)
      this.newCustomerInfo.buyReason = val
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
    //购买原因code
    brCodeChange(val) {
      console.log(val)
    },
     //选择装修风格
    stylePrefChange(val) {
      // console.log('sex改变了：', val)
      this.setStylePref(val)
      this.newCustomerInfo.stylePref = val
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
    //装修风格code
    spCodeChange(val) {
      console.log(val)
    },
     //选择装修进度
    progressChange(val) {
      // console.log('sex改变了：', val)
      this.setProgress(val)
      this.newCustomerInfo.progress = val
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
    //装修进度code
    pgCodeChange(val) {
      console.log(val)
    },
     //选择颜色偏好
    colorChange(val) {
      // console.log('sex改变了：', val)
      this.setColorPref(val)
      this.newCustomerInfo.colorPref = val
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
    //颜色偏好code
    colorCodeChange(val) {
      console.log(val)
    },
    //选择折扣
    discountChange(val) {
      this.setDiscountVal(val)
      this.newCustomerInfo.argreeDiscount = val
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
    //选择意向
    intentionVal(val) {
      this.newCustomerInfo.level = val
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
    //是否紧急
    urgentVal(val) {
      this.newCustomerInfo.urgency = val? 'true' : 'false'
      this.setNewCustomerInfo(this.newCustomerInfo)
    }
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
