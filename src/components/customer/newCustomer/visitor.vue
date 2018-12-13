<template>
  <ul>
    <li is="customerLi" :leftText="'客户姓名'">
      <input v-model="info.username" type="text">
    </li>
    <li is="customerLi" :leftText="'客户性别'">
      <input v-model="info.sex" type="text">
    </li>
    <li is="customerLi" :leftText="'意向产品'">
      <input v-model="info.demand" placeholder="填写客户意向产品" type="text">
    </li>
    <li is="customerLi" :leftText="'进店时间'">
      <span @click="selectTime">选择客户进店时间</span>
    </li>
    <li class="textarea">
      <remark :title="'备注'">
        <textarea name="" id="" placeholder="描述一下情况吧"></textarea>
      </remark>
      <!-- <h3>备注：</h3>
      <textarea name="" id="" cols="30" rows="10"></textarea> -->
    </li>
    <my-range :title="'成交概率'" @changeVal="changeMyRangeVal" />
    <!-- <li class="range">
      成交率
      <mt-range
        v-model="rangeValue"
        :min="0"
        :max="100"
        :step="5"
        :bar-height="5">
        <div slot="end">{{`${rangeValue}%`}}</div>
      </mt-range>
    </li> -->
    <li class="saveBtn"><big-btn :text="'保存'" @click.native="saveCustomerInfo"></big-btn></li>
  </ul>
</template>

<script>
import Vue from "vue"
// import { Range } from 'mint-ui'
// Vue.component(Range.name, Range)
// import dealHeader from '../../components/customer/dealCustomer/dealHeader'
import customerLi from '../customerLi'
import bigBtn from '../bigBtn'
import myRange from '../myRange'
import remark from '../remark'
// import mango from '../../js'
export default {
  name:'visitor',
  components: {
    customerLi,
    bigBtn,
    myRange,
    remark
  },
  data(){
    return{
      info: {

      },
      mtRangeVal: 50
    }
  },
  mounted() {
    
  },
  methods: {
    saveCustomerInfo() {

    },
    selectTime() {

    },
    changeMyRangeVal(val) {
      console.log('mtrange:', val)
      this.mtRangeVal = val
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/common.scss";
ul{
  display: flex;
  flex-direction: column;
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
  li.range{
    display: block;
    padding: 0 5vw;
  }
  .saveBtn{
    margin-top: 10vw;
  }
}
</style>
