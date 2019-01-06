<template>
  <li class="leaveStoreSelect">
    <ul>
      <li is="customerLi" :leftText="'留店时长'" :icon="true" @click.native="selectLeaveStore">
        <span>{{leaveStoreVal || '请选择客户留店时长'}}</span>
      </li>
      <!-- 性别选择插件 -->
      <li>
        <mt-popup 
      position="bottom"
      v-model="popupVisible">
        <mt-picker
        :slots="slots"
        @change="onValuesChange"
        ref="leaveStorePicker"></mt-picker>
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
  name: 'leaveStoreSelect',
  components:{customerLi},
  data() {
    return {
      slots: [{values: ['15分钟', '30分钟', '45分钟', '1小时以上']}],
      popupVisible: false,
      key: false
    }
  },
  computed:{
    ...mapState({
      leaveStoreVal: state => state.select.leaveStoreVal
    })
  },
  mounted() {
    // this.$refs.leaveStorePicker.setSlotValue(0, this.val)
  },
  methods:{
    ...mapMutations(["setLeaveStoreVal"]),
    selectLeaveStore() {
      if(this.leaveStoreVal === '') {
        this.setLeaveStoreVal(this.slots[0].values[0])
      }else {
        this.$refs.leaveStorePicker.setSlotValue(0, this.leaveStoreVal)
      }
      this.popupVisible = true
    },
    onValuesChange(picker, values) {
      if(this.key) {
        this.$emit('leaveStoreChange', values[0])
      }else {
        this.key = true
      }
     }
  }
  }

</script>

<style lang="scss">
  .leaveStoreSelect{
    ul{
      width: 100%;
    }
  }
</style>