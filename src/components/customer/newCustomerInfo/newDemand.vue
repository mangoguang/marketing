<template>
  <div class="newDemand">
    <ul>
      <li is="customerLi" :leftText="'意向产品'" :start="'*'">
        <input v-model="newCustomerInfo.intention" placeholder="请填写意向产品" type="text">
      </li>
      <li is="shopSelect" ></li>
      <li is="customerLi" :leftText="'进店日期'" :start="'*'" :icon="true" @click.native="selectStoreDate">
        <span :style="timeColor">{{turnDate(newCustomerInfo.arrivalDate) || turnDate(day)}}</span>
      </li>
      <li is="leaveStoreSelect" :start="true"  @leaveStoreChange="leaveStoreChange"></li>
      <li is="sourceSelect" :sourceVal="newCustomerInfo.source" @sourceChange="sourceChange" @codeChange='codeChange'></li>

      <!-- <li >
        <address-select :label='"客户地址"' v-bind="formInfo.address" :value="form.address"  :placeholder='"请选择地址"' :id="123" :url="path" :showIcon="true" class="address"/>
      </li>
         <li>
          <yan-input :value="form.house" :readonly='true'/>
        </li>
        <li>
          <yan-input :value="form.elevator" :readonly='true'/>
        </li> -->



      <!-- <li is="customerLi" :leftText="'客户地址'" :icon='true'>
         <span style="color: #999">请选择客户地址</span>
      </li> -->


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
import addressSelect from '../../mySelect/addressSelect'
import yanInput from '../../yanInput'

import customerLi from '../customerLi'
import bigBtn from '../bigBtn'
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
  props: ['btns', 'fromName', 'changeCode'],
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
    addressSelect,
    yanInput
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
      path: '',
      form: {
        address: ''
      }
   }
  },
  beforeRouteEnter(to,from,next){
    console.log(to);
    console.log(from);
    if(from.name==='selectAddress'){
      to.meta.keepAlive=true;
      next();
    }
    if(from.name==='searchProduct'){
      to.meta.keepAlive=true;
      next();
    }
    if(from.name==='intentionProduct'){
      to.meta.keepAlive=true;
       next();
    }
    next();
  },
  computed: {
    ...mapState({
      newCustomerInfo: state => state.customer.newCustomerInfo,
      shopVal: state => state.select.shopVal,
      leaveStoreVal: state => state.select.leaveStoreVal,
      discountVal: state => state.select.discountVal,
      shopList: state => state.chooseShop.shopList,
      formInfo: state => state.addIntention.formInfo
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
    },
     $route(to,from){
      console.log(from);
      if(from.name==='selectAddress'){
        let obj={};
        this.$store.state.addressList.map((item,index) => {
          console.log(item);
          if(item.addressId===this.$route.query.addressId){
            console.log('进来了');
            obj=Object.assign({},item);
          }
        })
        let address=`${obj.province}${obj.city}${obj.district}${obj.address}`;
        let elevator=obj.elevator?'有':'无';
        this.$set(this.form,'address',address);
        this.$set(this.form,'house',obj.apartmentType);
        this.$set(this.form,'elevator',elevator);
        this.addressId=this.$route.query.addressId;
      }
      if(from.name==='intentionProduct'){
        this.form.intention=this.$store.state.checkedList[0].crmId;
      }
      
    }
  },
  mounted() {
    this.path = this.$route.path

    let shops = localStorage.getItem('shops')
    this.shops = JSON.parse(shops)
    //获取默认进店时间
    this.day = mango.indexTimeB(this.today)[1]
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
