<!--  -->
<template>
  <ul class="starNav_wapper">
    <li class="starNav_title"
        v-for="(item,index) in starList"
        :key='item + index'
        @click="selectStar(item,index)"
        :style="index === activeStar? activeColor : ''">
      <span>{{ item.name }}</span>
      <span class="text">|</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['starList'],
  data () {
    return {
      list: ['五星', '四星', '三星', '二星', '一星'],
      activeStar: 0,
      timeoutId: null,
      activeColor: {
        color: '#007aff'
      }
    };
  },
  created () {
    this.setStar()
    this.setActivityColor()
  },
  methods: {
    //设置颜色
    setActivityColor () {
      const color = this.$route.query && this.$route.query.color
      if (color) {
        this.activeColor = {
          color
        }
      }
    },
    //初始的时候展示几颗星
    setStar () {
      const len = this.list.length
      if (!this.star) {
        this.list = this.list.slice(len - 1)
      } else {
        this.list = this.list.slice(len - this.star)
      }
    },
    //点击切换
    selectStar (item, index) {
      this.activeStar = index
      this.$emit('changeStar', item)
    }
  }
}
</script>
<style lang='scss' scoped>
.starNav_wapper {
  width: 100vw;
  height: 10vw;
  box-sizing: border-box;
  padding-left: 8.66vw;
  display: flex;
  .starNav_title {
    color: #838383;
    font-size: 3.73vw;
    line-height: 10vw;
    .text {
      margin: 0 3.73vw;
    }
  }
  // .activity {
  //   color: #007aff;
  // }
}
</style>