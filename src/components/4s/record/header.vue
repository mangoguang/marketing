<!--  -->
<template>
  <div class="record_header"
       :style="{'margin-top':`${top}vw`}">
    <div class="back_icon"
         @click="goBack">
      <img src="../../../assets/imgs/4s/backicon.png"
           alt="">
    </div>
    <div class="title">{{title}}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['title'],
  data () {
    return {
      top: ''
    };
  },
  mounted () {
    this.isIPhoneX()
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    isIPhoneX () {
      let phone = this.phoneSize();
      if (phone === "iphonex") {
        this.top = "-5.86";
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.record_header {
  position: relative;
  background: #007aff;
  width: 100vw;
  height: 35.33vw;
  box-sizing: border-box;
  position: fixed;
  z-index: 99;
  padding-top: 14vw;
  left: 0;
  top: 0;
  .back_icon {
    position: absolute;
    left: 6.4vw;
    top: 14vw;
    padding-right: 4vw;
    line-height: 12vw;
    img {
      width: 2.26vw;
      height: 4.26vw;
    }
  }
  .title {
    width: 100%;
    text-align: center;
    font-size: 4.8vw;
    font-weight: 500;
    color: #fff;
    line-height: 10vw;
  }
  .shopText {
    position: absolute;
    right: 6.4vw;
    bottom: 3vw;
    color: rgba($color: #fff, $alpha: 0.5);
    font-weight: 500;
    font-size: 3.46vw;
  }
}
</style>