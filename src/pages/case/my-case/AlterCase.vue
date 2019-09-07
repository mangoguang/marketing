<template>
  <div class="alter">
    <!-- <banner title="修改案例" /> -->
    <div class="title">产品<span>*</span> BCG-105</div>
    <div class="text">
      <textarea class="area"
                maxlength="150"
                v-model="description"></textarea>
      <p>描述<span>*</span></p>
      <div class="num">{{description.length}}/150</div>
    </div>
    <div class="postion">
      <span> 广东 东莞</span>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/banner'
export default {
  name: 'AlterCase',
  components: {
    Banner
  },
  data() {
    return {
      description: ''
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
@mixin before-bg($width, $height, $url) {
  &::before {
    content: '';
    display: block;
    width: $width;
    height: $height;
    background: url($url) no-repeat;
    background-size: contain;
  }
}
.alter {
  background-color: #fff;
  height: 100vh;
  padding: 0 10px;
  overflow: auto;
  .postion {
    border-top: 1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
    margin-top: 10px;
    margin-bottom: 15px;
    height: 45px;
    color: #007aff;
    padding-right: 17px;
    display: flex;
    align-items: center;
    background: url('~@/assets/imgs/case/箭头 拷贝 4@2x.png') right 17px center /
      7px 12px no-repeat;
    span {
      padding-left: 5px;
    }
    @include before-bg(18px, 18px, '~@/assets/imgs/case/定位@2x.png');
  }
  .text {
    width: 355px;
    height: 245px;
    background: rgba(248, 248, 248, 1);
    border-radius: 4px;
    padding: 16px 5px 25px 5px;
    position: relative;
    .area {
      text-indent: 50px;
      height: 100%;
      width: 100%;
      font-size: 14px;
      color: #363636;
      line-height: 21px;
    }
    & > p {
      font-size: 18px;
      color: #363636;
      position: absolute;
      top: 13px;
      left: 5px;
      line-height: 1;
      span {
        color: #fb222b;
      }
    }
    .num {
      position: absolute;
      bottom: 8px;
      right: 26px;
      font-size: 9px;
      color: #909090;
    }
  }
  .title {
    margin-top: 10px;
    margin-bottom: 10px;
    width: 355px;
    height: 45px;
    border-radius: 4px;
    color: #363636;
    padding-left: 7px;
    padding-right: 26px;
    line-height: 45px;
    font-size: 18px;
    background: rgba(248, 248, 248, 1)
      url('~@/assets/imgs/case/箭头 拷贝 4@2x.png') right 17px center / 7px 12px
      no-repeat;

    span {
      color: #fb222b;
    }
  }
}
</style>