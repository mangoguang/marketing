<template>
  <div class="enquiryOrderInfo">
    <div class="adress-icon"></div>
    <div class="adress">
      <ul>
        <li>张三 
          <span>15999999999</span>
          <div class="phone"></div>
        </li>
        <li>广东省 东莞市 厚街镇 明峰路 星月家居</li>
        <li>需求日期：10月24日</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueRouter from "vue-router";
import Vuex, { mapMutations, mapState } from "vuex";
import mango from "../../../js";

export default {
  props: [],
  data() {
    return {

    }
  }
};
</script>

<style lang="scss" scoped>
.enquiryOrderInfo{
  background: #fff;
  display: flex;
  align-items: center;
  padding: 5.46vw 0;
  font-size: 3.73vw;
  color: #363636;
  // justify-content: space-between;
  .adress-icon{
    background: red;
    width: 5.46vw;
    height: 6.53vw;
    margin-left: 4.13vw;
    margin-right: 5.06vw;
  }
  span{
    color: #999;
    margin-left: 6.66vw;
  }
  li:nth-child(1){
    display: flex;
    align-items: center;
  }
  .phone{
    background: url('../../../assets/imgs/phone.png') no-repeat center;
    background-size: 100% 100%;
    width: 3.06vw;
    height: 3.06vw;
    margin-left: 1vw;
  }
}
</style>
