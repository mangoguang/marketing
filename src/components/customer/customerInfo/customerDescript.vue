<template>
  <div class="customerDescript">
    <ul>
    <li is="customerLi" :leftText="'客户姓名'">
      <input v-model="customerInfo.username" type="text">
    </li>
    <li is="customerLi" :leftText="'客户性别'" :icon="true" @click="selectSex">
      <span>{{customerInfo.sex}}</span>
    </li>
    <li is="customerLi" :leftText="'客户生日'" :icon="true" @click.native="selectBirthday">
      <span>{{customerInfo.birthday}}</span>
    </li>
    <li is="customerLi" :leftText="'客户电话'">
      <span>{{customerInfo.phone}}</span>
    </li>
    <li is="customerLi" :leftText="'客户来源'" :icon="true" @click="selectSource">
      <span>{{customerInfo.source}}</span>
    </li>
    <li is="customerLi" :leftText="'客户地区'" :icon="true" @click="selectArea">
      <span>{{customerInfo.area}}</span>
    </li>
    <li is="customerLi" :leftText="'客户地址'">
      <input v-model="customerInfo.address" type="text">
    </li>
    <li is="customerLi" :leftText="'留店时间'" :icon="true" @click="selectTime">
      <span>{{customerInfo.leaveStore}}</span>
    </li>
    <li class="urgency">
      紧急程度
      <div>
        <button 
        v-for="(item, index) in urgencyBtns" 
        :key="`urgencyBtns${index}`"
        @click="chuangeUrgency(index)"
        :class="{on: item.status}">{{item.name}}</button>
      </div>
    </li>
    <li class="important">
      关键程度
      <div>
        <button 
        v-for="(item, index) in importantBtns" 
        :key="`importantBtns${index}`"
        @click="chuangeImportant(index)"
        :class="{on: item.status}">{{item.name}}</button>
      </div>
    </li>
    <li><big-btn :text="'保存'"></big-btn></li>
  </ul>
  <!-- mint-ui组件 -->
  <div class="mintComponent">
    <!-- 性别选择插件 -->
    <div class="picker">
      <mt-picker 
      :slots="sexList"
      @change="onValuesChange"
      ref="sexPicker"
      className="sexPicker"></mt-picker>
    </div>
    <!-- 日期选择插件 -->
    <mt-datetime-picker
      ref="datePicker"
      type="date"
      v-model="customerInfo.birhtday"
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
import { DatetimePicker, Picker } from 'mint-ui'

Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Picker.name, Picker)
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
      sexList: [{values: ['男', '女']}],
      pickerShow: {
        sex: false,
        birthday: false,
        source: false,
        area: false,
        time: false
      }
    }
  },
  created() {
    //获取本地缓存信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    this.getCustomerInfo()
  },
  mounted() {
    console.log('112233', this.urgencyBtns)
  },
  methods: {
    getCustomerInfo() {
      let id = this.$route.params.id
      mango.getAjax(this, 'customerById',{
        id: id
      },'v2').then((res) => {
        if (res) {
          this.customerInfo = res.data
          this.checkBtnStatus(res.data)
          // 设置性别选择插件的初始值
          this.$refs.sexPicker.setSlotValue(0, this.customerInfo.sex)
        }
      })
    },
    checkBtnStatus(obj) {
      this.urgencyBtns[obj.urgency - 1].status = true
      this.importantBtns[obj.important - 1].status = true
      obj.sex = obj.sex == 1 ? '男' : '女'
    },
    chuangeUrgency(index) {
      this.urgencyBtns.forEach((element, i) => {
        element.status = index === i
      })
    },
    chuangeImportant(index) {
      this.importantBtns.forEach((element, i) => {
        element.status = index === i
      })
    },
    selectSex() {
      this.$refs.sexPicker.open()
    },
    selectBirthday() {
      this.$refs.datePicker.open()
    },
    selectSource() {

    },
    selectArea() {

    },
    selectTime() {

    },
    setBirthday() {

    },
    onValuesChange(picker, values) {
      this.customerInfo.sex = values[0]
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
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    background: rgba(0, 0, 0, .5);
  }
}
</style>
