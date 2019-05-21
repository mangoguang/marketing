<template>
  <li class="selectElevator">
    <ul>
      <li is="customerLi" :leftText="'有无电梯'"  :icon="true" @click.native="selectElevator">
        <span :style="color">{{elevatorVal || '请选择有无电梯'}}</span>
      </li>
      <!-- 性别选择插件 -->
      <li>
        <mt-popup 
        position="bottom"
        v-model="popupVisible">
        <mt-picker
        :slots="slots"
        @change="onValuesChange"
        :showToolbar="true"
        ref="elevatorPicker">
        <div class="btn-group">
          <div @click="cancel">取消</div>
          <div @click="update">确定</div>
        </div>
        </mt-picker>
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
Vue.component(Picker.name, Picker)
Vue.component(Popup.name, Popup)
import customerLi from '../customer/customerLi'

export default {
  name: 'selectElevator',
  components:{customerLi},
  data() {
    return {
      slots: [{values: ['有', '无']}],
      popupVisible: false,
      key: false,
      color: 'color: #999',
      value:''
    }
  },
  computed:{
    ...mapState({
      elevatorVal: state => state.select.elevatorVal,
      newCustomerInfo: state => state.customer.newCustomerInfo
    })
  },
  created() {
    this.init()
  },
  methods:{
    ...mapMutations(["setElevatorVal", 'setNewCustomerInfo']),
    init() {
      if(this.newCustomerInfo.elevator) {
        this.color = 'color: #363636'
        let elevator;
        elevator = this.newCustomerInfo.elevator === 'Y'? '有' : '无'
        this.setElevatorVal(elevator)
        //this.key=false
      } 
    },
    selectElevator() {
      this.color = 'color: #363636'
      /* if(this.elevatorVal === '') {
        this.setElevatorVal(this.slots[0].values[0])
        this.newCustomerInfo.elevator = 'Y'
        this.setNewCustomerInfo(this.newCustomerInfo)
      }else {
        this.$refs.elevatorPicker.setSlotValue(0, this.elevatorVal)
      } */
      this.popupVisible = true
    },
    onValuesChange(picker, values) {
      // this.val = values[0]
      if(this.key) {
        this.value=values[0];
        //this.$emit('elevatorChange', values[0])
      }else {
        this.key = true
      }
    },
    cancel(){
      this.popupVisible = false
    },
    update(){
      this.$emit('elevatorChange', this.value)
      this.popupVisible = false
    }
  }
  }

</script>

<style lang="scss">
  .selectElevator{
    ul{
      width: 100%;
      .sex {
        margin-left: -3vw
      }
    }
  }
   .btn-group{
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  //padding:0 4.266vw;
 height:100%;
  div{
    //flex:1;
    color:#26a2ff;
    font-size: 16px;
  }
  }
</style>