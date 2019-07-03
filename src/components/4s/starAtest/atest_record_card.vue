<!--  -->
<template>
  <div class="atest_record_card">
    <div class="header">
      <div class="via">
        <img src="../../../assets/imgs/4s/via.png" alt="">
      </div>
      <div class="message">
        <p class="name">广东广州和秋明</p>
        <p class="level">认证星级：三星</p>
      </div>
      <div class="date">
        <span>06-04 15:00</span>
      </div>
    </div>
    <div class="status">
      <p class="turnBack" @click="handleBackout">撤销</p>
      <p class="pass">已申请</p>
    </div>
    <div class="score_wrapper border-bottom">
      <div class="score_box">
        <div class="wrapper">
          <span class="text">门店评分：</span>
          <span class="score">82</span>
        </div>
        <div class="wrapper">
          <span class="text">区域评分：</span>
          <span class="score">82</span>
        </div>
        <div class="wrapper">
          <span class="text">4s评分：</span>
          <span class="score">82</span>
        </div>
      </div>
      <div class="score_box">
        <span class="text">退回原因：不符合规范</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    };
  },
  methods: {
    handleBackout() {
      this.$emit('getBackOut',true)
    }
  }
}
</script>
<style lang='scss' scoped>
.atest_record_card {
  width: 91.46vw;
  // height: 35.33vw;
  margin: 0 auto;
  .header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 5.06vw;
    .via {
       flex: 0.15;
      img {
        width: 12vw;
        height: auto;
      }
    }
    .message {
      flex: 0.55;
      .name {
        color: #363636;
        font-size: 5.06vw;
        font-weight: bold;
        line-height: 1.3em;
      }
      .level {
        color: #363636;
        font-size: 4vw;
        font-weight: 500;
      }
    }
    .date {
      flex: 0.25;
      color: #666;
      font-size: 3.2vw;
    }
  };
  .status {
    width: 100%;
    font-size: 4vw;
    font-weight: 500;
    display: flex;
    justify-content: flex-end;
    padding-bottom: 1.2vw;
    box-sizing: border-box;
    align-items: center;
    .pass {
      color: #007aff;
    }
    .turnBack {
      text-align: center;
      color: #ff2d55;
      width: 18.66vw;
      line-height: 8vw;
      border-radius: 4vw;
      background: rgba($color: #ff2d55, $alpha: 0.3);
      margin-right: 5.73vw;
    }
  }
  .score_wrapper {
    padding-bottom: 1.4vw;
  }
  .score_box {
    display: flex;
    border-radius: 1.2vw;
    background: #f0f0f0;
    line-height: 6.4vw;
    font-size: 3.73vw;
    margin-bottom: 1.2vw;
    .text {
      color: #666;
      padding-left: 2vw;
      box-sizing: border-box;
    }
    .score {
      color: #ff2d55;
      font-weight: bold;
      margin-right: 2vw;
    }
  }
}
.unpass {
  color: #ff2d55;
}
.comfirm {
  color: #4CD964;
}
</style>