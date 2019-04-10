<template>
  <li class="followSelect">
    <ul>
      <li is="customerLi" :leftText="'跟进方式'" :start='"*"' :icon="true" @click.native="selectFollow">
        <span :style="color">{{followVal || '请选择跟进方式'}}</span>
      </li>
      <!-- 性别选择插件 -->
      <li>
      <mt-popup 
      position="bottom"
      v-model="popupVisible">
        <mt-picker
        :slots="slots"
        @change="onValuesChange"
        ref="followPicker"></mt-picker>
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
      slots: [{values: ['电话沟通', '到店沟通', '微信沟通', '短信联系']}],
      popupVisible: false,
      key: false,
      color: "color: #999"
    }
  },
  computed:{
    ...mapState({
      followVal: state => state.select.followVal
    })
  },
  methods:{
    ...mapMutations(["setFollowVal"]),
    selectFollow() {
      this.color = "color: #363636";
      if (this.followVal === "") {
        this.setFollowVal(this.slots[0].values[0]);
      } else {
        this.$refs.followPicker.setSlotValue(0, this.followVal);
      }
      this.popupVisible = true;
    },
    onValuesChange(picker, values) {
      if(this.key) {
        this.$emit('followChange', values[0])
      }else {
        this.key = true
      }
 
    }
  }
  }

</script>

<style lang="scss">
  .followSelect{
    ul{
      width: 100%;
    }
  }
</style>