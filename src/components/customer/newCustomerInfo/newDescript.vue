<template>
  <div class="customerDescript">
    <ul>
      <li is="customerLi" :leftText="'头像'" >
        <unLoadVia class="upload" :select='select' :customerImage='customerImage'/>
        <!--select表示直接选择照片-->
      </li>
      <li is="customerLi" :leftText="'客户称呼'" :start='"*"'>
        <input v-model="newCustomerInfo.username" type="text" placeholder="请填写客户称呼" class="name"  maxlength="30">
      </li>
      <li is="sexSelect" :sexVal="newCustomerInfo.sex"  @sexChange="sexChange" class="sex"></li>
       <li is="customerLi" :leftText="'客户生日'" :icon="true" @click.native="selectStoreDate">
        <span :style="newCustomerInfo.birthday?'color: #363636':color ">{{newCustomerInfo.birthday || '请选择客户生日'}}</span>
      </li>
      <li is="ageSelect"   @ageChange="ageChange"></li>
      <template v-if="$route.query.phone">
        <li is="customerLi" :leftText="'客户电话'">
          <input v-model="newCustomerInfo.phone" type="number" readonly>
        </li>
      </template>
      <template v-else>
        <li is="customerLi" :leftText="'客户电话'">
          <input v-model="newCustomerInfo.phone" type="number" placeholder="请填写客户电话"  oninput="if(value.length>11)value=value.slice(0,11)">
        </li>
      </template>
       <template v-if="$route.query.wechat">
        <li is="customerLi" :leftText="'客户微信'">
          <input v-model="newCustomerInfo.weChat" type="text" readonly>
        </li>
      </template>
      <template v-else>
        <li is="customerLi" :leftText="'客户微信'">
          <input v-model.trim="newCustomerInfo.weChat" type="text" placeholder="请填写客户微信号"  oninput="if(value.length>20)value=value.slice(0,20)">
        </li>
      </template>
      <li is="customerLi" :leftText="'客户  QQ'">
        <input v-model.trim="newCustomerInfo.qq" type="text"  onkeypress="if(event.keyCode == 101){return false}" oninput="if(value.length>15)value=value.slice(0,15)"  placeholder="请填写客户 QQ" >
      </li>
      <li is="customerLi" :leftText="'客户职业'">
        <input v-model.trim="newCustomerInfo.duty" type="text" placeholder="请填写客户职业" oninput="if(value.length>30)value=value.slice(0,30)">
      </li>
      <template v-if="areaType">
        <li is="customerLi" :leftText="'客户地区'"  :icon="true" @click.native="toAddress">
          <span>地址管理</span>
        </li>
      </template>
      <template v-else>
        <li class="area"><area-select  is='areaSelect' v-model='area' @update="updateArea" readonly placeholder="请选择客户地区" label='客户地区' :required="true" :showIcon="true"/></li>
        <li is="customerLi" :leftText="'客户地址'" :start='"*"'>
          <input v-model.trim="newCustomerInfo.address" type="text"  placeholder="请填写客户地址" oninput="if(value.length>200)value=value.slice(0,200)">
        </li>
      </template>
       <!-- <li is="shopSelect" :type='"descript"' :name="shopName"></li> -->
      <li is="customerLi" :leftText="'所属门店'" >
        <span class='shop'>{{ shopName }}</span>
      </li>
      <li class="textarea">
        <h3>客户描述</h3>
        <textarea v-model.trim="newCustomerInfo.remark" placeholder="描述一下情况吧" oninput="if(value.length>200)value=value.slice(0,200)"></textarea>
      </li>
    </ul>
    <div class="mintComponent">
      <!-- 日期选择插件 -->
      <mt-datetime-picker
        ref="datePicker1"
        type="date"
        v-model="today"
        :startDate="new Date('1930-01-01')"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="setStoreDate1"
        >
      </mt-datetime-picker>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuex, { mapMutations, mapState } from "vuex"
