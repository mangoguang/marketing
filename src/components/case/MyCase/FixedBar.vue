<template>
  <div class="fixed-bar">
    <ul class="main">
      <li class="view">2152</li>
      <li class="love"
          @click="$emt('onLove')">666</li>
      <li class="share"
          @click="$emit('onShare')">分享</li>
      <li class="del"
          @click="$emit('onDelete')">删除</li>
    </ul>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
@mixin before-bg($url) {
  &::before {
    content: '';
    display: block;
    width: 17px;
    height: 17px;
    background: url($url) no-repeat;
    background-size: contain;
  }
}
.fixed-bar {
  height: 83px;
  .main {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 52px;
    background-color: #fff;
    display: flex;
    li {
      flex: 1;
      display: flex;
      align-items: center;
      background: url(~@/assets/imgs/case/竖分割@2x.png) right center / 1px 29px
        no-repeat;
      justify-content: center;
      font-size: 14px;
      color: #666666;
      &:last-child {
        background: none;
      }
    }
    .view {
      @include before-bg('~@/assets/imgs/case/visible@2x 拷贝@2x.png');
    }
    .love {
      @include before-bg('~@/assets/imgs/case/关注(2)@2x.png');
    }
    .share {
      @include before-bg('~@/assets/imgs/case/分享@2x.png');
    }
    .del {
      @include before-bg('~@/assets/imgs/case/trash@2x@2x.png');
      color: #ff3338;
    }
  }
}
</style>