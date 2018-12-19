<template>
  <div class="visitor">
    <ul>
      <li is="customerLi" :leftText="'客户姓名'">
        <input v-model="info.username" type="text">
      </li>
      <li is="customerLi" :leftText="'客户性别'">
        <span @click="selectSex">{{info.sex || '男'}}</span>
      </li>
      <li is="customerLi" :leftText="'意向产品'">
        <input v-model="info.demand" placeholder="填写客户意向产品" type="text">
      </li>
      <li is="customerLi" :leftText="'留店时间'" :icon="true">
        <span @click="selectTime">{{info.leaveStore || '选择客户留店时间'}}</span>
      </li>
      <li class="textarea">
        <remark :title="'备注'">
          <textarea name="" id="" placeholder="描述一下情况吧"></textarea>
        </remark>
        <!-- <h3>备注：</h3>
        <textarea name="" id="" cols="30" rows="10"></textarea> -->
      </li>
      <my-range :title="'成交概率'" @changeVal="changeMyRangeVal" />
      <!-- <li class="range">
        成交率
        <mt-range
          v-model="rangeValue"
          :min="0"
          :max="100"
          :step="5"
          :bar-height="5">
          <div slot="end">{{`${rangeValue}%`}}</div>
        </mt-range>
      </li> -->
      <li class="saveBtn"><big-btn :text="'保存'" @click.native="saveCustomerInfo"></big-btn></li>
    </ul>
    <mt-popup 
    class="picker"
    position="bottom"
    v-model="popupVisible">
      <mt-picker
      :slots="slots"
      @change="onValuesChange"
      ref="Picker"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
import Vue from "vue"
import { Picker, Popup } from 'mint-ui'

Vue.component(Picker.name, Picker)
Vue.component(Popup.name, Popup)
import customerLi from '../customerLi'
import bigBtn from '../bigBtn'
import myRange from '../myRange'
import remark from '../remark'
import mango from '../../../js'
export default {
  name:'visitor',
  components: {
    customerLi,
    bigBtn,
    myRange,
    remark
  },
  data(){
    return{
      info: {
        percent: 50
      },
      slots: [],
      proto: '',
      popupVisible: false
    }
  },
  created() {
    //获取本地缓存信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
  },
  mounted() {
    console.log(123123, encodeURI('['))
  },
  methods: {
    saveCustomerInfo() {
      let [params, tempObj] = [{
        account: this.ajaxData.account,   //登录账户
        tenantId: this.ajaxData.tenantId,
        'details.username': this.info.username,
        'details.sex': this.info.sex === '男' ? 1 : 2,
        'details.leaveStore': this.info.leaveStore,
        'demand.intention': this.info.intention,
        'demand.remark': this.info.remark,
        'record.probability': `${this.info.percent}`
      }, {}]
      for (let key in params) {
        if (params[key]) {
          tempObj[key] = params[key]
        }
      }
      mango.getAjax(this, 'customer/update', tempObj,'v2', 'post').then((res) => {
        console.log('保存数据成功', res)
      })
      // mango.getAjax(this, 'customer/update', tempObj,'v2', 'post').then((res) => {
      //   console.log('保存数据成功', res)
      // })
    },
    selectSex() {
      this.proto = 'sex'
      this.slots = [{values: ['男', '女']}]
      this.popupVisible = true
    },
    selectTime() {
      this.proto = 'time'
      this.slots = [{values: ['15分钟', '30分钟']}]
      this.popupVisible = true
    },
    setTime(value) {
      this.customerDemand.birthday = mango.indexTimeB(value)[0]
    },
    changeMyRangeVal(val) {
      console.log('mtrange:', val)
      this.info.percent = val
    },
    onValuesChange(picker, values) {
      if (this.proto === 'sex') {
        this.info.sex = values[0]
      } else {
        this.info.leaveStore = values[0]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/common.scss";
ul{
  display: flex;
  flex-direction: column;
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
  li.range{
    display: block;
    padding: 0 5vw;
  }
  .saveBtn{
    margin-top: 10vw;
  }
}
.picker{
  width: 100vw;
}
</style>
