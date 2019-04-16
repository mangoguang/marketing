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
import { IndexModel } from "../../utils/index";
const indexModel = new IndexModel();
import {setSlot,getCode} from '../../utils/customer'
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
      color: "color: #999",
      typeList: []
    }
  },
  computed:{
    ...mapState({
      sourceVal: state => state.select.sourceVal
    })
  },
  created() {
    this.init()
    // this.setSourceVal(this.slots[0].values[0])
    // this.$refs.sourcePicker.setSlotValue(0, this.val)
  },
  methods:{
    ...mapMutations(["setSourceVal"]),
    //获取slot列表值
    init() {
      indexModel.getType('DR_SOURCE_CHANNEL').then(res => {
        if(res.data && res.data.length) {
          this.typeList = res.data
          let arr = setSlot(this.typeList)
          this.slots[0].values = arr
        }
      })
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
        let code = getCode(values[0],this.typeList)
        this.$emit('codeChange', code)
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