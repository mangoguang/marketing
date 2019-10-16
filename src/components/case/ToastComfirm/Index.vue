<template>
  <div class="wrraper">
    <div class="box">
      <div class="title">
        <div class="icon"
             :class="{'big-icon':!title}"></div>
        <h2 v-if="title">{{title}}</h2>
      </div>
      <div class="content">
        <slot name="content">
          <div class="def-cont"
               v-html="content"></div>
        </slot>
      </div>
      <div class="buttons">
        <slot name="bottons">
          <div class="btn com"
               @click="$emit('onComfirm')">确定</div>
          <div class="btn cancel"
               @click="$emit('onCancel')">取消</div>

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
    min-height: 145px;
    background: rgba(255, 255, 255, 1);
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
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
    .big-icon {
      width: 38px;
      height: 38px;
    }
    h2 {
      font-size: 16px;
      font-weight: bold;
      color: rgba(54, 54, 54, 1);
      line-height: 44px;
      text-align: center;
      line-height: 1;
      padding-top: 5px;
    }
  }
  .def-cont,
  .content {
    min-height: 65px;
    .def-cont {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #666666;
      font-size: 14px;
    }
  }
  .buttons {
    height: 51px;
    border-top: 1px solid #dddddd;
    line-height: 51px;
    text-align: center;
    display: flex;
    width: 100%;
    .btn {
      font-size: 18px;
      text-align: center;
      flex: 1;
      &:active {
        background-color: #b2d7ff;
        color: #007aff;
      }
    }
    .com {
      color: #363636;
      border-right: 1px solid #e1e1e1;
    }
    .cancel {
      color: #909090;
      font-size: 18px;
    }
  }
}
.but {
  display: flex;
  width: 100%;
  .btns {
    flex: 1;
    font-size: 18px;
    color: #909090;
    &:active {
      background-color: #b2d7ff;
      color: #007aff;
    }
  }
  .commit {
    color: #363636;
    border-right: 1px solid #ddd;
  }
}
</style>