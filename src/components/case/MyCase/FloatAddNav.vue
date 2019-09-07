<template>
  <div class="float-btn">
    <div class="float-main">
      <div class="float-img"></div>
      <h3>新增案例</h3>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.float-btn {
  min-height: 62px;
  .float-main {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 62px;
    background: linear-gradient(
      0deg,
      rgba(0, 122, 255, 1) 0%,
      rgba(0, 122, 255, 0.96) 100%
    );
    .float-img {
      width: 46px;
      height: 46px;
      background: url(~@/assets/imgs/case/相机@2x.png) center center / 46px 46px
        no-repeat;
      position: absolute;
      top: -23px;
      left: 50%;
      transform: translateX(-50%);
    }
    & > h3 {
      padding-top: 26px;
      color: #fff;
      font-size: 16px;
      text-align: center;
    }
  }
}
</style>