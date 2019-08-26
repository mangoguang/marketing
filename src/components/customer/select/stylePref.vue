<template>
  <li class="sourceSelect">
    <ul>
      <li is="customerLi" :leftText="'装修风格'" :icon="true" @click.native="selectStyle">
        <span :style="color">{{stylePref || '请选择装修风格'}}</span>
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
        ref="stylePicker">
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
  name: 'styleSelect',
  components:{customerLi},
  data() {
    return {
      slots: [{values: [],defaultIndex:0}],
      popupVisible: false,
      key: false,
      color: "color: #999",
      typeList: [],
      code:'',
      value:''
    }
  },
  computed:{
    ...mapState({
      stylePref: state => state.select.stylePref,
      newCustomerInfo: state => state.customer.newCustomerInfo
    })
  },
  created() {
    this.init()
  },
  methods:{
    ...mapMutations(["setStylePref"]),
    //获取slot列表值
    init() {
      indexModel.getType('DR_STYLE_PRE').then(res => {
        if(res.data && res.data.length) {
          this.typeList = res.data
          let arr = setSlot(this.typeList)
          this.slots[0].values = arr
          if(this.newCustomerInfo && this.newCustomerInfo.stylePref) {
            this.color = 'color: #363636'
            this.setStylePref(this.newCustomerInfo.stylePref)
            let code = getCode(this.newCustomerInfo.stylePref,this.typeList)
            this.$emit('spCodeChange', code)
            this.key = false
          }
        }
      }).catch((reject) => {
        if (reject === 510) {
          this.init()
        }
      })
    },
    selectStyle() {
     /*  this.color = "color: #363636";
      if (this.stylePref === "") {
        this.setStylePref(this.slots[0].values[0]);
        let code = getCode(this.stylePref,this.typeList)
        this.$emit('spCodeChange', code)
        this.$emit('stylePrefChange', this.stylePref)
      } else {
        this.$refs.stylePicker.setSlotValue(0, this.stylePref);
      } */
      this.popupVisible = true;
    },
    //进来的时候走两次change事件
    onValuesChange(picker, values) {
     /*  if(this.key) {
        if(this.stylePref) {
          let code = getCode(values[0],this.typeList)
          this.$emit('spCodeChange', code)
          this.$emit('stylePrefChange', values[0])
        }
      }else {
        this.key = true
      } */
      this.code=getCode(values[0],this.typeList)
      this.value=values[0]
    },
    cancel(){
      this.popupVisible = false;
    },
    update(){
      this.color = "color: #363636";
      this.$emit('spCodeChange', this.code)
      this.$emit('stylePrefChange',this.value)
      this.popupVisible = false;
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