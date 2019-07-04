<!--  -->
<template>
  <div class="tipsBox">
    <div class="tips_wrapper">
      <div class="header">
        <img :src="tipsData.imgUrl" alt="">
        <p class="text">{{tipsData.title}}</p>
      </div>
      <div class="content border-bottom">{{tipsData.content}}</div>
      <div class="btn">
        <button class="cancle" @click="handleCancle" v-show="tipsData.btn === 'cancle'">取消</button>
        <button class="comfirm" @click="handleComfirm">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['tipsData'],
  data () {
    return {

    };
  },
  methods: {
    handleCancle() {
      this.$emit('getTipsVal','cancle')
    },
    handleComfirm() {
      this.$emit('getTipsVal','comfirm')
    }
  }
}
</script>
<style lang='scss' scoped>
.tipsBox {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background:rgba($color: #000000, $alpha: 0.3);
  z-index: 999;
  .tips_wrapper {
    width: 74.66vw;
    border-radius: 1.2vw;
    background: #fff;
    // height: 50vw;
    margin: 0 auto;
    margin-top: 50%;
    .header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: ceter;
      flex-direction: column;
      padding-top: 2.4vw;
      box-sizing: border-box;
      img {
        width: 6.26vw;
        height: auto;
      }
      .text {
        color: #363636;
        font-size: 5.06vw;
        font-weight: bold;
      }
    }
    .content {
      padding: 0 7.6vw;
      box-sizing: border-box;
      color: #666;
      font-size: 3.73vw;
      text-align: center;
    }
    .btn {
      width: 100%;
      height: 12vw;
      display: flex;
      box-sizing: border-box;
      .cancle {
        flex: 1;
        color: #909090;
        font-size: 4.8vw;
         position: relative;
          &::after {
          content: '';
          position: absolute;
          top:0;
          left:0;
          box-sizing:border-box;
          border-right:1px solid #ececec;
          width:200%;
          height:200%;
          transform-origin:0 0 ;
          transform:scale(0.5)
        }
      }
      .comfirm {
        flex: 1;
        color: #363636;
        font-size: 4.8vw;
      }
    }
  }
}
</style>