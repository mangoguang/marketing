<template>
  <li class="selectFollow">
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
        ref="selectFollow"></mt-picker>
      </mt-popup>
      </li>
    </ul>
  </li>
</template>

<script>
import { IndexModel } from "../../utils/index";
const indexModel = new IndexModel();
import {setSlot,getCode} from '../../utils/customer'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex, { mapMutations, mapState } from "vuex"
import { DatetimePicker, Picker, Popup } from 'mint-ui'
// import mango from '../../js'
Vue.component(Picker.name, Picker)
Vue.component(Popup.name, Popup)
import customerLi from '../customer/customerLi'

export default {
  name: 'selectFollow',
  components:{customerLi},
  data() {
    return {
      slots: [{values: ['电话沟通','到店沟通','微信沟通']}],
      popupVisible: false,
      key: false,
      color: "color: #999",
      typeList: []
    }
  },
  computed:{
    ...mapState({
      followVal: state => state.select.followVal,
      newCustomerInfo: state => state.customer.newCustomerInfo
    })
  },
  created() {
    this.init()
  },
  methods:{
    ...mapMutations(["setFollowVal"]),
    //获取slot列表值
    init() {
      if(this.newCustomerInfo && this.newCustomerInfo.source2) {
        this.color = 'color: #363636'
        this.setFollowVal(this.newCustomerInfo.source2)
        this.key = false
      }
    },
    selectFollow() {
      this.color = "color: #363636";
      if (this.followVal === "") {
        this.setFollowVal(this.slots[0].values[0]);
        let code = getCode(this.followVal,this.typeList)
        this.$emit('followWayChange', this.followVal)
      } else {
        this.$refs.selectFollow.setSlotValue(0, this.followVal);
      }
      this.popupVisible = true;
    },
    //进来的时候走两次change事件
    onValuesChange(picker, values) {
      if(this.key) {
        if(this.followVal) {
          let code = getCode(values[0],this.typeList)
          this.$emit('followWayChange', values[0])
        }
      }else {
        this.key = true
      }
    }
  }
  }

</script>

<style lang="scss">
  .selectFollow{
    ul{
      width: 100%;
    }
  }
</style>