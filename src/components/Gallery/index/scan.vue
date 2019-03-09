<template>
  <div class="m-scan">
    <span class="scan">
      <img src="../../../assets/imgs/scan.png" alt="">
      <p>扫一扫</p>
    </span>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.m-scan {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .scan {
    text-align: center;
    margin-right: 4vw;
    img {
      width: 7.13vw;
      height: 7.13vw;
    }
    p {
      color: #5ac8fa;
      font-size: 2.4vw;
      line-height: 0.5;
    }
  }
 
}
</style>


