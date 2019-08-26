<!--  -->
<template>
  <div class="wrapper right">
    <div class="filter">
      <h5 class="title">星级</h5>
      <ul class="filter-box">
        <egg-filterBtn v-for="(item, index) in list" :key='item + index' 
                        :text="item"
                        :class="{active: index === activeIndex}"
                        @click.native="handleClick(index)"/>
      </ul>
    </div>
    <div class="btn">
      <button class="reset" @click="handleReset">重置</button>
      <button class="comfirm" @click="handleComfirm">完成</button>
    </div>
  </div>
</template>

<script>
import eggFilterBtn from './filterBtn'
export default {
  components: {
    eggFilterBtn
  },
  data () {
    return {
      list: ['全部','一星','二星','三星','四星','五星'],
      activeIndex: -1
    };
  },
  methods: {
    handleClick(index) {
      if(this.activeIndex == index) {
        this.activeIndex = -1
        return
      }
      this.activeIndex = index
    },
    handleReset() {
      this.activeIndex = - 1
      const data = this.getData()
      this.$emit('getVal',data)
    },
    handleComfirm() {
      const data = this.getData()
      this.$emit('getVal',data)
    },
    getData() {
      return {
        list: this.list,
        activeIndex: this.activeIndex
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.wrapper {
  width: 80vw;
  height: 100vh;
  background: #fff;
  padding: 0 4.53vw;
  box-sizing: border-box;
  padding-top: 7.6vw;
  .filter {
    .title {
      color: #999;
      font-size:3.73vw; 
    }
    .filter-box {
      margin-top: 2.4vw;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    .active {
      background: #b2d7ff;
      color: #007aff
    }
  }
  .btn {
    width: 80vw;
    display: flex;
    height: 22vw;
    font-size: 4.53vw;
    position: fixed;
    bottom: 0;
    right: 0;
    .reset{
      width: 50%;
      height: 100%;
      background: #b2d7ff;
      color: #007aff;
    }
    .comfirm {
      width: 50%;
      height: 100%;
      background: #007aff;
      color: #fff;
    }
  }
}
</style>