<template>
  <li class="sourceSelect">
    <ul>
      <li is="customerLi" :leftText="'客户来源'" :start='"*"' :icon="true" @click.native="selectSource">
        <span :style="color">{{sourceVal || '请选择客户来源'}}</span>
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
import Vuex, { mapMutations, mapState } from "vuex"
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
  data() {
    return {
      slots: [{values: []}],
      popupVisible: false,
      key: false,
      color: "color: #999"
    }
  },
  computed:{
    ...mapState({
      sourceVal: state => state.select.sourceVal
    })
  },
  mounted() {
    this.init()
    // this.setSourceVal(this.slots[0].values[0])
    // this.$refs.sourcePicker.setSlotValue(0, this.val)
  },
  methods:{
    ...mapMutations(["setSourceVal"]),
    init() {
      this.getType('REASON_PURCHASE')
      setTimeout(() => {
        let arr = this.setSlot(this._type)
        this.slots[0].values = arr
      },200)
    },
    selectSource() {
      // this.$refs.sourcePicker.setSlotValue(0, this.sourceVal)
      // this.popupVisible = true
      this.color = "color: #363636";
      if (this.sourceVal === "") {
        this.setSourceVal(this.slots[0].values[0]);
      } else {
        this.$refs.sourcePicker.setSlotValue(0, this.sourceVal);
      }
      this.popupVisible = true;
    },
    onValuesChange(picker, values) {
      if(this.key) {
        let code = this.getCode(values[0],this._type)
        this.$emit('codeChange', code)
        this.$emit('sourceChange', values[0])
      }else {
        this.key = true
      }
 
    },
    //获取选项
    setSlot(type) {
      let arr = []
      type.forEach((item,index) => {
        arr[index] = item.name
      });
      return arr
    },
    //根据val获取对应的code
    getCode(val,typeList) {
      let code;
      typeList.forEach((item,index) => {
        if(item.name === val) {
          code = item.code
        }
      })
      return code
    },
    //根据code获取对应的val
    getVal(code,typeList) {
      let val;
      typeList.forEach((item,index) => {
        if(item.code === code) {
          val = item.name
        }
      })
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