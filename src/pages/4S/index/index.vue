<!--  -->
<template>
  <div class="index">
    <div>头部</div>
    <div>门店选择下拉框</div>
    <myContent />
  </div>
</template>

<script>
import myContent from '../../../components/4s/index/content'
export default {
  components : {
    myContent
  },
  data () {
    return {
   
    }
  }
}
</script>
<style lang='scss' scoped>
.index {
  width: 100vw;
}
</style>