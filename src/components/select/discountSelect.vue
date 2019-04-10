<template>
  <li class="discountSelect">
    <ul>
      <li is="customerLi" :leftText="'已谈折扣'" :icon="true" @click.native="selectDiscount">
        <span :style="color">{{ discount || '请选择已谈折扣'}}</span>
      </li>
      <!-- 选择插件 -->
      <li class="pickerContainer">
        <mt-popup position="bottom" v-model="popupVisible">
          <mt-picker
            :slots="firSlots"
            @change="firChange"
            ref="firPicker">
          </mt-picker>
          <mt-picker 
            :slots="secSlots" 
            @change="secChange" 
            ref="secPicker">
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
Vue.component(Picker.name, Picker);
Vue.component(Popup.name, Popup);
import customerLi from "../customer/customerLi";

export default {
  name: "leaveStoreSelect",
  components: { customerLi },
  props: ['start'],
  data() {
    return {
      firSlots: [{values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},{
          divider: true,
          content: '  .  ',
          className: 'slot2'
        }],
      secSlots: [{values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},{
          divider: true,
          content: '  折',
          className: 'slot3'
        }],
      popupVisible: false,
      key: false,
      color: "color: #999",
      firstCount: '',
      secondCount: '',
      discount:''
    };
  },
  computed: {
    ...mapState({
      discountVal: state => state.select.discountVal
    })
  },
  methods: {
    ...mapMutations(["setDiscountVal"]),
    firChange(picker, values) {
      this.firstCount = values[0]
      this.discount = this.secondCount? this.firstCount + '.' + this.secondCount + '折' : this.firstCount
      this.$emit("discountChange", this.discount);
    },
    secChange(picker, values) {
      this.secondCount = values[0]
      this.discount = this.secondCount?this.firstCount + '.' + this.secondCount + '折' : ''
      this.$emit("discountChange", this.discount);
    },
    selectDiscount() {
      this.color = "color: #363636";
      this.popupVisible = true;
    }
  }
};
</script>

<style lang="scss">
.discountSelect {
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
