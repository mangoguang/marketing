<template>
  <div class="newDemand">
    <ul>
      <li is="customerLi" :leftText="'意向产品'" :icon='true' :start="'*'" @click.native='addIntention'>
        <span>{{productList && productList.length? productList.join('、'): '请选择意向产品'}}</span>
      </li>
      <li is="shopSelect" :start='"*"' :type='type'></li>
      <li is="customerLi" :leftText="'进店日期'" :start="'*'" :icon="true" @click.native="selectStoreDate">
        <span :style="timeColor">{{turnDate(newCustomerInfo.arrivalDate) || turnDate(day)}}</span>
      </li>
      <li is="leaveStoreSelect" :start="true"  @leaveStoreChange="leaveStoreChange"></li>
      <li is="sourceSelect" @sourceChange="sourceChange" @codeChange='codeChange'></li>
      
      <template v-if='addressType !== "intention"'>
        <li is="customerLi" :leftText="'客户地区'"  >
          <span>{{newCustomerInfo.provinceName + newCustomerInfo.cityName + newCustomerInfo.countryName || '请选择客户地址'}}</span>
        </li>
        <li is="customerLi" :leftText="'客户地址'"  >
          <span>{{newCustomerInfo.address}}</span>
        </li>
        <li is="houseType"  @houseTypeChange="houseTypeChange" @htCodeChange='htCodeChange'></li>
        <li is="elevatorSelect"  @elevatorChange="elevatorChange" ></li>
      </template>
      <template v-else>
       <li is='customerLi' :leftText='"客户地址"' @click.native='toSelectAddress' :icon="true">
        <span>{{newCustomerInfo.provinceName + newCustomerInfo.cityName + newCustomerInfo.districtName || '请选择客户地址'}}</span>
      </li>
      <li is='customerLi' :leftText='"户型大小"'>
        <span>{{newCustomerInfo.apartmentTypeName || '请先选择客户地址'}}</span>
      </li>
      <li is='customerLi' :leftText='"有无电梯"'>
        <span>{{newCustomerInfo.elevatorName || '请先选择客户地址'}}</span>
      </li>
      </template>
      <li is="BuyReason"  @buyReasonChange="buyReasonChange" @brCodeChange='brCodeChange'></li>
      <li is="StylePref"  @stylePrefChange="stylePrefChange" @spCodeChange='spCodeChange'></li>
      <li is="progressSelect"  @progressChange="progressChange" @pgCodeChange='pgCodeChange'></li>
      <li is="customerLi" :leftText="'竞品产品'">
        <input v-model="newCustomerInfo.competingGoods" type="text" placeholder="请填写竞品产品" oninput="if(value.length>5)value=value.slice(0,100)">
      </li>
      <li is="colorSelect"  @colorChange="colorChange" @colorCodeChange='colorCodeChange'></li>
      <li is="customerLi" :leftText="'预算金额'">
        <input v-model="newCustomerInfo.budget" type="number" onkeypress="if(event.keyCode == 101){return false}" placeholder="请填写预算金额" oninput="if(value.length>5)value=value.slice(0,8)">
      </li>
      <li is="customerLi" :leftText="'已交定金'">
        <input v-model="newCustomerInfo.depositPaid" type="number" onkeypress="if(event.keyCode == 101){return false}" placeholder="请填写已交金额" oninput="if(value.length>5)value=value.slice(0,8)">
      </li>

      <li is="discountSelect" @discountChange="discountChange"></li>
      <li class="textarea">
        <h3>备注信息</h3>
        <textarea v-model="newCustomerInfo.remark2" placeholder="添加备注信息" oninput="if(value.length>5)value=value.slice(0,200)"></textarea>
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
import {IndexModel} from '../../../utils/index'
const indexModel = new IndexModel()
import Vue from 'vue'
import Vuex, { mapMutations, mapState } from 'vuex'
import { Picker, Popup } from 'mint-ui'
import leaveStoreSelect from '../../select/leaveStoreSelect'
Vue.component(Picker.name, Picker)
Vue.component(Popup.name, Popup)
import addressSelect from '../../mySelect/addressSelect'
import areaSelect from '../../select/areaSelect'
import customerLi from '../customerLi'
import bigBtn from '../bigBtn'
import YanintentionSelect from '../../mySelect/intentionSelect'
import shopSelect from '../../select/shopSelect'
import sourceSelect from '../../select/sourceSelect'
import BuyReason from '../../select/buyReason'
import StylePref from '../../select/stylePref'
import colorSelect from '../../select/colorSelect'
import progressSelect from '../../select/progressSelect'
import discountSelect from '../../select/discountSelect'
import intentionSelect from '../../select/intentionSelect'
import urgentSelect from '../../select/urgentSelect'
import houseType from '../../select/houseType'
import elevatorSelect from '../../select/elevatorSelect'
import mango from '../../../js'
import {btnList} from '../../../utils/gallery'
export default {
  name:'newDemand',
  props: ['btns', 'fromName', 'changeCode', 'type','addressType'],
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
    colorSelect,
    houseType,
    elevatorSelect,
    YanintentionSelect,
    areaSelect,
    addressSelect
  },
  data(){
    return{
      shopId: '',
      timeColor: 'color: #999',
      today: new Date(),
      color: 'color: #999',
      styleColor: 'color: #999',
      proColor: 'color: #999',
      Color: 'color: #999',
      shops:'',
      day: '',
      codeList: {},
      productList: []
   }
  },
  computed: {
    ...mapState({
      newCustomerInfo: state => state.customer.newCustomerInfo,
      shopVal: state => state.select.shopVal,
      leaveStoreVal: state => state.select.leaveStoreVal,
      discountVal: state => state.select.discountVal,
      shopList: state => state.chooseShop.shopList,
      checkedList: state => state.checkedList
    })
  },
  watch: {
    //初始进来的时候初始化数据
    fromName() {
      if(this.fromName === 'NewCustomer' && this.type == 'demand') {
        this.setInitData()
      }else if(this.fromName !='NewCustomer'){
        this.setIntentionProduct()
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
    this.day = mango.indexTimeB(this.today)[1]
    this.hasAddressId()
  },
  methods: {
    ...mapMutations(['initShopList','getShopVal','setCheckedList',"setNewCustomerInfo",'setShopVal','setLeaveStoreVal', 'setDiscountVal', 'setSourceVal','setBuyReason','setStylePref','setProgress','setColorPref','setHouseType','setElevatorVal']),
    setInitData() {
      this.newCustomerInfo.arrivalDate = this.day
      this.setNewCustomerInfo(this.newCustomerInfo)
      //初始化门店的值
      let shopsList = btnList(this.shops,0)
      this.initShopList(shopsList)
      this.getShopVal()
      this.setBuyReason('')
      this.setLeaveStoreVal('')
      this.setDiscountVal('')
      this.setCheckedList([])
    },
    //请求客户地址
    hasAddressId() {
      if(this.$store.state.addressId) {
        let id = this.$store.state.addressId
        indexModel.getAddress(id).then(res => {
          if(res.status == 1) {
            this.$set(this.newCustomerInfo,'provinceName',res.data.provinceName)
            this.$set(this.newCustomerInfo,'cityName',res.data.cityName)
            this.$set(this.newCustomerInfo,'districtName',res.data.districtName)
            this.newCustomerInfo.apartmentTypeName = res.data.apartmentTypeName
            this.newCustomerInfo.elevatorName = res.data.elevator? '有' : '无'
            this.newCustomerInfo.addressId = res.data.id
            this.setNewCustomerInfo(this.newCustomerInfo)
          }else {
            mango.tips('地址选择失败')
          }
        })
      }
    },
    //跳转客户地址
    toSelectAddress() {
      this.$router.push({name:'selectAddress',params:{customerId:this.$route.query.id},query:{type: 'intention'}})
    },
    //跳转到选择意向产品页面
    addIntention() {
      this.$router.push({
        name:'searchProduct',
        query:{
            redirect: this.$route.path
          }
        })
    },
    // 保存意向产品
    setIntentionProduct() {
      if(this.checkedList && this.checkedList.length) {
        let arr = this.checkedList
        let newArr = []
        arr.map((item, index) => {
          let obj = {
            id: item.crmId,
            quantity: item.quantity
          }
          this.productList.push(item.goodsName)
          newArr.push(obj)
        })
        this.newCustomerInfo.productArr = newArr
        this.setNewCustomerInfo(this.newCustomerInfo)
      }
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
    areaChange(val) {
      // console.log('选择的地区：', val)
      this.$set(this.newCustomerInfo,'provinceName',val.provinceName)
      this.$set(this.newCustomerInfo,'cityName',val.cityName)
      this.$set(this.newCustomerInfo,'countryName',val.countryName)
      this.newCustomerInfo.province = val.provinceCode
      this.newCustomerInfo.city = val.cityCode
      this.newCustomerInfo.area = val.countyCode
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
      this.codeList.sourceCode = val
      this.changeCode(this.codeList)
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
      this.codeList.brCode = val
      this.changeCode(this.codeList)
    },
     //户型大小
    houseTypeChange(val) {
      this.setHouseType(val)
      this.newCustomerInfo.apartmentType = val
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
    //户型的code
    htCodeChange(val) {
      this.codeList.htCode = val
      this.changeCode(this.codeList)
    },
    //电梯选择
    elevatorChange(val) {
      // console.log('age改变了：', val)
      this.setElevatorVal(val)
      this.newCustomerInfo.elevator = val === '有'? 'Y' : 'N'
      this.setNewCustomerInfo(this.newCustomerInfo)
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
      this.codeList.spCode = val
      this.changeCode(this.codeList)
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
      this.codeList.pgCode = val
      this.changeCode(this.codeList)
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
      this.codeList.colorCode = val
      this.changeCode(this.codeList)
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
  .address {
    background: #fff;
    width: 100vw;
    font-size: $fontSize;
    color: $fontCol;
    box-sizing: border-box;
    padding: 0 5vw;
    border-bottom: 1px #ccc solid;
    min-height:11.3vw
  }
  input{
    color:#363636;
    font-size: 3.2vw;
  }
  // input::-webkit-input-placeholder{
  //   color:red;
  // }
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
