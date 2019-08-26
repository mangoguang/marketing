<template>
  <li class="discountSelect">
    <ul>
      <li is="customerLi" :leftText="'已谈折扣'" :icon="true" @click.native="selectDiscount">
        <span :style="color">{{ discountVal || '请选择已谈折扣'}}</span>
      </li>
      <!-- 选择插件 -->
      <!-- <li class="pickerContainer"> -->
        
      <!-- </li> -->
      <mt-popup position="bottom" v-model="popupVisible">
          <mt-picker
            :slots="firSlots"
            @change="firChange"
            :showToolbar="true"
            ref="firPicker">
            <div class="btn-group">
              <div @click="cancel">取消</div>
              <div @click="update">确定</div>
            </div>
          </mt-picker>
        </mt-popup>
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
      firSlots: [
       /*  {values: ['6', '7', '8', '9']},
        {
          divider: true,
          content: '  .  ',
          className: 'slot2'
        } */
          {
            flex: 0.2,
            values: ['6','7','8','9'],
            defaultIndex:0,
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '.',
            className: 'slot2'
          }, {
            flex: 0.2,
            values: ['0','1','2','3','4','5','6','7','8','9'],
            defaultIndex:0,
            className: 'slot3',
            textAlign: 'center'
          },{
            divider: true,
            content: '折',
            className: 'slot2'
          }
        ],
     /*  secSlots: [{values: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']},{
          divider: true,
          content: '  折',
          className: 'slot3'
        }], */
      popupVisible: false,
      key: false,
      color: "color: #999",
      firstCount: '',
      secondCount: '',
      discount:'',
      key1: false,
      key2: false
    };
  },
  computed: {
    ...mapState({
      discountVal: state => state.select.discountVal,
      newCustomerInfo: state => state.customer.newCustomerInfo
    })
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapMutations(["setDiscountVal"]),
    init() {
      //初始化问题
      if(this.newCustomerInfo && this.newCustomerInfo.argreeDiscount) {
        this.color = 'color: #363636'
        this.setDiscountVal(this.newCustomerInfo.argreeDiscount)
        this.key1 = false
        this.key2 = false
      }
    },
    firChange(picker, values) {
      /* if(this.key1) {
        this.firstCount = values[0]
        this.discount = this.secondCount? this.firstCount + '.' + this.secondCount + '折' : this.firstCount + '.0 折'
        this.$emit("discountChange", this.discount);
      }else {
        this.key1 = true
      } */
      this.discount=picker.getValues().join('.')+'折';
      //console.log('折扣',picker.getValues())
    },
    // secChange(picker, values) {
    //   if(this.key2) {
    //     this.secondCount = values[0]
    //     this.discount = this.secondCount?this.firstCount + '.' + this.secondCount + '折' : this.firstCount + '.0 折'
    //     this.$emit("discountChange", this.discount);
    //   }else {
    //     this.key2 = true
    //   }
    // },
    selectDiscount() {
     /*  this.color = "color: #363636";
      if (this.discountVal === "") {
        this.firstCount = '6'
        this.secondCount = '0'
        this.discount = this.firstCount + '.' +this.secondCount + '折'
        this.setDiscountVal(this.discount);
        this.$emit('discountChange', this.discountVal)
      } else {
        this.$refs.firPicker.setSlotValue(0, this.firstCount);
        this.$refs.secPicker.setSlotValue(0, this.secondCount);
      } */
      this.popupVisible = true;
    },
    cancel(){
      this.popupVisible = false;
    },
    update(){
      this.color = 'color: #363636'
      //console.log(parseFloat(this.discount)*10)
      this.$emit('discountChange', this.discount)
      this.popupVisible = false;
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
.btn-group{
  width:100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  //padding:0 4.266vw;
  div{
    color:#26a2ff;
    font-size: 16px;
  }
}
</style>
