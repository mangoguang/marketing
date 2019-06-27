<!--  -->
<template>
  <div class="contentBox">
    <h1>{{title}}</h1>
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
  margin: 4.4vw;
  h1 {
    font-weight: normal;
    color: #666;
    line-height: 10.66vw;
    font-size: 3.7vw;
    padding-left: 2.4vw;
    position: relative;
    box-sizing: border-box;
  }
  h1::after {
    content: '';
      position:absolute;
      left:0;
      bottom:0;
      width:100%;
      height:1px;
      background: #ededed;
      transform-origin:0 0;
      transform:scaleY(0.5)
    }
}
</style>