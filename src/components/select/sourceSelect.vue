<template>
  <li class="sourceSelect">
    <ul>
      <li is="customerLi" :leftText="'客户来源'" :icon="true" @click.native="selectSource">
        <span>{{sourceVal || '请选择客户来源'}}</span>
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
      slots: [{values: ['自然进店', '企点引流', '老客复购', '老客介绍', '异业带单', '异业联盟活动', '其他活动', '小区团购', '电话销售', '设计师介绍', '辅助查询'],defaultIndex: 0}],
      popupVisible: false
    }
  },
  computed:{
    ...mapState({
      sourceVal: state => state.select.sourceVal
    })
  },
  mounted() {
    // this.$refs.sourcePicker.setSlotValue(0, this.val)
  },
  methods:{
    ...mapMutations(["setSourceVal"]),
    selectSource() {
      this.$refs.sourcePicker.setSlotValue(0, this.sourceVal)
      this.popupVisible = true
    },
    onValuesChange(picker, values) {
      this.val = values[0]
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