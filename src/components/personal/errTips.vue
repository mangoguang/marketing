<template>
  <div class="errTips">
    {{errTips}}
  </div>
</template>

<script>
export default {
  props: {
    errTips: String
  },
  data () {
    return {

    };
  }
}
</script>
<style lang='scss' scoped>
.errTips {
  width: 100vw;
  height: 9.06vw;
  line-height: 9.06vw;
  background: rgba(204, 41, 52, 0.7);
  color: #fff;
  font-size: 3.46vw;
  padding-left: 4.26vw;
  box-sizing: border-box;
}
</style>