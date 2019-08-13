<!--  -->
<template>
  <div class="score_wrapper">
    <circleProgress :score="score"
                    :star="starData" />
    <div class="time">
      <p>第{{cycle}}月</p>
    </div>
  </div>
</template>

<script>
import circleProgress from './circleProgress'
export default {
  components: {
    circleProgress
  },
  props: ['starData', 'score', 'cycle'],
  data () {
    return {

    };
  },
  methods: {
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