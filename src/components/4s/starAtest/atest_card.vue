<!--  -->
<template>
  <div class="atest_card">
    <div class="header">
      <div class="left_text">
        <p class="name">广东广州何秋明</p>
        <p claas='star'>认证星级：三星</p>
      </div>
      <div class="right_text">
        <img src="../../../assets/imgs/4s/via.png" alt="">
      </div>
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
.atest_card {
  width: 94.66vw;
  height: 72.53vw;
  margin: 0 auto;
  margin-top: 2.4vw;
  background: #fff;
  border-radius: 2.4vw;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding:0 1.6vw;
    padding-top: 4vw;
    box-sizing: border-box; 
    .left_text {
      .name {
        color: #363636;
        font-size: 5.06vw;
        font-weight: bold;
      }
      .star {
        color-adjust: #363636;
        font-size: 4vw;
        font-weight: 500;
      }
    }
    .right_text {
      img {
        width: 12.2vw;
        height: 12.2vw;
      }
    }
  }
}
</style>