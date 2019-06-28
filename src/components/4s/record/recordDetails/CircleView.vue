<!--  -->
<template>
  <div class="score_wrapper">
    <circleProgress :score="99" :star="'五星评分'"/>
    <div class="time">
      <p>检查时间2019年06月05日</p>
      <p>第一周</p>
    </div>
  </div>
</template>

<script>
import circleProgress from './circleProgress'
export default {
  components: {
    circleProgress
  },
  data () {
    return {

    };
  }
}
</script>
<style lang='scss' scoped>
.score_wrapper {
  width: 100vw;
  .time {
    text-align: center;
    color: #2e302d;
    font-weight: 500;
    opacity: 0.8;
    font-size: 3.46vw;
    margin-top: 1vw;
    position: relative;
    z-index: 100;
    margin-bottom: 2vw;
  }
}
</style>