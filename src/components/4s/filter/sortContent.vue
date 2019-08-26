<!--  -->
<template>
  <div class="sortContent">
    <ul class="content">
      <li class="li border-bottom" 
          v-for="(item,index) in list" :key="item + index"
          @click="handleClick(index)">
          <span :class="{active: activeIndex === index}">{{ item }}</span>
          <img  v-show="activeIndex === index"
                src="../../../assets/imgs/4s/starCheck/checked.png" alt="">
      </li> 
    </ul>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      activeIndex: 0
    };
  },
  methods: {
    handleClick(index) {
      this.activeIndex = index
      const data = {
        index
      }
      this.$emit('selectIndex',data)
    }
  }
}
</script>
<style lang='scss' scoped>
.sortContent {
  width: 100vw;
  height: 100vh;
  .content {
    width: 100vw;
    background: #f8f8f8;
    padding: 0 4.4vw;
    box-sizing: border-box;
    position: absolute;
    .li {
      line-height: 10.66vw;
      color: #909090;
      font-size: 4vw;
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        width: 2.93vw;
        height: auto;
      }
    }
    .active {
      color: #363636;
      font-weight: 500
    }
  }
}
</style>