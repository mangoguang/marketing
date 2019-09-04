<!--  -->
<template>
  <div class="selectList">
    <div class="mask"
         v-show="showStatus"></div>
    <div class="list_show"
         @click="handleNavSelect">
      <span class="text">{{ standards[activeIndex].name }}</span>
      <span class="icon"
            :class="showStatus?'rotate':''">
        <img src="../../../../assets/imgs/4s/down.png"
             alt="">
      </span>
    </div>
    <ul class="list_content"
        v-show="showStatus">
      <li class="item"
          :class="activeIndex === index? 'active' : ''"
          v-for="(item,index) in standards"
          :key='index + item'
          @click="handleItemSelect(index)">
        <span class="item-left">{{item.name}}</span>
        <span class="item-right"
              v-if="item.deduct!=0">{{-item.deduct||0}}分</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['standards'],
  data () {
    return {
      showStatus: false,
      activeIndex: 0
    };
  },
  methods: {
    handleNavSelect () {
      this.showStatus = !this.showStatus
    },
    handleItemSelect (index) {
      this.showStatus = !this.showStatus
      if (this.activeIndex === index) {
        return
      }
      this.activeIndex = index
      this.$emit('getActiveData', this.standards[index])
    }
  }
}
</script>
<style lang='scss' scoped>
.selectList {
  width: 71.13vw;
  box-sizing: border-box;
  margin: 0 auto;
  text-align: center;
  position: relative;
  .mask {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 98;
    top: 0;
    left: 0;
    background: transparent;
  }
  .list_show {
    width: 100%;
    height: 13.33vw;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    margin-top: 7.06vw;
    z-index: 98;
    ::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      box-sizing: border-box;
      border: 1px solid #e1e1e1;
      width: 200%;
      height: 200%;
      transform-origin: 0 0;
      transform: scale(0.5);
      border-radius: 50px;
    }
    .text {
      color: #090909;
      font-size: 4vw;
      font-weight: 500;
      flex: 0.8;
      padding-left: 12vw;
      box-sizing: border-box;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 70%;
    }
    .icon {
      flex: 0.2;
      img {
        width: 3vw;
        height: 3vw;
        transform: rotate(-90deg);
      }
    }
    .rotate {
      img {
        transform: rotate(90deg);
      }
    }
  }
  .list_content {
    z-index: 98;
    width: 71.13vw;
    position: absolute;
    margin-top: 1vw;
    box-sizing: border-box;
    background: rgba(237, 237, 237, 0.9);
    padding: 2vw 0;
    top: 14vw;
    left: 0;
    border-radius: 1.33vw;
    max-height: 60vh;
    overflow: auto;
    .item {
      display: flex;
      justify-content: space-between;
      padding: 10px 7.6vw;
      box-sizing: border-box;
      line-height: 1.2;
      border-bottom: 1px solid #fff;
      &:last-child {
        border-bottom: none;
      }
      .item-left {
        color: #000;
        font-size: 4vw;
        line-height: 1.2;
      }
      .item-right {
        color: #000;
        font-size: 3.46vw;
        min-width: 36px;
      }
    }
    .active {
      background: rgba(243, 248, 255, 0.8);
      span {
        color: #007aff !important;
      }
    }
  }
}
</style>