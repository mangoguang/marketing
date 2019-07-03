<!--  -->
<template>
  <div class="starHeader">
    <star-header :title="'三星检查'">
      <star-sort />
      <!-- <div>搜索</div> -->
    </star-header>
  </div>
</template>

<script>
import starHeader from '../record/header'
import starSort from './starSort'

export default {
  components: {
    starHeader,
    starSort
  },
  data () {
    return {

    };
  },
  methods: {
    
  }
}
</script>
<style lang='scss' scoped>
.starHeader {
 
}
</style>