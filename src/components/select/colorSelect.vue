<template>
  <li class="colorSelect">
    <ul>
      <li is="customerLi" :leftText="'颜色偏好'" :icon="true" @click.native="selectColorPref">
        <span :style="color">{{colorPref || '请选择颜色偏好'}}</span>
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
        ref="colorPicker">
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
  name: 'colorSelect',
  components:{customerLi},
  data() {
    return {
      slots: [{values: []}],
      popupVisible: false,
      key: false,
      color: "color: #999",
      typeList: [],
      colorName:'',
      code:''
    }
  },
  computed:{
    ...mapState({
      colorPref: state => state.select.colorPref,
      newCustomerInfo: state => state.customer.newCustomerInfo
    })
  },
  created() {
    this.init()
  },
  methods:{
    ...mapMutations(["setColorPref"]),
    //获取slot列表值
    init() {
      indexModel.getType('DR_COLOR_PRE').then(res => {
        if(res.data && res.data.length) {
          this.typeList = res.data
          let arr = setSlot(this.typeList)
          this.slots[0].values = arr
          if(this.newCustomerInfo && this.newCustomerInfo.colorPref) {
            this.color = 'color: #363636'
            this.setColorPref(this.newCustomerInfo.colorPref)
            this.key = false
          }
        }
      }).catch((reject) => {
        if (reject === 510) {
          this.init()
        }
      })
    },
    selectColorPref() {
      this.color = "color: #363636";
      // if (this.colorPref === "") {
      //   this.setColorPref(this.slots[0].values[0]);
      //   let code = getCode(this.colorPref,this.typeList)
      //   this.$emit('colorCodeChange', code)
      //   this.$emit('colorChange', this.colorPref)
      // } else {
      //   this.$refs.colorPicker.setSlotValue(0, this.colorPref);
      // } 
      this.popupVisible = true;
    },
    //进来的时候走两次change事件
    onValuesChange(picker, values) {
      if(this.key) {
        // if(this.colorPref) {
          this.code = getCode(values[0],this.typeList)
          this.colorName=values[0]
          //this.$emit('colorCodeChange', code)
          //this.$emit('colorChange', values[0])
        // }
      }else {
        this.key = true
      }
    },
    cancel(){
      this.popupVisible = false
    },
    update(){
      this.$emit('colorCodeChange', this.code)
      this.$emit('colorChange',this.colorName)
      this.popupVisible=false;
    }
  }
  }

</script>

<style lang="scss">
  .colorSelect{
    ul{
      width: 100%;
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