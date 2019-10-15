<template>
  <li class="selectFollow">
    <ul>
      <li is="customerLi"
          :leftText="'跟进方式'"
          :start='"*"'
          :icon="true"
          @click.native="selectFollow">
        <span :style="color">{{followVal || '请选择跟进方式'}}</span>
      </li>
      <!-- 性别选择插件 -->
      <li>
        <mt-popup position="bottom"
                  v-model="popupVisible">
          <mt-picker :slots="slots"
                     @change="onValuesChange"
                     :showToolbar="true"
                     ref="selectFollow">
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
import { IndexModel } from '../../utils/index'
const indexModel = new IndexModel()
import { setSlot, getCode } from '../../utils/customer'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex, { mapMutations, mapState } from 'vuex'
import { DatetimePicker, Picker, Popup } from 'mint-ui'
// import mango from '../../js'
Vue.component(Picker.name, Picker)
Vue.component(Popup.name, Popup)
import customerLi from '../customer/customerLi'

export default {
  name: 'selectFollow',
  components: { customerLi },
  data() {
    return {
      slots: [
        { values: ['到店沟通', '电话沟通', '微信沟通'], defaultIndex: 0 }
      ],
      popupVisible: false,
      key: false,
      color: 'color: #363636',
      typeList: [],
      code: '',
      value: ''
    }
  },
  computed: {
    ...mapState({
      followVal: state => state.select.followVal,
      newCustomerInfo: state => state.customer.newCustomerInfo
    })
  },
  created() {
    this.init()
  },
  methods: {
    ...mapMutations(['setFollowVal']),
    //获取slot列表值
    init() {
      if (this.newCustomerInfo && this.newCustomerInfo.source2) {
        this.color = 'color: #363636'
        this.setFollowVal(this.newCustomerInfo.source2)
        this.key = false
      }
    },
    selectFollow() {
      /* this.color = "color: #363636";
      if (this.followVal === "") {
        this.setFollowVal(this.slots[0].values[0]);
        let code = getCode(this.followVal,this.typeList)
        this.$emit('followWayChange', this.followVal)
      } else {
        this.$refs.selectFollow.setSlotValue(0, this.followVal);
      } */
      this.popupVisible = true
    },
    //进来的时候走两次change事件
    onValuesChange(picker, values) {
      /*  if(this.key) {
        if(this.followVal) {
          let code = getCode(values[0],this.typeList)
          this.$emit('followWayChange', values[0])
        }
      }else {
        this.key = true
      } */
      this.code = getCode(values[0], this.typeList)
      this.value = values[0]
    },
    cancel() {
      this.popupVisible = false
    },
    update() {
      this.color = 'color: #363636'
      this.$emit('followWayChange', this.value)
      this.popupVisible = false
    }
  }
}
</script>

<style lang="scss">
.selectFollow {
  ul {
    width: 100%;
  }
}
.btn-group {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  //padding:0 4.266vw;
  height: 100%;
  div {
    flex: 1;
    color: #26a2ff;
    font-size: 16px;
    text-align: center;
  }
}
</style>