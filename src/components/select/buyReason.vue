<template>
  <li class="sourceSelect">
    <ul>
      <li is="customerLi" :leftText="'购买原因'" :icon="true" @click.native="selectReason">
        <span :style="color">{{buyReason || '请选择购买原因'}}</span>
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
        ref="buyReasonPicker">
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
  name: 'buyReasonSelect',
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
      buyReason: state => state.select.buyReason,
      newCustomerInfo: state => state.customer.newCustomerInfo
    })
  },
  created() {
    this.init()
  },
  methods:{
    ...mapMutations(["setBuyReason"]),
    //获取slot列表值
    init() {
      indexModel.getType('REASON_PURCHASE').then(res => {
        if(res.data && res.data.length) {
          this.typeList = res.data
          let arr = setSlot(this.typeList)
          this.slots[0].values = arr
          if(this.newCustomerInfo && this.newCustomerInfo.buyReason) {
            this.color = 'color: #363636'
            this.setBuyReason(this.newCustomerInfo.buyReason)
            this.key = false
          }
        }
      }).catch((reject) => {
        if (reject === 510) {
          this.init()
        }
      })
    },
    selectReason() {
      /* this.color = "color: #363636"; */
      /* if (this.buyReason === "") {
        this.setBuyReason(this.slots[0].values[0]);
        let code = getCode(this.buyReason,this.typeList)
        this.$emit('brCodeChange', code)
        this.$emit('buyReasonChange', this.buyReason)
      } else {
        this.$refs.buyReasonPicker.setSlotValue(0, this.buyReason);
      } */
      this.popupVisible = true;
    },
    //进来的时候走两次change事件
    onValuesChange(picker, values) {
      /* if(this.key) {
        if(this.buyReason) {
          let code = getCode(values[0],this.typeList)
          this.$emit('brCodeChange', code)
          this.$emit('buyReasonChange', values[0])
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
      this.$emit('brCodeChange', this.code)
      this.$emit('buyReasonChange', this.value)
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