<!--  -->
<template>
  <ul :class="`checkContent ${status ? 'open' : 'close'}`">
    <li
    v-for="(item, index) in list"
    :key="`checkContent${index}`"
    :class="{done: item.status}"
    >{{item.text}}</li>
  </ul>
</template>

<script>
export default {
  props: ['list', 'status'],
  components : {
  },
  data () {
    return {
      
    }
  }
}
</script>
<style lang='scss' scoped>
.checkContent {
  li{
    position: relative;
    color: #2d2d2d;
    padding: 0 4vw;
    font-size: 16px;
    line-height: 3em;
    background: #fff;
  }
  li::after{
    display: block;
    content: '';
    width: 100%;
    height: 1px;
    position: absolute;
    left: 0;
    bottom: 0;
    background: #f8f8f8;
    transform: scaleY(0.5);
  }
  li.done{
    // background: url(../../../)
  }
}
.close{
  display: none;
}
</style>