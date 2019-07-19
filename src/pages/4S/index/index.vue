<!--  -->
<template>
  <div class="index">
    <Header :storeClass="soreClass" />
    <StoreSelect />
    <myContent />
  </div>
</template>

<script>
import myContent from '../../../components/4s/index/content'
import Header from '../../../components/4s/index/header'
import StoreSelect from '../../../components/4s/index/storeSelect'
export default {
  components : {
    myContent,
    Header,
    StoreSelect
  },
  data () {
    return {
      soreClass: 5
    }
  },
  mounted() {
    let str = '没有找到产品:1-44K6NZ(SBL-EXL-00151)(SBL-EXL-00151)(SBL-EXL-00151)(SBL-EXL-00151)'
    let reg = /\(SBL[\w-]*\)/g
    str = str.replace(reg, '')
    console.log('弹框信息：', str)
  }
}
</script>
<style lang='scss' scoped>
.index {
  width: 100vw;
  overflow: hidden;
}
</style>