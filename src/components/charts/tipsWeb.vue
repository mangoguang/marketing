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
   font-family: PINGPANG;
  .topBox{
      height: 8vw;
      width: 100vw;
      background: #cc2934;
      opacity: .7;
      position: absolute;
      top: -8vw;
      left: 0;
      color: #fff;
      font-size: 3.46w;
      line-height: 9vw;
      padding-left: 4.26vw;
      animation: move1 4s;
      @keyframes move1 {
        from{
          top:-8vw
        }
        to{
          top: 5vw
        }
      }
    }
}
  
</style>
