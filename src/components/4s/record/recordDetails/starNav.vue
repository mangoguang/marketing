<!--  -->
<template>
  <ul class="starNav_wapper">
    <li class="starNav_title" 
        v-for="(item,index) in list" :key='item + index'
        @click="selectStar(index)"
        :class="index === activeStar? 'activity' : ''">
      <span >{{ item }}</span>
      <span class="text">|</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['star'],
  data () {
    return {
      list: ['五星','四星','三星','二星','一星'],
      activeStar: 0,
      timeoutId: null
    };
  },
  created() {
    this.setStar()
  },
  methods: {
    //初始的时候展示几颗星
    setStar() {
      const len = this.list.length 
      if(!this.star) {
        this.list = this.list.slice(len - 1)
      }else {
        this.list = this.list.slice(len - this.star)
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
  .activity {
    color: #007aff;
  }
}
</style>