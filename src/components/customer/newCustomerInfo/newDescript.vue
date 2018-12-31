<template>
  <div class="customerDescript">
    <ul>
      <li is="customerLi" :leftText="'客户姓名'">
        <input v-model="newCustomerInfo.username" type="text" placeholder="请填写客户姓名">
      </li>
      <!-- <li is="customerLi" :leftText="'客户性别'" :icon="true" @click.native="selectSex">
        <span>{{newCustomerInfo.sex == 1 ? '男' : '女'}}</span>
      </li> -->
      <li is="sexSelect" :sexVal="newCustomerInfo.sex" @sexChange="sexChange"></li>
      <li is="customerLi" :leftText="'客户电话'">
        <input v-model="newCustomerInfo.phone" type="text" placeholder="请填写客户电话">
      </li>
       <li is="customerLi" :leftText="'客户地址'">
        <input v-model="newCustomerInfo.address" type="text" placeholder="请填写客户地址">
      </li>
      <li is="sourceSelect" :sourceVal="newCustomerInfo.source" @sourceChange="sourceChange"></li>
      <li is="customerLi" :leftText="'进店日期'" :icon="true" @click.native="selectStoreDate">
        <span>{{turnDate(newCustomerInfo.storeDate)|| '请选择客户进店日期'}}</span>
      </li>
      <!-- <li is="addressSelect" :addressVal="newCustomerInfo.address" @addressChange="addressChange"></li> -->
      <!-- <li is="customerLi" :leftText="'客户来源'" :icon="true" @click.native="selectSource">
        <span>{{newCustomerInfo.source || '请选择客户来源'}}</span>
      </li> -->
      <!-- <li is="customerLi" :leftText="'客户地区'" :icon="true" @click.native="selectArea">
        <span>{{provinceName ? `${provinceName} ${cityName} ${countyName}` : '请选择客户地区'}}</span>
      </li> -->
      <!-- <addressSelect></addressSelect> -->
      <!-- <li is="customerLi" :leftText="'留店时间'" :icon="true" @click.native="selectTime">
        <span>{{newCustomerInfo.leaveStore || '请选择客户留店时间'}}</span>
      </li> -->
      <li is="leaveStoreSelect" :leaveStoreVal="newCustomerInfo.leaveStore" @leaveStoreChange="leaveStoreChange"></li>
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
      <li class="urgency">
        是否紧急
        <!-- <div>
          <button 
          v-for="(item, index) in importantBtns" 
          :key="`importantBtns${index}`"
          @click="changeImportant(index)"
          :class="{on: item.status}">{{item.name}}</button>
        </div> -->
        <div class="switchBox"><mt-switch v-model="urgency"></mt-switch></div>
      </li>
    </ul>
    <div class="btnBox">
      <big-btn :text="'下一步'" @click.native="saveCustomerInfo"></big-btn>
    </div>
    <!-- mint-ui组件 -->
    <div class="mintComponent">
      <!-- 性别选择插件 -->
      <!-- <mt-popup 
      position="bottom"
      v-model="popupVisible">
        <mt-picker
        :slots="slots"
        @change="onValuesChange"
        ref="Picker"></mt-picker>
      </mt-popup> -->
      <!-- 日期选择插件 -->
      <mt-datetime-picker
        ref="datePicker1"
        type="date"
        v-model="today"
        :startDate="new Date('1930-01-01')"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="setStoreDate1">
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
import sexSelect from '../../select/sexSelect'
import sourceSelect from '../../select/sourceSelect'
import leaveStoreSelect from '../../select/leaveStoreSelect'
import addressSelect from '../../select/addressSelect'
import mango from '../../../js'
import variable from '../../../js/variable'
import {turnParams} from '../../../utils/customer'
export default {
  name:'customerDescript',
  props: ['btns'],
  components: {
    customerLi,
    bigBtn,
    sexSelect,
    sourceSelect,
    leaveStoreSelect,
    addressSelect
  },
  data(){
    return{
      importantBtns: mango.btnList(['高', '中', '低'],0),
      // importantBtns: mango.btnList(['高', '中', '低'], 0),
      // slots: [],
      // sexList: [{values: ['男', '女']}],
      // sourceList: [{values: ['异业联盟', '设计师介绍', '自然进店', '老客带单']}],
      // leaveStoreList: [{values: ['15分钟', '30分钟']}],
      areaList: [],
      // popupVisible: false,
      // proto: '',
      today: new Date(),
      province: [],
      provinceName: '',
      city: [],
      cityName: '',
      county: [],
      countyName: '',
      parentBtns: [],
      urgency:false
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
      newCustomerInfo: state => state.customer.newCustomerInfo
    }),
    'provinceNames': function() {
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
    this.parentBtns = this.btns
  },
  mounted() {
    this.setNewCustomerInfo({})
    this.newCustomerInfo.phone = this.$route.query.phone
    console.log('000111', this.newCustomerInfo)
    // this.turnDate('2018-01-01')
    // this.returnDate('1992年04月27日')
  },
  methods: {
    ...mapMutations(["setNewCustomerInfo"]),
    checkBtnStatus(obj) {
      for (let i = 0; i < this.importantBtns.length; i++) {
        this.importantBtns[i].status = (obj.important - 1) === i
        // this.importantBtns[i].status = (obj.important - 1) === i
      }
      // obj.sex = obj.sex == 1 ? '男' : '女'
    },
    changeImportant(index) {
      this.importantBtns.forEach((element, i) => {
        element.status = index === i
      })
      this.newCustomerInfo.important = index + 1
    },
    // changeImportant(index) {
    //   this.importantBtns.forEach((element, i) => {
    //     element.status = index === i
    //   })
    //   this.newCustomerInfo.urgency = index + 1
    // },
    // selectSex() {
    //   this.slots = this.sexList
    //   this.proto = 'sex'
    //   // 设置性别选择插件的初始值
    //   this.$refs.Picker.setSlotValue(0, this.newCustomerInfo.sex)
    //   this.popupVisible = true
    // },
    selectStoreDate() {
      this.$refs.datePicker1.open()
    },
    // selectSource() {
    //   this.slots = this.sourceList
    //   this.proto = 'source'
    //   // 设置性别选择插件的初始值
    //   this.$refs.Picker.setSlotValue(0, this.newCustomerInfo.source)
    //   this.popupVisible = true
    // },
    // selectArea() {
    //   this.slots = this.areaList
    //   this.proto = 'area'
    //   // 设置地区选择插件的初始值
    //   this.$refs.Picker.setSlotValue(0, this.provinceName)
    //   this.$refs.Picker.setSlotValue(1, this.cityName)
    //   this.$refs.Picker.setSlotValue(2, this.countyName)
    //   this.popupVisible = true
    // },
    // selectTime() {
    //   this.slots = this.leaveStoreList
    //   this.proto = 'leaveStore'
    //   // 设置性别选择插件的初始值
    //   this.$refs.Picker.setSlotValue(0, this.newCustomerInfo.source)
    //   this.popupVisible = true
    // },
    setStoreDate1(value) {
      // this.newCustomerInfo.storeDate = mango.indexTimeB(value)[0]
      this.$set(this.newCustomerInfo,'storeDate',mango.indexTimeB(value)[1])
      console.log('选择的日期', mango.indexTimeB(value)[0], this.newCustomerInfo.storeDate)
    },
    sexChange(val) {
      console.log('sex改变了：', val)
      this.newCustomerInfo.sex = val === '男' ? 1 : 2
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
    sourceChange(val) {
      console.log('sex改变了：', val)
      this.newCustomerInfo.source = val
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
    leaveStoreChange(val) {
      console.log('sex改变了：', val)
      this.newCustomerInfo.leaveStore = val
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
    addressChange(val) {
      console.log('addresschange')
      // this.newCustomerInfo.leaveStore = val
    },
    // onValuesChange(picker, values) {
    //   // 选择地区
    //   if (this.proto === 'area') {

    //   } else if (this.proto === 'sex') {
    //     this.newCustomerInfo[this.proto] = values[0] === '男' ? 1 : 2
    //   } else {
    //     this.newCustomerInfo[this.proto] = values[0]
    //   }
    //   // this.popupVisible = false
    // },
    checkForm() {
      if (this.username) {
        
      } else {
        console.log('客户姓名未填写')
      }
    },
    //设置默认值
    setInitData() {
      if(this.urgency){
        this.newCustomerInfo.urgency = 1
      }else{
        this.newCustomerInfo.urgency = 9
      }
      if(!this.newCustomerInfo.source) {
        this.newCustomerInfo.source = '自然进店'
      }
      if(!this.newCustomerInfo.important) {
        this.$set(this.newCustomerInfo, 'important', 1)
      }         //关键程度默认选择1，但是没有点击的时候不会保存数据。
      if(!this.newCustomerInfo.storeDate) {
        this.$set(this.newCustomerInfo, 'storeDate', mango.indexTimeB(new Date())[1])
      } //如果没有选进店时间。默认选择今天
    },
    saveCustomerInfo() {
      let testPhoneNum = variable.testPhone(this.newCustomerInfo.phone)
      if(testPhoneNum) {
        let [obj, id] = [this.newCustomerInfo, this.$route.params.id]
        this.setInitData()
        this.setNewCustomerInfo(obj)
        this.parentBtns[0].status = false
        this.parentBtns[1].status = true
        this.$emit('changeBtnsStatus', this.parentBtns)
      }else {
        mango.tip('请填写正确的手机号码')
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
      console.log(mango.key)
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
  &>li{
    padding: 0 5vw;
  }
  li{
    display: flex;
    direction: row;
    color: $fontCol;
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
  .btnBox{
    width: 100vw;
    display: flex;
    justify-content: center;
  }
  .urgency,.important{
    padding: 2vw 5vw 0 5vw;
  }
}
</style>
