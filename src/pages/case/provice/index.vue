<template>
  <div class="provice">
    <div class="search">
      <div class="input">
        <input type="text"
               maxlength="50"
               placeholder="请输入城市名">
      </div>
      <button class="cancel"
              @click="$router.go(-1)">取消</button>
    </div>
    <div class="position">
      <h3>当前定位</h3>
      <div class="pos">
        <div class="pos-now">东莞</div>
        <div class="pos-reset"
             :class="{'pos-active':resetPosition}"
             @click="bindResetPosition">重新定位</div>
      </div>
    </div>
    <index-list></index-list>
    <ul class="search-list">
      <li>广州</li>
      <li class="no-data">抱歉，未找到相关位置，请修改后重试</li>
    </ul>

  </div>
</template>
<script>
import { setTimeout } from 'timers'
import IndexList from './components/IndexList'
export default {
  components: {
    IndexList
  },
  data() {
    return {
      resetPosition: false
    }
  },
  methods: {
    bindResetPosition() {
      this.resetPosition = true
      // setTimeout(() => (this.resetPosition = false), 1000)
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
    background: $url;
    background-size: contain;
  }
}
.provice .search-list {
  height: 40px;
  line-height: 40px;
  color: #ff2d55;
  padding-left: 16px;
  font-size: 14px;
  li {
    border-bottom: 1px solid #e1e1e1;
  }
  .no-data {
    color: #666666;
  }
}
.position {
  background: #f7f7f7;
  padding: 10px 16px;
  h3 {
    font-size: 14px;
    color: #909090;
    line-height: 1;
    padding-bottom: 11px;
  }
  .pos {
    display: flex;
    justify-content: space-between;
    .pos-now {
      min-width: 60px;
      height: 30px;
      background: rgba(178, 215, 255, 1);
      border: 1px solid rgba(0, 122, 255, 1);
      border-radius: 2px;
      color: #007aff;
      text-align: center;
      line-height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      @include before-bg(
        10px,
        10px,
        url('~@/assets/imgs/case/定位 拷贝@2x.png') center center / contain
          no-repeat
      );
    }
    .pos-reset {
      color: #909090;
      font-size: 12px;
      height: 30px;
      line-height: 30px;
      border: 1px solid transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      @include before-bg(
        10px,
        10px,
        url('~@/assets/imgs/case/refresh@2x.png') left center / 14px 14px
          no-repeat
      );
      &::before {
        margin-right: 5px;
      }
    }
    .pos-active {
      &::before {
        animation: pos-roate 1s linear infinite;
      }
    }
  }
}
@keyframes pos-roate {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
}
.search {
  height: 44px;
  line-height: 44px;
  background-color: #fff;
  padding: 0 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  .input {
    width: 295px;
    height: 30px;
    border-radius: 15px;
    padding-left: 35px;
    padding-right: 10px;
    display: flex;
    background: rgba(247, 247, 247, 1) url(~@/assets/imgs/egg_search.png) 15px
      center / 15px 15px no-repeat;
    input {
      height: 30px;
      width: 100%;
    }
  }
  .cancel {
    min-width: 30px;
    font-size: 13px;
    font-weight: 400;
    color: rgba(0, 122, 255, 1);
    padding: 0;
    margin-left: 12px;
  }
}
</style>