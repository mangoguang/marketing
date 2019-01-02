<template>
  <li class="sexSelect">
    <ul>
      <li is="customerLi" :leftText="'客户性别'" :icon="true" @click.native="selectSex">
        <span>{{sexVal || '请选择客户性别'}}</span>
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
      slots: [{values: ['男', '女']}],
      popupVisible: false,
      key: false
    }
  },
  computed:{
    ...mapState({
      sexVal: state => state.select.sexVal
    })
  },
  mounted() {

  },
  methods:{
    ...mapMutations(["setSexVal"]),
    selectSex() {
      if(this.sexVal === '' || this.sexVal ==='未知') {
        this.setSexVal(this.slots[0].values[0])
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
    }
  }
</style>