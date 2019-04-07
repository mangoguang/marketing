<template>
  <li class="leaveStoreSelect">
    <ul>
      <li is="customerLi" :leftText="'留店时长'" :icon="true" @click.native="selectLeaveStore">
        <span :style="color">{{ leaveStore || '请选择客户留店时长'}}</span>
      </li>
      <!-- 选择插件 -->
      <li class="pickerContainer">
        <mt-popup position="bottom" v-model="popupVisible">
          <mt-picker
            :slots="hourSlots"
            @change="hourChange"
            ref="hourPicker">
          </mt-picker>
          <mt-picker 
            :slots="minuteSlots" 
            @change="minuteChange" 
            ref="minPicker">
          </mt-picker>
        </mt-popup>
      </li>
    </ul>
  </li>
</template>

<script>
import Vue from "vue";
import VueRouter from "vue-router";
import Vuex, { mapMutations, mapState } from "vuex";
import { DatetimePicker, Picker, Popup } from "mint-ui";
// import { DatetimePicker } from 'mint-ui'
// import mango from '../../js'
// Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Picker.name, Picker);
Vue.component(Popup.name, Popup);
import customerLi from "../customer/customerLi";

export default {
  name: "leaveStoreSelect",
  components: { customerLi },
  data() {
    return {
      hourSlots: [],
      minuteSlots: [],
      popupVisible: false,
      key: false,
      color: "color: #999",
      hour: '',
      min: '',
      leaveStore:''
    };
  },
  computed: {
    ...mapState({
      leaveStoreVal: state => state.select.leaveStoreVal
    })
  },
  mounted() {
    this.getSlots();
    // this.$refs.leaveStorePicker.setSlotValue(0, this.val)
  },
  methods: {
    ...mapMutations(["setLeaveStoreVal"]),
    hourChange(picker, values) {
      this.hour = values[0]
      this.leaveStore = this.min? this.hour +  this.min : this.hour
      this.$emit("leaveStoreChange", this.leaveStore);
    },
    minuteChange(picker, values) {
      this.min = values[0]
      this.leaveStore = this.hour? this.hour + this.min : this.min
      this.$emit("leaveStoreChange", this.leaveStore);
    },
    selectLeaveStore() {
      this.color = "color: #363636";
      // if(!this.leaveStoreVal === "") {
      //   this.$refs.hourPicker.setSlotValue(0, '1 小时');
      // }
      // if (this.leaveStoreVal === "") {
      //   this.setLeaveStoreVal(this.slots[1].values[0]);
      // } else {
      //   let a = this.$refs.leaveStorePicker.getValues()
      //   console.log('a',a)
      //   this.$refs.leaveStorePicker.setSlotValue(0, this.leaveStoreVal);
      // }
      this.popupVisible = true;
    },
    onValuesChange(picker, values) {
      // console.log(values)
      // if (this.key) {
      //   this.$emit("leaveStoreChange", values);
      // } else {
      //   this.key = true;
      // }
    },
    //设置slot
    getSlots() {
      this.hourSlots = this.getTimes(24, '小时', 'slot1')
      this.minuteSlots = this.getTimes(60, '分钟', 'slot2')
    },
    //获取0-24 0-60
    getTimes(num, time, className) {
      let arr = [];
      for (var i = 0; i < num; i++) {
        arr[i] = i + ' ' + time;
      }
       let obj = [{
        values: arr,
        className: className
      }]
      return obj 
    }
  }
};
</script>

<style lang="scss">
.leaveStoreSelect {
  ul {
    width: 100%;
  }
}
  .pickerContainer{
    .mint-popup{
      display: flex;
      flex-direction: row;
      justify-content: center;
      // align-items: flex-start;
    }
  }
</style>