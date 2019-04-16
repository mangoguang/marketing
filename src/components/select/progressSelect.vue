<template>
  <li class="progressSelect">
    <ul>
      <li is="customerLi" :leftText="'装修进度'" :icon="true" @click.native="selectProgress">
        <span :style="color">{{progress || '请选择装修进度'}}</span>
      </li>
      <!-- 性别选择插件 -->
      <li>
      <mt-popup 
      position="bottom"
      v-model="popupVisible">
        <mt-picker
        :slots="slots"
        @change="onValuesChange"
        ref="progressPicker"></mt-picker>
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
  name: 'progressSelect',
  components:{customerLi},
  data() {
    return {
      slots: [{values: []}],
      popupVisible: false,
      key: false,
      color: "color: #999",
      typeList: []
    }
  },
  computed:{
    ...mapState({
      progress: state => state.select.progress,
      newCustomerInfo: state => state.customer.newCustomerInfo
    })
  },
  created() {
    this.init()
  },
  methods:{
    ...mapMutations(["setProgress"]),
    //获取slot列表值
    init() {
      indexModel.getType('DR_FITUP_PROGRESS').then(res => {
        if(res.data && res.data.length) {
          this.typeList = res.data
          let arr = setSlot(this.typeList)
          this.slots[0].values = arr
          if(this.newCustomerInfo && this.newCustomerInfo.progress) {
            this.color = 'color: #363636'
            this.setProgress(this.newCustomerInfo.progress)
            this.key = false
          }
        }
      })
    },
    selectProgress() {
      this.color = "color: #363636";
      if (this.progress === "") {
        this.setProgress(this.slots[0].values[0]);
        let code = getCode(this.progress,this.typeList)
        this.$emit('pgCodeChange', code)
        this.$emit('progressChange', this.progress)
      } else {
        this.$refs.progressPicker.setSlotValue(0, this.progress);
      }
      this.popupVisible = true;
    },
    //进来的时候走两次change事件
    onValuesChange(picker, values) {
      if(this.key) {
        if(this.progress) {
          let code = getCode(values[0],this.typeList)
          this.$emit('pgCodeChange', code)
          this.$emit('progressChange', values[0])
        }
      }else {
        this.key = true
      }
    }
  }
  }

</script>

<style lang="scss">
  .progressSelect{
    ul{
      width: 100%;
    }
  }
</style>