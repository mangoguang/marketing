<!--  -->
<template>
  <!-- 星级检查图标 -->
  <div
  @click="toCheck" 
  class="iconBox_wrapper"
  v-if="type === 'dailyCheck'"
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
  <!-- 评分报表图标 -->
  <div
    class="iconBox_wrapper"
    v-else-if="type === 'gradeReport'"
  >
    <div
    class="starImg"
    :style="{
      background: `url(./static/images/4s/starCheck/write.png) no-repeat, url(./static/images/4s/starCheck/btnBg.png) no-repeat`,
      backgroundSize: '40% auto, 100% 100%',
      backgroundPosition: 'center'
    }"
    >
    </div>
    <p class="text">{{ `检查记录` }}</p>
  </div>

  <!-- 权限配置图标 -->
  <div
    class="iconBox_wrapper"
    v-else
  >
    <div
    class="starImg"
    :style="{
      background: `url(./static/images/4s/starCheck/config.png) no-repeat, url(./static/images/4s/starCheck/btnBg.png) no-repeat`,
      backgroundSize: '40% auto, 100% 100%',
      backgroundPosition: 'center'
    }"
    >
    </div>
    <p class="text">{{ '配置权限' }}</p>
  </div>
</template>

<script>
export default {
  props: ['type','storeClass', 'index'],
  data () {
    return {
      storeClassCN: this.getClassCN()
    }
  },
  methods: {
    toCheck() {
      if (this.index + 1 <= this.storeClass) {
        console.log('跳转' + (this.index + 1))
      } else {
        console.log('未达等级')
      }
    },
    getClassCN() {
      switch (this.index) {
        case 0: 
          this.storeClassCN = '一'
          break
        case 1: 
          this.storeClassCN = '二'
          break
        case 2: 
          this.storeClassCN = '三'
          break
        case 3: 
          this.storeClassCN = '四'
          break
        default:
          this.storeClassCN = '五'
      }
    }
  },
  mounted() {
    this.getClassCN()
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
    }
  }
  .starImg {
    width: 10.8vw;
    height: 10vw;
    color: #fff;
    text-align: center;
    line-height: 10vw;
    font-size: 18px;
  }
  .text {
    color: #2d2d2d;
    font-weight: 500;
    font-size: 3.46vw;
  }
}
</style>