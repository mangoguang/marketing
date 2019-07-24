<!--  -->
<template>
  <div class="starHeader">
    <star-header :title="'星级检查'">
      <egg-sort />
    </star-header>
  </div>
</template>

<script>
import starHeader from '../record/header'
import eggSort from '../filter/sort'

export default {
  components: {
    starHeader,
    eggSort
  },
  data () {
    return {

    };
  }
}
</script>
<style lang='scss' scoped>
.starHeader {
}
</style>