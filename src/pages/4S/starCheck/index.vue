<!--  -->
<template>
  <div class="index">
    <Header :storeClass="$route.query.starLevel" />
    <StarContentBox />
  </div>
</template>

<script>
import Header from '@/components/4s/index/header'
import StarContentBox from '@/components/4s/starCheck/StarContentBox'

export default {
  components: {
    Header,
    StarContentBox
  },
  data() {
    return {}
  }
}
</script>
<style lang='scss' scoped>
.index {
  width: 100vw;
}
</style>