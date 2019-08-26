<template>
  <li class="ageSelect">
    <ul>
      <li is="customerLi" :leftText="'客户年龄'" :icon="true" @click.native="selectAge">
        <span :style="color">{{ ageVal? ageVal:'请选择客户年龄'}}</span>
      </li>
      <!-- 性别选择插件 -->
      <li>
        <mt-popup position="bottom" v-model="popupVisible">
          <mt-picker :slots="slots" @change="onValuesChange" :showToolbar="true" ref="agePicker">
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
  name: "selectAge",
  components: { customerLi },
  data() {
    return {
      slots: [{values:[],defaultIndex:0}],
      popupVisible: false,
      key: false,
      color: "color: #999",
      value:''
    };
  },
  computed: {
    ...mapState({
      ageVal: state => state.select.ageVal,
      newCustomerInfo: state => state.customer.newCustomerInfo
    })
  },
  // watch: {
  //   newCustomerInfo() {
  //     this.init()
  //   }
  // },
  created() {
    this.getSlotVal();
    this.init()
  },
  methods: {
    ...mapMutations(["setAgeVal",'setNewCustomerInfo']),
    init() {
      //初始化年龄问题
      if(this.newCustomerInfo.age) {
        this.color = 'color: #363636'
        this.setAgeVal(this.newCustomerInfo.age)
      }
    },
    selectAge() {
     /*  this.color = "color: #363636";
      if (this.ageVal === "") {
        this.setAgeVal(this.slots[0].values[0]);
        this.newCustomerInfo.age = this.ageVal
        this.setNewCustomerInfo(this.newCustomerInfo)
      } else {
        this.$refs.agePicker.setSlotValue(0, this.ageVal);
      } */
      this.popupVisible = true;
    },
    onValuesChange(picker, values) {
     /*  if (this.key) {
        this.$emit("ageChange", values[0]);
      } else {
        this.key = true;
      } */
      this.value=values[0]
    },
    cancel(){
      this.popupVisible = false;
    },
    update(){
      this.color = "color: #363636";
      this.$emit("ageChange", this.value);
      this.popupVisible = false;
    },
    getSlotVal() {
      let arr = [];
      for (var i = 0; i < 91; i++) {
        arr[i] = i + 10;
      }
      this.slots[0].values = arr;
    }
  }
};
</script>

<style lang="scss">
.ageSelect {
  ul {
    width: 100%;
  }
}
 .btn-group{
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    //padding:0 4.266vw;
    div{
      //flex:1;
      color:#26a2ff;
      font-size: 16px;
    }
  }
</style>