<template>
  <li class="leaveStoreSelect">
    <ul>
      <li is="customerLi" :leftText="text? text:'留店时长'" :start='start? "*": ""' :icon="true" @click.native="selectLeaveStore">
        <span :style="color">{{ type?(followTiming || '请选择跟进时长'): (leaveStoreVal || '请选择客户留店时长')}}</span>
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
  props: ['start', 'text', 'type'],
  data() {
    return {
      hourSlots: [],
      minuteSlots: [],
      popupVisible: false,
      key1: false,
      key2: false,
      color: "color: #999",
      hour: '',
      min: '',
      leaveStore:''
    };
  },
  computed: {
    ...mapState({
      leaveStoreVal: state => state.select.leaveStoreVal,
      followTiming: state => state.select.followTiming,
      newCustomerInfo: state => state.customer.newCustomerInfo
    })
  },
  mounted() {
    this.getSlots();
    this.init()
  },
  methods: {
    ...mapMutations(["setLeaveStoreVal",'setFollowTiming']),
     init() {
       if(this.type) {
         if(this.newCustomerInfo && this.newCustomerInfo.residentTime2) {
            this.color = 'color: #363636'
            this.setFollowTiming(this.newCustomerInfo.residentTime2)
            this.key1 = false
            this.key2 = false
          }
       }else {
         if(this.newCustomerInfo && this.newCustomerInfo.residentTime) {
            this.color = 'color: #363636'
            this.setLeaveStoreVal(this.newCustomerInfo.residentTime)
            this.key1 = false
            this.key2 = false
          }
       }
      //初始化问题
      
    },
    hourChange(picker, values) {
      if(this.key1) {
        this.hour = values[0]
        this.leaveStore = this.min? this.hour +  this.min : this.hour
        this.type? this.$emit("leaveStoreChange2", this.leaveStore) : this.$emit("leaveStoreChange", this.leaveStore);
      }else {
        this.key1 = true
      }
      
    },
    minuteChange(picker, values) {
      if(this.key2) {
        this.min = values[0]
        this.leaveStore = this.hour? this.hour + this.min : this.min
        this.type? this.$emit("leaveStoreChange2", this.leaveStore) : this.$emit("leaveStoreChange", this.leaveStore);
      }else {
        this.key2 = true
      }
    },
    selectLeaveStore() {
      if(this.type) {
        this.followMethod()
      }else {
        this.leaveMethod()
      }
      this.popupVisible = true;
    },
    //
    leaveMethod() {
      this.color = "color: #363636";
      if (this.leaveStoreVal === "") {
        this.leaveStore = this.hour + this.min 
        this.setLeaveStoreVal(this.leaveStore);
        this.$emit('leaveStoreChange', this.leaveStoreVal)
      } else {
        this.$refs.hourPicker.setSlotValue(0, this.hour);
        this.$refs.minPicker.setSlotValue(0, this.min);
      }
    },
    followMethod() {
      this.color = "color: #363636";
      if (this.followTiming === "") {
        this.leaveStore = this.hour + this.min 
        this.setFollowTiming(this.leaveStore);
        this.$emit('leaveStoreChange2', this.followTiming)
      } else {
        this.$refs.hourPicker.setSlotValue(0, this.hour);
        this.$refs.minPicker.setSlotValue(0, this.min);
      }
    },
    //设置slot
    getSlots() {
      this.hourSlots = this.getTimes(24, '小时', 'slot1')
      this.minuteSlots = this.getTimes(60, '分', 'slot2')
    },
    //获取0-24 0-60
    getTimes(num, time, className) {
      let arr = [];
      for (var i = 0; i < num; i++) {
        arr[i] = i + time;
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