import { DatetimePicker, Picker, Popup, Switch } from 'mint-ui'

Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Picker.name, Picker)
Vue.component(Popup.name, Popup)
Vue.component(Switch.name, Switch)
import customerLi from '../customerLi'
import bigBtn from '../bigBtn'
import unLoadVia from '../customerShare/loadPic'
import sexSelect from '../../select/sexSelect'
import ageSelect from '../../select/ageSelect'
import sourceSelect from '../../select/sourceSelect'
import leaveStoreSelect from '../../select/leaveStoreSelect'
import addressSelect from '../../select/addressSelect'
//import areaSelect from '../../select/areaSelect'
import areaSelect from '../../mySelect/areaSelect'
import mango from '../../../js'
import variable from '../../../js/variable'
import shopSelect from '../../select/shopSelect'
import {turnParams,changeFormData} from '../../../utils/customer'
import {btnList} from '../../../utils/gallery'
export default {
  name:'customerDescript',
  props: ['btns', 'select', 'fromName', 'list', 'areaType'],
  components: {
    customerLi,
    bigBtn,
    sexSelect,
    sourceSelect,
    leaveStoreSelect,
    addressSelect,
    areaSelect,
    ageSelect,
    unLoadVia,
    shopSelect
  },
  data(){
    return{
      areaList: [],
      today: new Date(),
      province: [],
      provinceName: '',
      city: [],
      cityName: '',
      county: [],
      countyName: '',
      color: 'color: #999',
      customerImage: '',
      shops: '',
      shopId: '',
      area:'',
      shopName:''
    }
  },
  watch: {
    //初始进来的时候初始化数据
    fromName() {
      if(this.fromName === 'NewCustomer') {
        this.setInitData()
      }
      // let val = this.getShopVal()
      // this.getShopId(val)
    },
    list() {
      this.hasList()
    }
  },
  computed: {
    ...mapState({
      newCustomerInfo: state => state.customer.newCustomerInfo,
      sexVal: state => state.select.sexVal,
      ageVal: state => state.select.ageVal,
      areaVal: state => state.select.areaVal,
      sourceVal: state => state.select.sourceVal,
      leaveStoreVal: state => state.select.leaveStoreVal,
      upLoadUrl: state => state.loadImgUrl.upLoadUrl,
      descriptShopList: state => state.chooseShop.descriptShopList
    })
  },
  mounted() {
    //获取本地缓存信息
    this.initShop();
    this.initArea();
  },
  created() {
    this.hasList()
  },
  methods: {
    ...mapMutations([
      "setNewCustomerInfo",
      'setSexVal',
      'setAreaVal',
      'setSourceVal',
      'setLeaveStoreVal',
      'setAgeVal',
      'setUpLoadUrl',
      'initDescriptShopList',
      'getDescriptShopVal'
    ]),
    onlyNumber(e){
      if(/[^\d]/g.test(e.target.value)){
        e.target.value=e.target.value.replace(/[^\d]/g,'');
      }
     
   },
    initArea(){
      if(!this.newCustomerInfo.provinceName){
        return;
      }
      this.area=`${this.newCustomerInfo.provinceName}${this.newCustomerInfo.cityName}${this.newCustomerInfo.countryName}`;
    },
    //编辑资料
    hasList() {
      if(!this.list) {
        return
      }
      this.newCustomerInfo.dataFiles = new FormData()
      //设置头像
      if(this.list.headPortrait) {
        this.customerImage = this.list.headPortrait
      }
      this.$set(this.newCustomerInfo, 'username',this.list.username)
      //设置性别选框
      // this.newCustomerInfo.sex = this.list.sex
      if(this.list.sex) {
        this.$set(this.newCustomerInfo, 'sex',this.list.sex)
        let sex = this.list.sex === 'Ms.'? '女' : this.list.sex ==='Mr.'? '男' : '未知'
        this.setSexVal(sex)
      }
      //设置日期组件初始日期
      this.$set(this.newCustomerInfo, 'birthday',this.list.birthday)
      this.today = this.list.birthday
      this.newCustomerInfo.duty = this.list.duty
      //设置年龄选框
       if(this.list.age) {
        this.$set(this.newCustomerInfo,'age',this.list.age)
        this.setAgeVal(this.list.age)
      }
      if(this.list.phone==='0'){
        this.$set(this.newCustomerInfo,'phone','')
      }else{
        this.$set(this.newCustomerInfo,'phone',this.list.phone)
      }
      
      this.$set(this.newCustomerInfo,'weChat',this.list.weChat)
      this.$set(this.newCustomerInfo,'qq',this.list.qq)
      this.$set(this.newCustomerInfo,'remark',this.list.remark)
      this.$set(this.newCustomerInfo,'orgId',this.list.orgId)
      let shops = localStorage.getItem('shops')
      this.shops = JSON.parse(shops)
        if(this.shops&&this.shops.length){
          this.shops.map((item,index) => {
            if(item.crmId===this.newCustomerInfo.orgId){
              this.shopName=item.name;
            }
          })
        }
      

    },
    //获取门店的值
    getShopVal() {
      let val
      if(this.descriptShopList && this.descriptShopList.length) {
        this.descriptShopList.forEach((item, index) => {
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
            this.shopId = item.crmId
          }
      });
      }
      // console.log(123,this.shopId)
      this.newCustomerInfo.orgId = this.shopId
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
    selectStoreDate() {
      this.$refs.datePicker1.open()
      this.color = 'color: #363636'
    },
    // selectArea() {
    //   this.slots = this.areaList
    //   this.proto = 'area'
    //   // 设置地区选择插件的初始值
    //   this.$refs.Picker.setSlotValue(0, this.provinceName)
    //   this.$refs.Picker.setSlotValue(1, this.cityName)
    //   this.$refs.Picker.setSlotValue(2, this.countyName)
    //   this.popupVisible = true
    // },
    setStoreDate1(value) {
      // this.newCustomerInfo.storeDate = mango.indexTimeB(value)[0]
      this.$set(this.newCustomerInfo,'birthday',mango.indexTimeB(value)[1])
      this.setNewCustomerInfo(this.newCustomerInfo)
      // console.log('选择的日期', mango.indexTimeB(value)[0], this.newCustomerInfo.storeDate)
    },
    updateArea(cityName,cityCode){
      this.area=cityName;
      let cityNameAttr=cityName.split(' ');
      let cityCodeAttr=cityCode.split('-');
      this.$set(this.newCustomerInfo,'provinceName',cityNameAttr[0])
      this.$set(this.newCustomerInfo,'cityName',cityNameAttr[1])
      this.$set(this.newCustomerInfo,'countryName',cityNameAttr[2])
      this.newCustomerInfo.province = cityCodeAttr[0]
      this.newCustomerInfo.city = cityCodeAttr[1]
      this.newCustomerInfo.area = cityCodeAttr[2]
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
    //跳转到地址管理页面
    toAddress() {
      this.$router.push({path:`/address/${this.$route.query.id}`})
    },
    sexChange(val) {
      // console.log('sex改变了：', val)
      this.newCustomerInfo.sex = val === '男' ? 'Mr.' :  (val === '女'? 'Ms.' : 'Unknown')
      this.setSexVal(val)
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
    ageChange(val) {
      // console.log('age改变了：', val)
      this.setAgeVal(val)
      this.newCustomerInfo.age = val
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
    sourceChange(val) {
      // console.log('sex123改变了：', val)
      this.setSourceVal(val)
      this.newCustomerInfo.source = val
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
    leaveStoreChange(val) {
      // console.log('sex改变了：', val)
      this.setLeaveStoreVal(val)
      this.newCustomerInfo.leaveStore = val
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
    addressChange(val) {
      // console.log('addresschange')
      // this.newCustomerInfo.leaveStore = val
    },
    //设置默认值
    setInitData() {
      this.setNewCustomerInfo({})
      //初始化门店的值
      // let shopsList = btnList(this.shops,0)
      // this.initDescriptShopList(shopsList)
      // this.getDescriptShopVal()
      this.initShop();
      this.$set(this.newCustomerInfo,'imgLen',0)
      this.$set(this.newCustomerInfo,'imgs','')
      this.setAgeVal('')
      this.setSexVal('')
      this.setUpLoadUrl('')
      this.setNewCustomerInfo(this.newCustomerInfo)
      this.newCustomerInfo.dataFiles = new FormData()
      if(this.$route.query.phone) {
        this.newCustomerInfo.phone = this.$route.query.phone
      }else if(this.$route.query.wechat) {
        this.newCustomerInfo.weChat = this.$route.query.wechat
      }
     
    },
    initShop(){
      let shops = localStorage.getItem('shops')
      this.shops = JSON.parse(shops)
      if(this.$route.query.orgId){
        let orgId=this.$route.query.orgId;
        console.log('orgId',orgId);
        this.newCustomerInfo.orgId = orgId;
        // this.newCustomerInfo.shopId = orgId;
        if(this.shops&&this.shops.length){
          this.shops.map((item,index) => {
            if(item.crmId===orgId){
              this.shopName=item.name;
            }
          })
        }
      }
    },
    // 将日期格式2018-01-01改成2018年01月01日
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
    // 将日期格式2018年01月01日改成2018-01-01
    returnDate(date) {
      if (date) {
        if (date.indexOf('年') !== -1) {
          return date.replace(/年/, "-").replace(/月/, "-").replace(/日/, "")
        } else {
          return date
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/common.scss";
.area{
  border-bottom:1px solid #ccc;
  background: #fff;
  .inputBox{
    width:100%;
    padding-right:5vw;
    font-size: 3.73vw;
    height:auto;
    line-height: 3em;
    input{
      font-size: 3.73vw;
    }   
  }
}
.customerDescript{
  background: $bgCol;
  &>li{
    padding: 0 5vw;
  }
  li{
    // display: flex;
    // direction: row;
    color: $fontCol ;
    line-height: 3em;
    // padding-left: 4vw;
    div{
      // display: flex;
      direction: row;
      margin-left: 5vw;
      align-items: center;
      button{
        display: block;
        background: #fff;
        width: 15vw;
        margin-right: 1vw;
        text-align: center;
        line-height: 2em;
        height: 2em;
        border-radius: 1vw;
        color: $fontSubCol;
      }
      .on{
        color: $btnCol;
        background: $btnSubCol;
      }
    }
  }
  li:nth-child(1) {
    padding: 2vw 5vw;
    border-top:1px solid #ccc;
    img {
      width: 14.66vw;
      height: 14.66vw;
      // border: 1px solid #e1e1e1;
      margin-left: 10vw;
    }
  }
  li:nth-child(6){
    margin-top: 2.666vw;
    border-top: 1px solid #ccc;
  }
  .btnBox{
    width: 100vw;
    display: flex;
    justify-content: center;
  }
  .urgency,.important{
    padding: 4vw 5vw 0 5vw;
  }
  .urgency{
    margin-bottom: 4vw;
  }
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
      border-bottom: 1px solid #ccc;
    }
  }
  li.textarea{
    display: block;
    //border-bottom: 1px solid #ccc;
    //margin-bottom: 10.666vw;
  }
  .name{
    // margin-left: -3vw;
    box-sizing: border-box;
  }
  .upload {
    margin-left: 8vw;
  }
  input {
    width: 50vw;
  }
}
</style>
