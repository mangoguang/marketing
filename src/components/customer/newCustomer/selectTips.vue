<template>
  <div class="selectTips">
    <div class="content">
      <p>{{ tipsVal }}</p>
      <p>是否前往维护客户？</p>
    </div>
    <div class="btn">
      <button class="cancle" @click="cancle">取消</button>
      <button class="comfirm" @click="comfirm">前往</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['btnSelect', 'tipsVal'],
  methods: {
    cancle() {
      this.btnSelect(false)
    },
    comfirm() {
      this.btnSelect(true)
    }
  }
}
</script>

<style lang="scss" scoped>
.selectTips{
  width: 74.66vw;
  height: 38.66vw;
  background: #fff;
  border-radius: 1.33vw;
  box-sizing: border-box;
  // margin: 0 auto;
  .content {
    width: 100%;
    height: 25.2vw;
    color: #666;
    font-size: 3.73vw;
    text-align: center;
    padding-top: 5vw;
    box-sizing: border-box;
  }
  .btn {
    display: flex;
    button {
      height: 13.33vw;
      border-top: 1px solid #e1e1e1;
      width: 50%;
    }
    .comfirm {
      border-bottom-right-radius: 1.33vw;
      border-left: 1px solid #e1e1e1;
      color: #363636;
      font-size: 4.8vw
    }
    .cancle {
      border-bottom-left-radius: 1.33vw;
      color: #909090;
      font-size: 4.8vw
    }
  }
}
</style>

