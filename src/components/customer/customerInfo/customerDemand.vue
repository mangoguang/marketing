<template>
  <div class="customerDemand">
    <ul>
      <li is="customerLi" :leftText="'意向产品'">
        <input placeholder="请填写意向产品" type="text">
      </li>
      <li is="customerLi" :leftText="'颜色偏好'">
        <input placeholder="请填写颜色偏好" type="text">
      </li>
      <li is="customerLi" :leftText="'风格偏好'">
        <input placeholder="请填写风格偏好" type="text">
      </li>
      <li is="customerLi" :leftText="'购买原因'">
        <input placeholder="请填写购买原因" type="text">
      </li>
      <li is="customerLi" :leftText="'装修进度'" :icon="true">
        <span>请填写装修进度</span>
      </li>
      <li is="customerLi" :leftText="'房间数量'">
        <input placeholder="请填写房间数量" type="text">
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
import customerLi from '../../../components/customer/customerLi'
import bigBtn from '../../../components/customer/bigBtn'
import mango from '../../../js'
export default {
  name:'customerDemand',
  components: {
    customerLi,
    bigBtn
  },
  data(){
    return{

    }
  },
  mounted() {
    console.log(this.$route.params.id)
  },
  methods: {
    getCustomerInfo() {

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
