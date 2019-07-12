<!--  -->
<template>
  <div class="contentBox">
    <div class="border-bottom">
      <p class="title">{{title}}</p>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title'],
  data () {
    return {

    };
  }
}
</script>
<style lang='scss' scoped>
.contentBox {
  width: 90vw;
  min-height: 34.13vw;
  background: #fff;
  border-radius: 1.33vw;
  margin: 0 4.4vw 4.4vw 4.4vw;
  h1 {
    font-weight: normal;
    color: #666;
    line-height: 10.66vw;
    font-size: 3.7vw;
    padding-left: 2.4vw;
    box-sizing: border-box;
    width: 100%;
  }
  .title {
    line-height: 3em;
    padding-left: 4vw;
    color:#666;
  }
}
</style>