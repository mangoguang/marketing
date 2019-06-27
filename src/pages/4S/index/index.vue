<!--  -->
<template>
  <div class="index">
    <Header :storeClass="soreClass" />
    <div>门店选择下拉框</div>
    <myContent />
  </div>
</template>

<script>
import myContent from '../../../components/4s/index/content'
import Header from '../../../components/4s/index/header'
export default {
  components : {
    myContent,
    Header
  },
  data () {
    return {
      soreClass: 5
    }
  }
}
</script>
<style lang='scss' scoped>
.index {
  width: 100vw;
}
</style>