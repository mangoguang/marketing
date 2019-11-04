 <!-- <keep-alive> -->
<template>
  <div class="banner">
    <div :class="`${fix}`"></div>
    <div class="icon-back" @click="cilck">
      <div class="icon iconfont icon-fanhui1"></div>
    </div>
    <span class="my_title" :class="left? 'myLeftStyle':''">{{title}}</span>
    <slot></slot>
    <!-- <more-details class="details"  v-show='MoreBtn'/> -->
  </div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from "vue";
import VueRouter from "vue-router";
// import MoreDetails from './Gallery/productDetails/moreDetail'
export default {
  name: "routerLink",
  props: ["title", "MoreBtn", "left"],
  // components: {MoreDetails},
  data() {
    return {
      fix: "",
      top: ""
    };
  },
  mounted() {
    this.isIPhoneX();
  },
  methods: {
    cilck: function() {
      this.$router.back(-1);
    },
    isIPhoneX: function(fn) {
      var u = navigator.userAgent;
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isIOS) {
        if (
          (screen.height == 812 && screen.width == 375) ||
          (screen.height == 896 && screen.width == 414)
        ) {
          this.fix = "fix";
          this.top = "6";
        } else {
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.banner {
  // font-family: PINGPANG;
  font-weight: 600;
  z-index: 99;
  height: 16.466vw;
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;
  // border-bottom: 1px solid #ccc;
  // background: #f8f8f8;
  // padding-top: 3vw;
  // justify-content: space-between;
  .fix {
    position: absolute;
    background: #f8f8f8;
    left: 0;
    top: -10vw;
    height: 7vw;
    width: 100%;
    z-index: 99;
  }
  .icon-back {
    width: 7vw;
    height: 6.66vw;
    padding-left: 4.266vw;
    .icon {
      // background: url(../assets/imgs/back.png) no-repeat center;
      // background-size: 100%;
      font-size: 18px;
      width: 2.66vw;
      height: 4.66vw;
      margin-top: -1vw;
      color: #fff;
    }
  }
  .my_title {
    width: 50%;
    text-align: left;
    padding-right: 10.4vw;
    font-size: 5.06vw;
    // letter-spacing: -1px;
    color: #fff;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding-top: 2px;
  }
  button {
    position: absolute;
    right: 0;
    font-size: 14px;
    line-height: 11vw;
    //width: 25vw;
    padding: 0 5vw;
    text-align: right;
    color: #007aff;
    font-weight: bold;
    z-index: 1000;
  }
  .myLeftStyle {
    color: #222444;
    font-size: 4.8vw;
    font-weight: 500;
    padding-left: 2vw;
    text-align: left;
  }
}
</style>