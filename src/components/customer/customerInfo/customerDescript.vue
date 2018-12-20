<template>
  <div class="customerDescript">
    <ul>
      <li is="customerLi" :leftText="'客户姓名'">
        <input v-model="customerDemand.username" type="text" placeholder="请填写客户姓名">
      </li>
      <li is="customerLi" :leftText="'客户性别'" :icon="true" @click.native="selectSex">
        <span>{{customerDemand.sex == 1 ? '男' : '女'}}</span>
      </li>
      <li is="customerLi" :leftText="'客户生日'" :icon="true" @click.native="selectBirthday">
        <span>{{turnDate(customerDemand.birthday) || '请选择客户生日日期'}}</span>
      </li>
      <li is="customerLi" :leftText="'客户电话'">
        <input v-model="customerDemand.phone" type="text" placeholder="请填写客户电话">
      </li>
      <li is="customerLi" :leftText="'客户来源'" :icon="true" @click.native="selectSource">
        <span>{{customerDemand.source || '请选择客户来源'}}</span>
      </li>
      <!-- <li is="customerLi" :leftText="'客户地区'" :icon="true" @click.native="selectArea">
        <span>{{provinceName ? `${provinceName} ${cityName} ${countyName}` : '请选择客户地区'}}</span>
      </li> -->
      <li is="customerLi" :leftText="'客户地址'">
        <input v-model="customerDemand.address" type="text" placeholder="请填写客户地址">
      </li>
      <li is="customerLi" :leftText="'留店时间'" :icon="true" @click.native="selectTime">
        <span>{{customerDemand.leaveStore || '请选择客户留店时间'}}</span>
      </li>
      <li class="urgency">
        紧急程度
        <div>
          <button 
          v-for="(item, index) in urgencyBtns" 
          :key="`urgencyBtns${index}`"
          @click="changeUrgency(index)"
          :class="{on: item.status}">{{item.name}}</button>
        </div>
      </li>
      <li class="important">
        关键程度
        <div>
          <button 
          v-for="(item, index) in importantBtns" 
          :key="`importantBtns${index}`"
          @click="changeImportant(index)"
          :class="{on: item.status}">{{item.name}}</button>
        </div>
      </li>
      <li><big-btn :text="'保存'" @click.native="saveCustomerInfo"></big-btn></li>
    </ul>
  <!-- mint-ui组件 -->
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
    <!-- 日期选择插件 -->
    <mt-datetime-picker
      ref="datePicker"
      type="date"
      v-model="today"
      :startDate="new Date('1930-01-01')"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="setBirthday">
    </mt-datetime-picker>
  </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuex, { mapMutations, mapState } from "vuex"
