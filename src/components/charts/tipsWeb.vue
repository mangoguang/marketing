<template>
  <div class="tipsWeb">
    <div class="topBox">
      <span>网络请求错误，请检查网络</span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  
}
</script>

<style lang="scss">
.tipsWeb{
  .topBox{
      height: 9vw;
      width: 100vw;
      background: #cc2934;
      opacity: .7;
      position: absolute;
      top: -9vw;
      left: 0;
      color: #fff;
      font-size: 3.46w;
      line-height: 9vw;
      padding-left: 4.26vw;
      animation: move1 2s;
      @keyframes move1 {
        from{
          top:-9vw
        }
        to{
          top: 0vw
        }
      }
    }
}
  
</style>
