<template>
  <div class="eggBtn">
    <div class="content">
      <img src="../../../assets/imgs/warn.png" alt="">
      <p>{{ text }}</p>
    </div>
    <div class="btn">
      <button class="confirm" @click="confirm">确定</button>
      <button class="cancle" @click="cancle">取消</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['text', 'getVal'],
  methods: {
    confirm() {
      this.getVal(true)
    },
    cancle() {
      this.getVal(false)
    }
  }
}
</script>

<style lang="scss" scoped>
.eggBtn {
  width: 74.66vw;
  height: 38.66vw;
  border-radius: 1.33vw;
  background: #fff;
  text-align: center;
  .content {
    width: 100%;
    border-bottom: 1px solid #e1e1e1;
    img {
      width: 10.13vw;
      height: 10.13vw;
      margin: 4vw auto;
    }
    p {
      color: #666;
      font-size: 3.73vw;
      margin-top: -6vw;
      line-height: 12vw;
    }
  }
  .btn {
    display: flex;
  }
  button {
    font-size: 4.8vw;
    font-weight: 500;
    line-height: 11.6vw;
  }
  .confirm {
    color: #363636;
    flex: 0.5;
    border-right: 1px solid #e1e1e1;
  }
  .cancle {
    color: #909090;
    flex: 0.5
  }
}
</style>

