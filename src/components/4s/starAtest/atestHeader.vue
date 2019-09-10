<template>
  <div class="atest-header">
    <div class="record_header">
      <div class="back_icon"
           @click="$router.go(-1)">
        <img src="../../../assets/imgs/4s/backicon.png"
             alt="返回按钮">
      </div>
      <div class="title">{{title}}</div>
      <div class="search"
           @click="$router.push('/searchIndex')">
        <span>经销商</span>
      </div>
    </div>
  </div>
</template>

<script>
import starHeader from '../record/header'
import _ from 'lodash'

export default {
  props: ['title'],
  components: {
    starHeader
  },
  data() {
    return {
      searchVal: ''
    }
  },
  methods: {
    bindSearch: _.debounce(function(e) {
      this.$emit('onSearch', e.target.value)
    }, 300)
  }
}
</script>
<style lang='scss' scoped>
.atest-header {
  position: relative;
  background: #007aff;
  width: 100vw;

  box-sizing: border-box;
  position: fixed;
  z-index: 1;
  padding-top: 14vw;
  left: 0;
  top: 0;
}

.record_header {
  height: 37px;
  padding-bottom: 5px;
  position: relative;
  .search {
    width: 92px;
    height: 24px;
    line-height: 24px;
    background: rgba(247, 247, 247, 1);
    border-radius: 12px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 23px;
    text-align: center;
    color: #999999;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      height: 24px;
      line-height: 24px;
      display: block;
      border: 1px solid transparent;
      box-sizing: border-box;
    }
    &::before {
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      background: url(../../../assets/imgs/4s/search@2x.png) center center
        no-repeat;
      background-size: contain;
      // position: absolute;
      // top: 50%;
      // left: 19px;
      // transform: translateY(-50%);
    }
    input {
      width: 100%;
      box-sizing: border-box;
      padding-left: 38px;
      padding-right: 5px;
    }
    ::-webkit-input-placeholder {
      padding-left: 5px;
    }
  }
  .back_icon {
    height: 37px;
    position: absolute;
    left: 6.4vw;
    top: 0;
    padding-right: 4vw;
    line-height: 12vw;
    img {
      width: 2.26vw;
      height: 4.26vw;
    }
  }
  .title {
    width: 100%;
    text-align: center;
    font-size: 4.8vw;
    font-weight: 500;
    color: #fff;
    line-height: 10vw;
  }
  .shopText {
    position: absolute;
    right: 6.4vw;
    bottom: 3vw;
    color: rgba($color: #fff, $alpha: 0.5);
    font-weight: 500;
    font-size: 3.46vw;
  }
}
</style>