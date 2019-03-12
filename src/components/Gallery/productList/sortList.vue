<template>
  <div class="sortList">
    <div class="all" @click="showList">
      <span>{{ downListVal }}</span>
      <img src="../../../assets/imgs/down.png" alt="">
    </div>
    <ul class="downList" v-show="key">
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
  data() {
    return {
      list: ['综合', '最新发布', '价格↑', '价格↓', '收藏数', '销量'],
      key: false
    }
  },
  computed: {
    ...mapState({
      downList: state => state.productNavList.downList,
      downListVal: state => state.productNavList.downListVal
    })
  },
  created() {
    this.initList()
  },
  methods: {
     ...mapMutations(['setDownList', 'setDownListVal']),
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
      this.key = !this.key
    },
     //切换列表
    toggleList(index) {
      if(this.downList[index].status) {
        this.key = !this.key
        return
      }
      this.setDownList(mango.btnList(this.list, index))
      this.setDownListVal()
      this.key = !this.key
    }
  }
}
</script>

<style lang="scss" scoped>
.sortList {
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
    padding: 0 4vw;
    width: 100vw;
    background: #f8f8f8;
    box-sizing: border-box;
    li {
      color: #909090;
      font-size: 4vw;
      line-height: 10.66vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
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

