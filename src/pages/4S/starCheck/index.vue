<!--  -->
<template>
  <div class="index">
    <Header />
    <iconBox
    :storeClass="'1'"
    :index="0"
    :key="`iconBox${'1'}`"
    :row="true"
    :type="'dailyCheck'"
    />
    <BigCategory />
  </div>
</template>

<script>
import Header from '../../../components/4s/index/header'
import iconBox from '../../../components/4s/index/iconBox'
import BigCategory from '../../../components/4s/starCheck/bigCategory'
export default {
  components : {
    Header,
    iconBox,
    BigCategory
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