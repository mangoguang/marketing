<!--  -->
<template>
  <div class="iconBox_wrapper">
    <div
    class="starImg"
    v-if="starImg"
    :style="{
      background: 'url(./static/images/4s/starCheck/star1Bg.png) no-repeat',
      backgroundSize: '100%'
    }"
    >
      1
    </div>
    <div class="icon" v-else>
      <img :src="contentData.imgUrl" alt="">
    </div>
    <p class="text">{{ contentData.text }}</p>
  </div>
</template>

<script>
export default {
  props: ['contentData','starImg'],
  data () {
    return {

    }
  }
}
</script>
<style lang='scss' scoped>
.iconBox_wrapper {
  width: 25%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
  // margin-right: 8vw;
  // margin-bottom: 4vw;
  .icon {
    width: 10.26vw;
    height: 10.26vw;
    background-color: #61adff;
    border-radius: 50%;
    margin-bottom: 2.13vw;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 4.53vw;
      height: 4.13vw;
    }
  }
  .starImg {
    width: 10.8vw;
    height: 10vw;
    color: #fff;
    text-align: center;
    line-height: 9vw;
    font-size: 18px;
  }
  .text {
    color: #2d2d2d;
    font-weight: 500;
    font-size: 3.46vw;
  }
}
</style>