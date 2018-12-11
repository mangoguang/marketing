<template>
  <div class="customerDescript">
    <ul>
    <li is="customerLi" :leftText="'客户姓名'">
      <input v-model="customerInfo.username" type="text">
    </li>
    <li is="customerLi" :leftText="'客户性别'" :icon="true" @click.native="selectSex">
      <span>{{customerInfo.sex}}</span>
    </li>
    <li is="customerLi" :leftText="'客户生日'" :icon="true" @click.native="selectBirthday">
      <span>{{turnDate(customerInfo.birthday)}}</span>
    </li>
    <li is="customerLi" :leftText="'客户电话'">
      <input v-model="customerInfo.phone" type="text">
    </li>
    <li is="customerLi" :leftText="'客户来源'" :icon="true" @click.native="selectSource">
      <span>{{customerInfo.source}}</span>
    </li>
    <li is="customerLi" :leftText="'客户地区'" :icon="true" @click.native="selectArea">
      <span>{{`${provinceName} ${cityName} ${countyName}`}}</span>
    </li>
    <li is="customerLi" :leftText="'客户地址'">
      <input v-model="customerInfo.address" type="text">
    </li>
    <li is="customerLi" :leftText="'留店时间'" :icon="true" @click.native="selectTime">
      <span>{{customerInfo.leaveStore}}</span>
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
import { DatetimePicker, Picker, Popup } from 'mint-ui'

Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Picker.name, Picker)
Vue.component(Popup.name, Popup)
import customerLi from '../../../components/customer/customerLi'
import bigBtn from '../../../components/customer/bigBtn'
import mango from '../../../js'
export default {
  name:'customerDescript',
  components: {
    customerLi,
    bigBtn
  },
  data(){
    return{
      customerInfo: {},
      urgencyBtns: mango.btnList(['高', '中', '低']),
      importantBtns: mango.btnList(['高', '中', '低']),
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
      province: {},
      provinceName: '',
      city: {},
      cityName: '',
      county: {},
      countyName: ''
    }
  },
  watch: {
    'provinceName': function() {
      this.getCity(this.searchCode(this.province, this.provinceName))
      console.log('省份改变了：', this.provinceName)
    },
    'cityName': function() {
      this.getCity(this.searchCode(this.city, this.cityName))
      this.customerInfo[this.proto] = `${this.provinceName} ${this.cityName} ${this.areaName}`
      console.log('城市改变了：', this.cityName)
    },
    'countyName': function() {
      // this.customerInfo[this.proto] = 
      console.log('地区改变了：', this.countyName)
    }
  },
  computed: {
    'provinceNames': function() {
      let arr = this.province.map(item => {
        return item.name
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
      console.log(arr)
      return arr
    }
  },
  created() {
    //获取本地缓存信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    this.getCustomerInfo()
  },
  mounted() {
    // this.turnDate('2018-01-01')
    // this.returnDate('1992年04月27日')
  },
  methods: {
    getCustomerInfo() {
      let id = this.$route.params.id
      mango.getAjax(this, 'customerById',{
        id: id
      },'v2').then((res) => {
        res = res.data
        if (res) {
          this.provinceName = res.province
          this.cityName = res.city
          this.countyName = res.area
          this.$refs.Picker.setSlotValue(0, res.province)
          this.$refs.Picker.setSlotValue(1, res.city)
          this.$refs.Picker.setSlotValue(2, res.area)
          this.customerInfo = res
          this.checkBtnStatus(res)
          this.getProvince()
        }
      })
    },
    checkBtnStatus(obj) {
      this.urgencyBtns[obj.urgency - 1].status = true
      this.importantBtns[obj.important - 1].status = true
      obj.sex = obj.sex == 1 ? '男' : '女'
    },
    changeUrgency(index) {
      this.urgencyBtns.forEach((element, i) => {
        element.status = index === i
      })
      this.customerInfo.important = index + 1
    },
    changeImportant(index) {
      this.importantBtns.forEach((element, i) => {
        element.status = index === i
      })
      this.customerInfo.urgency = index + 1
    },
    selectSex() {
      this.slots = this.sexList
      this.proto = 'sex'
      // 设置性别选择插件的初始值
      this.$refs.Picker.setSlotValue(0, this.customerInfo.sex)
      this.popupVisible = true
    },
    selectBirthday() {
      this.$refs.datePicker.open()
    },
    selectSource() {
      this.slots = this.sourceList
      this.proto = 'source'
      // 设置性别选择插件的初始值
      this.$refs.Picker.setSlotValue(0, this.customerInfo.source)
      this.popupVisible = true
    },
    selectArea() {
      this.slots = this.areaList
      this.proto = 'area'
      this.popupVisible = true
    },
    selectTime() {
      this.slots = this.leaveStoreList
      this.proto = 'leaveStore'
      // 设置性别选择插件的初始值
      this.$refs.Picker.setSlotValue(0, this.customerInfo.source)
      this.popupVisible = true
    },
    setBirthday(value) {
      this.customerInfo.birthday = mango.indexTimeB(value)[0]
    },
    onValuesChange(picker, values) {
      if (this.proto === 'area') {
        this.provinceName = values[0]
        this.cityName = values[1]
        this.countyName = values[2]
        this.customerInfo[this.proto] = `${values[0]} ${values[1]} ${values[2]}`
      } else {
        this.customerInfo[this.proto] = values[0]
      }
      // this.popupVisible = false
    },
    saveCustomerInfo() {
      let [obj, id] = [this.customerInfo, this.$route.params.id]
      let params = {
        account: this.ajaxData.account,   //登录账户
        tenantId: this.ajaxData.tenantId,
        'details.username': obj.username,
        'details.sex': obj.sex === '男' ? 1 : 2,  //性别(1:男,2:女,0:未知)，
        'details.birthday': this.returnDate(obj.birthday),
        'details.phone': obj.phone,
        'details.source': obj.source,
        'details.province': '440000',
        'details.city': '441900',
        'details.area': '441911',
        'details.address': obj.area,
        'details.leaveStore': obj.leaveStore,    //留店时间，
        'details.urgency': obj.urgency,   //紧急，1/2/3级，一级最高
        'details.important': obj.important,  //重要，1/2/3级，一级最高
        'demand.intention': '床垫',   //意向产品，
        'demand.colorPref': '白色、蓝色',
        'demand.stylePref': '简约，大气',
        'demand.buyReason': '新房购置',
        'demand.progress': '装修中',
        'demand.roomNum': 3,
        'demand.remark': '客户备注',
        'demand.trList[0].followSituation': '跟进情况',
        'demand.trList[0].probability': '80%',
        'demand.trList[0].followTime': '2018-11-20',
        'demand.trList[0].followPlan': '跟进计划'
      }
      
      // _vue, port, params, pathVersion,type
      // mango.getAjax(this, 'customer/update', params,'v2', 'post').then((res) => {
      //   console.log('保存数据成功', res)
      // })
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
      mango.getAjax(this, 'province', {},'v3').then((res) => {
        res = res.data
        if (res) {
          this.province = res
          this.getCity(res[0].code)
        }
      })
    },
    getCity(province) {
      mango.getAjax(this, 'city', {
        province: province
      },'v3').then((res) => {
        res = res.data
        if (res) {
          this.city = res
          if (this.city[0]) {
            this.getArea(this.city[0].code)
          }
        }
      })
    },
    getArea(city) {
      mango.getAjax(this, 'area', {
        city: city
      },'v3').then((res) => {
        res = res.data
        if (res) {
          let [provinceNames, cityNames, areaNames] = [
            this.province.map((item, index) => {
              return item.name
            }),
            this.city.map((item, index) => {
              return item.name
            }),
            res.map((item, index) => {
              return item.name
            })
          ]
          this.setAreaData(provinceNames, cityNames, areaNames)
          // this.customerInfo[this.proto] = `${this.provinceName} ${this.cityName} ${this.areaName}`
        }
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
        if (arr[i].name === name) {
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
