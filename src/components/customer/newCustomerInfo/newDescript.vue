<template>
  <div class="customerDescript">
    <ul>
      <li is="customerLi" :leftText="'头像'" :icon="true" >
        <unLoadVia class="upload" :select='select' :customerImage='customerImage'/>
        <!--select表示直接选择照片-->
      </li>
      <li is="customerLi" :leftText="'客户称呼'" :start='"*"'>
        <input v-model="newCustomerInfo.username" type="text" placeholder="请填写客户称呼" class="name">
      </li>
      <li is="sexSelect" :sexVal="newCustomerInfo.sex"  @sexChange="sexChange" class="sex"></li>
       <li is="customerLi" :leftText="'客户生日'" :icon="true" @click.native="selectStoreDate">
        <span :style="newCustomerInfo.birthday?'color: #363636':color ">{{turnDate(newCustomerInfo.birthday) || '请选择客户生日'}}</span>
      </li>
      <li is="ageSelect"   @ageChange="ageChange"></li>
      <li is="customerLi" :leftText="'客户电话'">
        <input v-model="newCustomerInfo.phone" type="text" placeholder="请填写客户电话">
      </li>
      <li is="customerLi" :leftText="'客户微信'">
        <input v-model="newCustomerInfo.weChat" type="text" placeholder="请填写客户微信号">
      </li>
      <li is="customerLi" :leftText="'客户 QQ'">
        <input v-model="newCustomerInfo.qq" type="text" placeholder="请填写客户 QQ">
      </li>
      <li is="customerLi" :leftText="'客户职业'">
        <input v-model="newCustomerInfo.duty" type="text" placeholder="请填写客户职业">
      </li>
      <template v-if="areaType">
        <li is="customerLi" :leftText="'客户地区'" :icon="true" @click.native="toAddress">
          <span>地址管理</span>
        </li>
      </template>
      <template v-else>
        <li is="areaSelect" @areaChange="areaChange"></li>
        <li is="customerLi" :leftText="'客户地址'"  >
          <input v-model="newCustomerInfo.address" type="text"  placeholder="请填写客户地址">
        </li>
      </template>
      <li is="shopSelect" :type='"descript"'></li>
      <li class="textarea">
        <h3>客户描述</h3>
        <textarea v-model="newCustomerInfo.remark" placeholder="描述一下情况吧"></textarea>
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
import areaSelect from '../../select/areaSelect'
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
      shop: '',
      shopId: ''
    }
  },
  watch: {
    //初始进来的时候初始化数据
    fromName() {
      if(this.fromName === 'NewCustomer') {
        this.setInitData()
      }
      let val = this.getShopVal()
      this.getShopId(val)
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
    let shops = localStorage.getItem('shops')
    this.shops = JSON.parse(shops)
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
        this.newCustomerInfo.age = this.list.age
        this.setAgeVal(this.list.age)
      }
      this.newCustomerInfo.phone = this.list.phone
      this.newCustomerInfo.weChat = this.list.weChat
      this.newCustomerInfo.qq = this.list.qq
      this.newCustomerInfo.remark = this.list.remark
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
      console.log(123,this.shopId)
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
    //跳转到地址管理页面
    toAddress() {
      this.$router.push({path:`/selectAddress/${this.$route.query.id}`})
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
      let shopsList = btnList(this.shops,0)
      this.initDescriptShopList(shopsList)
      this.getDescriptShopVal()

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
    padding: 2vw 4vw;
    img {
      width: 14.66vw;
      height: 14.66vw;
      // border: 1px solid #e1e1e1;
      margin-left: 10vw;
    }
  }
  li:nth-child(6){
    margin-top: 5vw;
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
    }
  }
  li.textarea{
    display: block;
  }
  .name{
    margin-left: -3vw;
    box-sizing: border-box;
  }
  
}
</style>
