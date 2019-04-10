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
      slots: [{values: ['异业带单', '主动营销引流', '活动引流', '设计公司带单', '合作伙伴带单', '自然进店', '拦截客户', '渠道引流', '老客带单', '老客复购']}],
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
    // this.setSourceVal(this.slots[0].values[0])
    // this.$refs.sourcePicker.setSlotValue(0, this.val)
  },
  methods:{
    ...mapMutations(["setSourceVal"]),
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
        this.$emit('sourceChange', values[0])
      }else {
        this.key = true
      }
 
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