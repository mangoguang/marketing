<template>
  <div class="m-right">
    <div class="pictureLink">
      <router-link to='/recommend'>
        <img src="../../../assets/imgs/p1.png" alt="">
      </router-link>
    </div>
    <m-slider class="m-slider"/>
    <div class="classify">
      <ClassifyComp />
    </div>
  </div>
</template>
<script>
import MSlider from './slider'
import ClassifyComp from './classifyProduct'
export default {
  components: { MSlider, ClassifyComp }
}
</script>

<style lang="scss" scoped>
.m-right {
  .pictureLink {
    padding: 4.26vw;
    padding-bottom: 3vw;
    img {
      width: 70.13vw;
      height: 21.33vw;
    }
  }
  .m-slider {
    margin-left: 4vw;
  }
}
</style>


