<template>
  <li class="sourceSelect">
    <ul>
      <li is="customerLi" :leftText="'客户来源'" :icon="true" @click.native="selectSource">
        <span>{{val}}</span>
      </li>
      <!-- 性别选择插件 -->
      <li>
        <mt-popup 
      position="bottom"
      v-model="popupVisible">
        <mt-picker
        :slots="slots"
        @change="onValuesChange"
        ref="sourcePicker"></mt-picker>
      </mt-popup>
      </li>
    </ul>
  </li>
</template>

<script>

import Vue from 'vue'
import VueRouter from 'vue-router'
import { DatetimePicker, Picker, Popup } from 'mint-ui'
// import { DatetimePicker } from 'mint-ui'
// import mango from '../../js'
// Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Picker.name, Picker)
Vue.component(Popup.name, Popup)
import customerLi from '../customer/customerLi'

export default {
  name: 'sourceSelect',
  components:{customerLi},
  props: ['sourceVal'],
  data() {
    return {
      slots: [{values: ['异业联盟', '设计师介绍', '自然进店', '老客带单']}],
      popupVisible: false,
      val: this.sourceVal || '请选择客户来源',
      key: false
    }
  },
  computed:{

  },
  mounted() {
    console.log(2233, this.val)
    // this.$refs.sourcePicker.setSlotValue(0, this.val)
  },
  methods:{
    selectSource() {
      this.key = true
      this.popupVisible = true
    },
    onValuesChange(picker, values) {
      if (this.key) {
        this.val = values[0]
      }
      this.$emit('sourceChange', values[0])
    }
  }
  }

</script>

<style lang="scss">
  .sourceSelect{
    ul{
      width: 100%;
    }
  }
</style>