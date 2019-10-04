<template>

  <div class="content">
    <div class="nav-left">
      <left-nav />
    </div>
    <div class="nav-right">
      <RightContent />
    </div>
  </div>

</template>

<script>
import LeftNav from '../../components/Gallery/index/leftNav'
import RightContent from '../../components/Gallery/index/rightContent'
export default {
  components: {
    RightContent,
    LeftNav
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.content {
  width: 100vw;

  display: flex;
  .nav-left {
    flex: 0.21;
    width: 21vw;
    height: 100vh;
    overflow: scroll;
    // padding-bottom: 50vw;
  }
  .nav-right {
    flex: 0.79;
    width: 79vw;
  }
}
</style>

