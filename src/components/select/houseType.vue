<template>
  <li class="sourceSelect">
    <ul>
      <li is="customerLi" :leftText="'户型大小'" :icon="true" @click.native="selectHouseType">
        <span :style="color">{{houseType || '请选择户型大小'}}</span>
      </li>
      <!-- 性别选择插件 -->
      <li>
      <mt-popup 
      position="bottom"
      v-model="popupVisible">
        <mt-picker
        :slots="slots"
        @change="onValuesChange"
        ref="houseTypePicker"></mt-picker>
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
  name: 'styleSelect',
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
      houseType: state => state.select.houseType,
      newCustomerInfo: state => state.customer.newCustomerInfo
    })
  },
  created() {
    this.init()
  },
  methods:{
    ...mapMutations(["setHouseType"]),
    //获取slot列表值
    init() {
      indexModel.getType('DR_APARTMENT_TYPE').then(res => {
        if(res.data && res.data.length) {
          this.typeList = res.data
          let arr = setSlot(this.typeList)
          this.slots[0].values = arr
          if(this.newCustomerInfo && this.newCustomerInfo.apartmentType) {
            this.color = 'color: #363636'
            this.setHouseType(this.newCustomerInfo.apartmentType)
            this.key = false
          }
        }
      })
    },
    selectHouseType() {
      this.color = "color: #363636";
      if (this.houseType === "") {
        this.setHouseType(this.slots[0].values[0]);
        let code = getCode(this.houseType,this.typeList)
        this.$emit('htCodeChange', code)
        this.$emit('houseTypeChange', this.houseType)
      } else {
        this.$refs.houseTypePicker.setSlotValue(0, this.houseType);
      }
      this.popupVisible = true;
    },
    //进来的时候走两次change事件
    onValuesChange(picker, values) {
      if(this.key) {
        if(this.houseType) {
          let code = getCode(values[0],this.typeList)
          this.$emit('htCodeChange', code)
          this.$emit('houseTypeChange', values[0])
        }
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