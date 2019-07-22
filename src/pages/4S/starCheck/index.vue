<!--  -->
<template>
  <div class="index">
    <Header :storeClass="parseInt($route.query.level)+1" />
    <iconBox :storeClass="parseInt($route.query.level)+1"
             :index="parseInt($route.query.level)"
             :row="true"
             :type="'dailyCheck'" />
    <BigCategory />
  </div>
</template>

<script>
import Header from '@/components/4s/index/header'
import iconBox from '@/components/4s/index/iconBox'
import BigCategory from '@/components/4s/starCheck/bigCategory'
export default {
  components: {
    Header,
    iconBox,
    BigCategory
  },
  data () {
    return {

    }
  },
  created () {
    console.log(this.$route.query)
  }
}
</script>
<style lang='scss' scoped>
.index {
  width: 100vw;
}
</style>