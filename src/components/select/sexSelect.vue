<template>
  <li class="sexSelect">
    <ul>
      <li is="customerLi" :leftText="'客户性别'" :start='"*"' :icon="true" @click.native="selectSex">
        <span :style="color" class="sex">{{sexVal || '请选择客户性别'}}</span>
      </li>
      <!-- 性别选择插件 -->
      <li>
        <mt-popup 
      position="bottom"
      v-model="popupVisible">
        <mt-picker
        :slots="slots"
        @change="onValuesChange"
        ref="sexPicker"></mt-picker>
      </mt-popup>
      </li>
    </ul>
  </li>
</template>

<script>

import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex, { mapMutations, mapState } from "vuex"
import { DatetimePicker, Picker, Popup } from 'mint-ui'
// import { DatetimePicker } from 'mint-ui'
// import mango from '../../js'
// Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Picker.name, Picker)
Vue.component(Popup.name, Popup)
import customerLi from '../customer/customerLi'

export default {
  name: 'sexSelect',
  components:{customerLi},
  data() {
    return {
      slots: [{values: ['男', '女','未知']}],
      popupVisible: false,
      key: false,
      color: 'color: #999'
    }
  },
  computed:{
    ...mapState({
      sexVal: state => state.select.sexVal,
      newCustomerInfo: state => state.customer.newCustomerInfo
    })
  },
  created() {
    this.init()
  },
  methods:{
    ...mapMutations(["setSexVal", 'setNewCustomerInfo']),
    init() {
      if(this.newCustomerInfo.sex) {
        this.color = 'color: #363636'
        let sex;
        sex = this.newCustomerInfo.sex === 'Mr.'? '男' : (this.newCustomerInfo.sex ==='Ms.'? '女' : '未知')
        this.setSexVal(sex)
      } 
    },
    selectSex() {
      this.color = 'color: #363636'
      if(this.sexVal === '') {
        this.setSexVal(this.slots[0].values[0])
        this.newCustomerInfo.sex = 'Mr.'
        this.setNewCustomerInfo(this.newCustomerInfo)
      }else {
        this.$refs.sexPicker.setSlotValue(0, this.sexVal)
      }
      this.popupVisible = true
    },
    onValuesChange(picker, values) {
      // this.val = values[0]
      if(this.key) {
        this.$emit('sexChange', values[0])
      }else {
        this.key = true
      }
    }
  }
  }

</script>

<style lang="scss">
  .sexSelect{
    ul{
      width: 100%;
      .sex {
        // margin-left: -3vw
      }
    }
  }
</style>