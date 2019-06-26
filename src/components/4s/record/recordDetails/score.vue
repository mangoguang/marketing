<!--  -->
<template>
  <div class="score_wrapper">
    <div class="score_icon">
      <div class="icon_wrapper">
        <div class="spinner">
          <div class="inset"></div>
        </div>
      </div>
    </div>
    <div class="time">
      <p>检查时间2019年06月05日</p>
      <p>第一周</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    };
  }
}
</script>
<style lang='scss' scoped>
.score_wrapper {
  width: 100vw;
  .score_icon {
    margin: 0 auto;
    .icon_wrapper {

        .spinner {
          position: relative;

          width: 30.4vw;
          height: 30.4vw;
          margin: 7.33vw auto;
          border-radius: 50%;
          border: 4vw solid #dbdbdb;
          border-bottom: 4vw solid transparent;
        }
        .inset{
          width: 30.4vw;
          height: 30.4vw;
          border-radius: 50%;
          border-width: 4vw;
          border-style: solid;
          border-color: linear-gradient(0deg,#0055e3,#0facf5);
          border-bottom: 4vw solid transparent;
          position: absolute;
          left: -4vw;
          top: -4vw;
          border-right: 4vw solid transparent;
        }
    }
  }
  .time {
    text-align: center;
    color: #2e302d;
    font-weight: 500;
    opacity: 0.8;
    font-size: 3.46vw;
  }
}
</style>