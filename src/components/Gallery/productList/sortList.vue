<template>
  <div class="sortList" >
    <div class="all" @click="showList">
      <span>{{ downListVal }}</span>
      <img src="../../../assets/imgs/down.png" alt="">
    </div>
    <ul class="downList" v-show="showDownList" @click.self="clickSelf">
      <li v-for="(item, index) in downList" :key="index"
        :class="{active : item.status}"
        @click="toggleList(index)">
        <span>{{ item.name }}</span>
        <img src="../../../assets/imgs/picked.png" class="selected" v-show="item.status">
      </li>
    </ul>
  </div>
</template>

<script>
import mango from '../../../js'
import {mapMutations, mapState} from 'vuex'
export default {
  props: ['changeStatus', 'reset'],
  data() {
    return {
      list: ['综合', '最新发布', '价格↑', '价格↓', '收藏数'],
      showDownList: false
    }
  },
  computed: {
    ...mapState({
      downList: state => state.productNavList.downList,
      downListVal: state => state.productNavList.downListVal
    })
  },
  watch: {
    changeStatus() {
      if(this.changeStatus) {
        this.showDownList = false
        this.reset(false)
      }
    }
  },
  created() {
    this.initList()
  },
  methods: {
     ...mapMutations(['setDownList', 'setDownListVal']),
     //点击蒙层的时候收回下啦列表
     clickSelf() {
      this.showDownList = !this.showDownList
     },
    //初始化默认选热门
    initList() {
      if(this.downList.length) {
        return
      }
      this.setDownList(mango.btnList(this.list, 0))
      this.setDownListVal()
    },
    //出现下啦列表
    showList() {
      this.showDownList = !this.showDownList
    },
     //切换列表
    toggleList(index) {
      if(this.downList[index].status) {
        this.showDownList = !this.showDownList
        return
      }
      this.setDownList(mango.btnList(this.list, index))
      this.setDownListVal()
      this.showDownList = !this.showDownList
    }
  }
}
</script>

<style lang="scss" scoped>
.sortList {
  // width: 60vw;
  position: relative;
  .all {
    font-size: 4vw;
    color: #666;
    padding: 0 4vw;
    box-sizing: border-box;
    img {
      width: 2.13vw;
      height: 2.13vw;
      padding-left: 2vw;
    }
  }
  .downList {
    position: fixed;
    z-index: 99;
    // top: 10.3vw;
    top: 32.6vw;
    left: 0;
    width: 100vw;
    background: #f8f8f8;
    box-sizing: border-box;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    // overflow: hidden;
    li {
      padding: 0 4vw;
      color: #909090;
      font-size: 4vw;
      line-height: 10.66vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #f8f8f8;
      .selected {
        width: 2.93;
        height: 2.93vw;
      }
      .price {
        width: 1.86vw;
        height: 2.66vw;
      }
    }
    .active {
      color: #363636;
    }
  }
}
</style>

