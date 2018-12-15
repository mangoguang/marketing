<template>
  <div class="customerDemand">
    <ul>
      <li is="customerLi" :leftText="'意向产品'">
        <input v-model="customerDemand.intention" placeholder="请填写意向产品" type="text">
      </li>
      <li is="customerLi" :leftText="'颜色偏好'">
        <input v-model="customerDemand.colorPref" placeholder="请填写颜色偏好" type="text">
      </li>
      <li is="customerLi" :leftText="'风格偏好'">
        <input v-model="customerDemand.stylePref" placeholder="请填写风格偏好" type="text">
      </li>
      <li is="customerLi" :leftText="'购买原因'">
        <input v-model="customerDemand.buyReason" placeholder="请填写购买原因" type="text">
      </li>
      <li is="customerLi" :leftText="'装修进度'" :icon="true">
        <span>请选择装修进度</span>
      </li>
      <li is="customerLi" :leftText="'房间数量'">
        <input v-model="customerDemand.roomNum" placeholder="请填写房间数量" type="number">
      </li>
      <li class="textarea">
        <h3>备注：</h3>
        <textarea name="" id="" cols="30" rows="10" placeholder="描述一下情况吧"></textarea>
      </li>
      <li>
        <big-btn :text="'保存'" @click.native="saveCustomerInfo"></big-btn>
      </li>
    </ul>
  </div>
</template>

<script>
import Vuex, { mapMutations, mapState } from 'vuex'
import customerLi from '../../../components/customer/customerLi'
import bigBtn from '../../../components/customer/bigBtn'
import mango from '../../../js'
import {turnParams} from '../../../utils/customer'
export default {
  name:'customerDemand',
  components: {
    customerLi,
    bigBtn
  },
  data(){
    return{
      customerDemand: {}
    }
  },
  computed: {
    ...mapState({
      customerInfo: state => state.dealOrderInfoDetails.dealOrderInfoDetails
    })
  },
  watch: {
    'customerInfo': function(){
      console.log(888, this)
      this.customerDemand = {
        intention: '',
        colorPref: this.customerInfo.colorPref,
        stylePref: this.customerInfo.stylePref,
        buyReason: this.customerInfo.buyReason,
        progress: this.customerInfo.progress,
        roomNum: this.customerInfo.roomNum,
        remark: this.customerInfo.remark
      }
      console.log(999, this.customerDemand)
      let arr = this.customerInfo.demandList
      if (arr) {
        arr = arr.map(item => {
          return item.intention
        })
        this.customerDemand.intention = arr.join('、')
      }
    }
  },
  created() {
    //获取本地缓存信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
  },
  mounted() {
    console.log('客户信息：：', this.customerInfo)
    // this.getDemand()
  },
  methods: {
    getCustomerInfo() {

    },
    getDemand() {
      mango.getAjax(this, 'demand', {
        account: this.ajaxData.account,   //登录账户
        tenantId: this.ajaxData.tenantId,
        id: this.$route.params.id,
        ...turnParams(this.customerDemand, 'demand')
      },'v2', 'post').then((res) => {
        console.log('保存数据成功', res)
      })
    },
    saveCustomerInfo() {
      mango.getAjax(this, 'customer/update', {
        account: this.ajaxData.account,   //登录账户
        tenantId: this.ajaxData.tenantId,
        id: this.$route.params.id,
        ...turnParams(this.customerDemand, 'demand')
      },'v2', 'post').then((res) => {
        console.log('保存数据成功', res)
      })
      // console.log('客户信息：：', this.customerDemand)      
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/common.scss";
.customerDemand{
  background: #f8f8f8;
  li{
    display: flex;
    h3{
      color: $fontCol;
      font-size: $fontSize;
      padding: 0 5vw;
      line-height: 3em;
      border-bottom: 1px solid #ccc;
    }
    textarea{
      background: #fff;
      width: 100vw;
      height: 40vw;
      padding: 3vw 5vw;
      box-sizing: border-box;
      font-size: $fontSize;
    }
  }
  li.textarea{
    display: block;
  }
}
</style>
