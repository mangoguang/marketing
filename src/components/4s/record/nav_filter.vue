<!--  -->
<template>
  <ul class="starNav_wapper">
    123231
    <!-- <li class="starNav_title" 
        v-for="(item,index) in list" :key='item + index'
        @click="selectStar(index)"
        :style="index === activeStar? activeColor : ''">
      <span >{{ item }}</span>
      <span class="text">|</span>
    </li> -->
  </ul>
</template>

<script>
export default {
  props: ['star'],
  data () {
    return {
      list: ['全部','及格','不及格'],
      activeStar: 0,
      timeoutId: null,
      activeColor: {
        color: '#007aff'
      }
    };
  },
  created() {
    this.setActivityColor()
  },
  methods: {
    //设置颜色
    setActivityColor() {
      const color = this.$route.query && this.$route.query.color 
      if(color) {
        this.activeColor = {
          color
        }
      }
    },
    //点击切换
    selectStar(index) {
      if(this.activeStar === index) {
        return
      }
      this.activeStar = index
      this.processor(index)   //防抖
    },
    processor(index) {
      clearTimeout(this.timeoutId); 
      this.timeoutId = setTimeout(() => { 
        this.performProcessiong(index);
      },500) 
    },
    //真正要执行的代码
    performProcessiong(index) {
      this.$emit('changeStar',this.list[index])
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