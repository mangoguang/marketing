<!-- <keep-alive> -->
<template>
  <div class="banner"></div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
export default {
  name: 'routerLink',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .banner{
    position: relative;
    height: 3vw;
    background: #fff;
  }
  .banner:after{
    content: '';
    display: block;
    position: absolute;
    height: 1px;
    width: 100%;
    top: 50%;
    left: 0;
    background-color: #e1e1e1;
  }
</style>