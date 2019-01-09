<template>
  <li class="mySelect">
    <ul>
      <li is="customerLi" :leftText="leftText" :icon="true" @click.native="select">
        <span>{{indexVal || `请选择${leftText}`}}</span>
      </li>
      <!-- 通用选择插件 -->
      <li>
        <mt-popup 
      position="bottom"
      v-model="popupVisible">
        <mt-picker
        :slots="slots"
        @change="onValuesChange"
        ref="picker"></mt-picker>
      </mt-popup>
      </li>
    </ul>
  </li>
</template>

<script>

import Vue from 'vue'
import { DatetimePicker, Picker, Popup } from 'mint-ui'
Vue.component(Picker.name, Picker)
Vue.component(Popup.name, Popup)
import customerLi from '../customer/customerLi'

export default {
  name: 'mySelect',
  props: ['leftText', 'val', 'selectList'],
  components:{customerLi},
  data() {
    return {
      slots: [{values: this.selectList}],
      popupVisible: false,
      key: false,
      indexVal: ''
    }
  },
  mounted() {
    this.indexVal = this.val
  },
  methods: {
    select() {
      if (this.indexVal) {
        this.$refs.picker.setSlotValue(0, this.indexVal)
        this.$emit('valChange', this.indexVal)
      } else {
        this.$refs.picker.setSlotValue(0, this.selectList[0])
        this.indexVal = this.selectList[0]
        this.$emit('valChange', this.selectList[0])
      }
      this.popupVisible = true
    },
    onValuesChange(picker, values) {
      if(this.key) {
        this.$emit('valChange', values[0])
        this.indexVal = values[0]
      }else {
        this.key = true
      }
    }
  }
  }

</script>

<style lang="scss">
  .mySelect{
    ul{
      width: 100%;
    }
  }
</style>