import { DatetimePicker, Picker, Popup } from 'mint-ui'

Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Picker.name, Picker)
Vue.component(Popup.name, Popup)
import customerLi from '../customerLi'
import bigBtn from '../bigBtn'
import mango from '../../../js'
import {turnParams} from '../../../utils/customer'
import { setTimeout } from 'timers';
export default {
  name:'customerDescript',
  components: {
    customerLi,
    bigBtn
  },
  data(){
    return{
      customerDemand: {},
      urgencyBtns: mango.btnList(['高', '中', '低'], 0),
      importantBtns: mango.btnList(['高', '中', '低'], 0),
      slots: [],
      sexList: [{values: ['男', '女']}],
      sourceList: [{values: ['异业联盟', '设计师介绍', '自然进店', '老客带单']}],
      leaveStoreList: [{values: ['15分钟', '30分钟']}],
      areaList: [],
      pickerShow: {
        sex: false,
        birthday: false,
        source: false,
        area: false,
        time: false
      },
      popupVisible: false,
      proto: '',
      today: new Date(),
      province: [],
      provinceName: '',
      city: [],
      cityName: '',
      county: [],
      countyName: ''
    }
  },
  watch: {
    'provinceName': function() {
      // this.getCity(this.searchCode(this.province, this.provinceName))
      // console.log('省份改变了：', this.provinceName)
    },
    'cityName': function() {
      // this.getCity(this.searchCode(this.city, this.cityName))
      // this.customerInfo[this.proto] = `${this.provinceName} ${this.cityName} ${this.areaName}`
      // console.log('城市改变了：', this.cityName)
    },
    'countyName': function() {
      // this.customerInfo[this.proto] = 
      // console.log('地区改变了：', this.countyName)
    }
  },
  computed: {
    ...mapState({
      customerInfo: state => state.dealOrderInfoDetails.dealOrderInfoDetails
    }),
    provinceNames() {
      let arr = this.province.map(item => {
        let str = item.name
        return str.slice(0, 4)
      })
      return arr
    },
    'cityNames': function() {
      let arr = this.city.map(item => {
        return item.name
      })
      return arr
    },
    'countyNames': function() {
      let arr = this.county.map(item => {
        return item.name
      })
      return arr
    }
  },
  created() {
    //获取本地缓存信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    if (this.$route.params.id != 0) {
      this.getCustomerInfo()
    }
  },
  mounted() {
    this.customerDemand.phone = this.$route.query.phone
    console.log('successssss', this.startDate)

    // this.turnDate('2018-01-01')
    // this.returnDate('1992年04月27日')
  },
  methods: {
    ...mapMutations(["setDealOrderInfoDetails"]),
    getCustomerInfo() {
      let id = this.$route.params.id
      mango.getAjax(this, 'customerById',{
        id: id
      },'v2').then((res) => {
        res = res.data
        if (res) {
          this.setDealOrderInfoDetails(res)
          this.provinceName = res.provinceName
          this.cityName = res.cityName
          this.countyName = res.areaName
          // this.customerInfo = res
          // 初始化保存接口参数
          this.checkBtnStatus(res)
          // 获取行政区域数据
          this.getProvince()
          // .then((response) => {
          //   // this.getCity(res.provinceCode).then((response) => {
          //   //   this.getCounty(res.cityCode).then((response) => {
          //   //     this.setAreaData(this.provinceNames, this.cityNames, this.countyNames)
          //   //   })
          //   // })
          // })
          // 设置dealHeader组建的用户信息
          this.$emit('setInfo', {
            name: res.username,
            phone: res.phone,
            sex: res.sex
          })
        }
        this.setCustomerDemand(res)
      })
    },
    setCustomerDemand(obj = {}) {
      this.customerDemand = {
        // account: this.ajaxData.account,   //登录账户
        // tenantId: this.ajaxData.tenantId,
        username: obj.username,
        sex: obj.sex,  //性别(1:男,2:女,0:未知)，
        birthday: this.returnDate(obj.birthday),
        phone: obj.phone || this.$route.query.phone,
        source: obj.source,
        // province: '440000',
        // city: '441900',
        // area: '441911',
        address: obj.area || obj.address,
        leaveStore: obj.leaveStore,    //留店时间，
        urgency: obj.urgency,   //紧急，1/2/3级，一级最高
        important: obj.important  //重要，1/2/3级，一级最高
      }
    },
    checkBtnStatus(obj) {
      for (let i = 0; i < this.urgencyBtns.length; i++) {
        this.urgencyBtns[i].status = (obj.urgency - 1) === i
        this.importantBtns[i].status = (obj.important - 1) === i
      }
      // obj.sex = obj.sex == 1 ? '男' : '女'
    },
    changeUrgency(index) {
      this.urgencyBtns.forEach((element, i) => {
        element.status = index === i
      })
      this.customerDemand.important = index + 1
    },
    changeImportant(index) {
      this.importantBtns.forEach((element, i) => {
        element.status = index === i
      })
      this.customerDemand.urgency = index + 1
    },
    selectSex() {
      this.slots = this.sexList
      this.proto = 'sex'
      // 设置性别选择插件的初始值
      this.$refs.Picker.setSlotValue(0, this.customerDemand.sex === 1 ? '男' : '女')
      this.popupVisible = true
    },
    selectBirthday() {
      this.$refs.datePicker.open()
    },
    selectSource() {
      this.slots = this.sourceList
      this.proto = 'source'
      // 设置性别选择插件的初始值
      this.$refs.Picker.setSlotValue(0, this.customerDemand.source)
      this.popupVisible = true
    },
    selectArea() {
      this.slots = this.areaList
      this.proto = 'area'
      // 设置地区选择插件的初始值
      this.$refs.Picker.setSlotValue(0, this.provinceName)
      this.$refs.Picker.setSlotValue(1, this.cityName)
      this.$refs.Picker.setSlotValue(2, this.countyName)
      this.popupVisible = true
    },
    selectTime() {
      this.slots = this.leaveStoreList
      this.proto = 'leaveStore'
      // 设置性别选择插件的初始值
      this.$refs.Picker.setSlotValue(0, this.customerDemand.source)
      this.popupVisible = true
    },
    setBirthday(value) {
      this.customerDemand.birthday = mango.indexTimeB(value)[0]
    },
    onValuesChange(picker, values) {
      // 选择地区
      if (this.proto === 'area') {
      //   if (values) {
      //     console.log(values)
      //     // 选择省级行政单位
      //     if (this.provinceName !== values[0]) {
      //       this.provinceName = values[0]
      //       console.log('省份改变了1::', values[0])
      //       // this.city = []
      //       console.log('省代码：', this.searchCode(this.province, values[0]))
      //       this.getCity(this.searchCode(this.province, values[0]))
      //       // this.customerDemand[this.proto]
      //     // 选择市级行政单位
      //     } else if (this.cityName !== values[1]) {
      //       this.cityName = values[1]
      //       console.log('城市改变了1::', values[1])
      //       // this.county = []
      //       this.getCounty(this.searchCode(this.city, values[1]))
      //     // 选择县级行政单位
      //     } else if (this.countyName !== values[2]) {
      //       this.countyName = values[2]
      //       console.log('地区改变了1::', values[2])
      //     }
      //   }
        // this.customerDemand[this.proto] = `${values[0]} ${values[1]} ${values[2]}`
      } else if (this.proto === 'sex') {
        this.customerDemand[this.proto] = values[0] === '男' ? 1 : 2
      } else {
        this.customerDemand[this.proto] = values[0]
      }
      // this.popupVisible = false
    },
    checkForm() {
      if (this.username) {
        
      } else {
        console.log('客户姓名未填写')
      }
    },
    saveCustomerInfo() {
      let [obj, id] = [this.customerDemand, this.$route.params.id]
      mango.getAjax(this, 'customer/update', {
        account: this.ajaxData.account,   //登录账户
        tenantId: this.ajaxData.tenantId,
        customerId: this.$route.params.id == 0 ? '' : this.$route.params.id ,
        ...turnParams(this.customerDemand)
      },'v2', 'post').then((res) => {
        console.log('保存数据成功', res)
      })
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
    },
    getProvince() {
      // return new Promise((resolve, reject) => {
        mango.getAjax(this, 'province', {},'v3').then((res) => {
          res = res.data
          if (res) {
            this.province = res
            this.areaList = [{
              values: this.provinceNames,
              className: 'slot1'
            }]
          }
          // resolve(res)
        })
      // })
    },
    getCity(province) {
      if (mango.key) {
        mango.key = false
        // return new Promise((resolve, reject) => {
          mango.getAjax(this, 'city', {
            province: province
          },'v3').then((res) => {
            mango.key = true
            res = res.data
            if (res) {
              this.city = res
              this.slots = [{
                values: this.provinceNames,
                className: 'slot1'
              }, {
                values: this.cityNames,
                className: 'slot2'
              }]
            }
            // resolve(res)
          })
        // })
      }
    },
    getCounty(city) {
      return new Promise((resolve, reject) => {
        mango.getAjax(this, 'area', {
          city: city
        },'v3').then((res) => {
          res = res.data
          if (res) {
            this.county = res
            this.slots = [{
              values: this.provinceNames,
              className: 'slot1'
            }, {
              values: this.cityNames,
              className: 'slot2'
            }, {
              values: this.countyNames,
              className: 'slot3'
            }]
          }
          resolve(res)
        })
      })
    },
    setAreaData(province, city, county) {
      this.areaList = [
        {
          values: province,
          className: 'slot1'
        }, {
          values: city,
          className: 'slot2'
        }, {
          values: county,
          className: 'slot3'
        }
      ]
    },
    // 根据省名/城市名/地区名匹配对应的行政代码。
    searchCode(arr, name) {
      for (let i = 0; i < arr.length; i ++) {
        if (arr[i].name.indexOf(name) !== -1) {
          return arr[i].code
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
  li{
    display: flex;
    direction: row;
    color: $fontCol;
    padding: 0 5vw;
    line-height: 3em;
    div{
      display: flex;
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
  li:nth-child(4){
    margin-top: 5vw;
    border-top: 1px solid #ccc;
  }
  .picker{
    // width: 100%;
    width: 100vw;
    // height: 100vh;
    // position: absolute;
    // top: 0;
    // background: rgba(0, 0, 0, .5);
  }
}
</style>
