<!--  -->
<template>
  <li class="filterBtn">
    <span>{{text}}</span>
  </li>
</template>

<script>
export default {
  props: ['text'],
  data () {
    return {

    };
  }
}
</script>
<style lang='scss' scoped>
.filterBtn {
  width: 21.33vw;
  background: #f8f8f8;
  border-radius: 1.6vw;
  color: #666;
  font-size: 3.73vw;
  line-height: 10.66vw;
  text-align: center;
  margin-bottom: 2.4vw;
}
</style>