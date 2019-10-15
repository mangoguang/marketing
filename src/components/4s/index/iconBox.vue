<!-- 传row参数为true时图标跟文本水平排列 -->

<template>
  <!-- 星级检查图标 -->
  <div :class="`iconBox_wrapper ${row ? 'row' : ''}`"
       v-if="type === 'dailyCheck'">
    <div class="starImg"
         :style="{
      background: `url(./static/images/4s/starCheck/star${(index + 1) <= storeClass ? `${index + 1}Bg` : `${index + 1}Bg_no`}.png) center center / 100% 100%  no-repeat`,

    }">{{index + 1}}</div>
    <p class="text">{{ `${storeClassCN}星检查` }}</p>
  </div>
  <!-- 评分报表图标 -->
  <div class="iconBox_wrapper"
       v-else-if="type === 'gradeReport'">
    <div class="starImg"
         :style="{
      background: `url(${iconData.icon}) no-repeat,url(${iconData.bgIcon})`,
      backgroundSize: '40% auto,100% 100%',
      backgroundPosition: 'center'
    }">
      <div class="tips_icon"
           v-if="hasNew === 'tips'"></div>
      <div class="news_icon"
           v-if="!isNaN(hasNew)&&hasNew!==0">
        <span>{{hasNew}}</span>
      </div>
    </div>

    <p class="text">{{iconData.text}}</p>
  </div>

  <!-- 权限配置图标 -->
  <div class="iconBox_wrapper"
       v-else>
    <div class="starImg"
         :style="{
      background: `url(./static/images/4s/starCheck/config.png) no-repeat`,
      backgroundSize: '100% 100%',
      backgroundPosition: 'center'
    }"></div>
    <p class="text">{{ '配置权限' }}</p>
  </div>
</template>

<script>
// import getClassCN from '../../../utils/getClassCN'
export default {
  props: ['type', 'storeClass', 'index', 'iconData', 'hasNew', 'row'],
  data() {
    return {
      storeClassCN: this.getClassCN()
    }
  },
  methods: {
    toCheck() {
      if (this.index + 1 <= this.storeClass) {
        console.log('跳转' + (this.index + 1))
        this.$router.push({ path: '/starCheck' })
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
  position: relative;

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
    // color: #fff;
    // text-align: center;
    // line-height: 10vw;
    // font-size: 18px;
    position: relative;
  }
  .text {
    color: #939393;
    font-weight: 500;
    font-size: 3.46vw;
  }
  .tips_icon {
    width: 2.93vw;
    height: 2.93vw;
    border-radius: 50%;
    background-color: #ee240e;
    // background: url('../../../assets/imgs/4s/news.png') no-repeat center;
    position: absolute;
    right: 6vw;
    top: 0;
  }
  .news_icon {
    width: 15px;
    height: 15px;
    line-height: 15px;
    border-radius: 50%;
    background: url('../../../assets/imgs/4s/news.png') no-repeat center;
    position: absolute;
    right: -5px;
    top: 0px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    & > span {
      font-size: 9px;
    }
  }
}
.d2 {
  .text {
    color: #2d2d2d;
  }
}
.row {
  width: 100%;
  flex-direction: row;
  justify-content: center;
  .text {
    font-size: 24px;
    padding-left: 3vw;
  }
}
</style>