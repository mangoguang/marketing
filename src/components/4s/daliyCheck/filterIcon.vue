<!--  -->
<template>
  <div class="starFilter" >
    <span class="text">{{filterText}}</span>
    <img  class="icon"
          :class="{rotate: hasRotate}"
          src="../../../assets/imgs/4s/starCheck/down.png">
  </div>
</template>

<script>
export default {
  props: ['filterText','changeStatus'],
  data () {
    return {
      hasRotate: false
    };
  },
  watch: {
    changeStatus() {
      this.hasRotate = !this.hasRotate
    }
  }
}
</script>
<style lang='scss' scoped>
.starFilter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .text {
    color: #fff;
    font-size: 3.37vw;
    font-weight: 500;
    line-height: 9.86vw;
  }
  .icon {
    width: 2.26vw;
    height: auto;
  }
  .rotate {
    transform: rotate(180deg)
  }
}
</style>