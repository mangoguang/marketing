<!-- 传row参数为true时图标跟文本水平排列 -->

<template>
  <!-- 星级检查图标 -->
  <div
  @click="toCheck" 
  :class="`iconBox_wrapper ${(index + 1) <= storeClass ? 'd2' : ''} ${row ? 'row' : ''}`"
  >
    <div
    class="starImg"
    :style="{
      background: `url(./static/images/4s/starCheck/star${(index + 1) <= storeClass ? `${index + 1}Bg` : `${index + 1}Bg_no`}.png) no-repeat`,
      backgroundSize: '100% 100%'
    }"
    >
      {{index + 1}}
    </div>
    <p class="text">{{ `${storeClassCN}星检查` }}</p>
  </div>
</template>

<script>
import getClassCN from '../../../utils/getClassCN'
export default {
  props: ['storeClass', 'index', 'row'],
  data () {
    return {
      storeClassCN: getClassCN(this.index)
    }
  },
  methods: {
    toCheck() {
      if (this.index + 1 <= this.storeClass) {
        // console.log('跳转' + (this.index + 1))
        this.$router.push({path: '/starCheck'})
      } else {
        console.log('未达等级')
      }
    }
  },
  mounted() {
    this.storeClassCN = getClassCN(this.index)
  }
}
</script>
<style lang='scss' scoped>
.iconBox_wrapper {
  width: 25%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 5vw;
  // margin-right: 8vw;
  // margin-bottom: 4vw;
  .icon {
    width: 10.26vw;
    height: 10.26vw;
    background-color: #61adff;
    border-radius: 50%;
    margin-bottom: 2.13vw;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 4.53vw;
      height: 4.13vw;
      margin-left: 1vw;
    }
  }
  .starImg {
    width: 10.8vw;
    height: 10.8vw;
    color: #fff;
    text-align: center;
    line-height: 10vw;
    font-size: 18px;
  }
  .text {
    color: #939393;
    font-weight: 500;
    font-size: 3.46vw;
  }
}
.d2{
  .text {
    color: #2d2d2d;
  }
}
.row{
  width: 100%;
  flex-direction: row;
  justify-content: center;
  .text{
    font-size: 24px;
  }
}
</style>