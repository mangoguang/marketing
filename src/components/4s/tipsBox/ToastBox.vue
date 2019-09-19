<template>
  <div class="wrraper">
    <div class="box">
      <div class="title">
        <div class="icon"></div>
        <h2>{{title}}</h2>
      </div>
      <div class="content">
        <slot name="content">
          <div class="def-cont">{{content}}</div>
        </slot>
      </div>
      <div class="buttons">
        <slot name="bottons">
          <div class="btn"
               @click="$eimt('onComfirm')">确定</div>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '提示'
    },
    content: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.wrraper {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  .box {
    width: 300px;
    min-height: 205px;
    background: rgba(255, 255, 255, 1);
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .title {
    padding-top: 20px;
    .icon {
      height: 21px;
      width: 21px;
      background: url(../../../assets/imgs/4s/tips2.png) center center / 100%
        100% no-repeat;
      margin: 0 auto;
    }
    h2 {
      font-size: 16px;
      font-weight: bold;
      color: rgba(54, 54, 54, 1);
      line-height: 44px;
      text-align: center;
      line-height: 1;
      padding-top: 10px;
    }
  }
  .def-cont,
  .content {
    min-height: 96px;
    font-size: 15px;
    .def-cont {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .buttons {
    height: 51px;
    border-top: 1px solid #dddddd;
    line-height: 51px;
    text-align: center;
    .btn {
      color: #007aff;
      font-size: 15px;
    }
  }
}
</style>