<!--  -->
<template>
  <!-- 评分报表图标 -->
  <div
    class="iconBox_wrapper"
    v-if="type === 'gradeReport'"
  >
    <div
    class="starImg"
    :style="{
      background: `url(./static/images/4s/starCheck/write.png) no-repeat, url(./static/images/4s/starCheck/btnBg.png) no-repeat`,
      backgroundSize: '40% auto, 100% 100%',
      backgroundPosition: 'center'
    }"
    >
    </div>
    <p class="text">{{ title }}</p>
  </div>

  <!-- 权限配置图标 -->
  <div
    class="iconBox_wrapper"
    v-else
  >
    <div
    class="starImg"
    :style="{
      background: `url(./static/images/4s/starCheck/${icon}.png) no-repeat, url(./static/images/4s/starCheck/config.png) no-repeat`,
      backgroundSize: '40% auto, 100% 100%',
      backgroundPosition: 'center'
    }"
    >
    </div>
    <p class="text">{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: ['type','storeClass', 'title', 'icon'],
  data () {
    return {

    }
  },
  methods: {

  },
  mounted() {

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
  margin-top: 5vw;
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
      margin-left: 1vw;
    }
  }
  .starImg {
    width: 10.8vw;
    height: 10.8vw;
    color: #fff;
    text-align: center;
    line-height: 10vw;
    font-size: 18px;
  }
  .text {
    color: #2d2d2d;
    font-weight: 500;
    font-size: 3.46vw;
  }
}
</style>