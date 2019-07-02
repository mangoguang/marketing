<!--  -->
<template>
  <div class="atestHeader">
    <star-header :title="'申请认证'">
      <ul class="applyList">
        <li class="applyItem" 
            v-for="(item,index) in list" :key="index"
            :class="{active: activeIndex === index}"
            @click="handleClick(index)">
          {{ item }}
        </li>
      </ul>
    </star-header>
  </div>
</template>

<script>
import starHeader from '../record/header'

export default {
  components: {
    starHeader
  },
  data () {
    return {
      list: ['发起申请', '申请记录'],
      activeIndex: 0
    };
  },
  methods: {
    handleClick(index) {
      if(this.activeIndex === index) {
        return
      }
      this.activeIndex = index
      this.processor(index)
    },
    //防抖
    processor(index) {
      clearTimeout(this.timeoutId); 
      this.timeoutId = setTimeout(() => { 
        this.performProcessiong(index);
      },500) 
    },
    //真正要执行的代码
    performProcessiong(index) {
      this.$emit('getStatus',this.list[index])
    }
  }
}
</script>
<style lang='scss' scoped>
.atestHeader {
  .applyList {
    width: 100vw;
    height: 8vw;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 1vw;
    left: 0;
    .applyItem {
      font-size: 4.8vw;
      color: #fff;
      font-weight: 500;
      margin-left: 4vw;
    }
  }
  .active {
    border-bottom: 0.6vw solid #fff;
  }
}
</style>