<!--  -->
<template>
  <div class="sortIcon" >
    <span class="text">{{ sortText }}</span>
    <img  class="icon"
          :class="{rotate:hasRotate}"
          src="../../../assets/imgs/4s/sort.png">
  </div>
</template>

<script>
export default {
  props: ['sortText','changeStatus'],
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
.sortIcon {
  img {
    width: 2.14vw;
    height: auto;
  }
}
.rotate {
  transform: rotate(180deg)
}
</style>