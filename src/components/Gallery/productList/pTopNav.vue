<template>
  <div class="p-topNav">
    <ul>
      <li v-for="(item, index) in productNavList" :key="index" 
        :class="{active : item.status}"
        @click="toggleNav(index)">
        <span>{{ item.name }}</span>
        <div class="dotted" v-show="item.status"></div>
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
      list: ['床', '床垫', '枕类', '排骨架', '床品', '助眠类', '桌椅类']
    };
  },
  computed: {
    ...mapState({
      productNavList: state => state.productNavList.productNavList,
      productNavlistVal: state => state.productNavList.productNavlistVal
    })
  },
  created() {
    this.initNav()
  },
  methods: {
    ...mapMutations(['setProductNavList', 'getProductNavListVal']),
    //初始化默认选热门
    initNav() {
      if(this.productNavList.length) {
        return
      }
      this.setProductNavList(mango.btnList(this.list, 0))
      this.getProductNavListVal()
    },
     //切换导航
    toggleNav(index) {
      if(this.productNavList[index].status) {
        return
      }
      this.setProductNavList(mango.btnList(this.list, index))
      this.getProductNavListVal()
    }
  }
};
</script>

<style lang="scss" scoped>
ul::-webkit-scrollbar {
  background-color: #fff;
}
.p-topNav {
  overflow-x: hidden;
  position: relative;
  ul {
    background: #e2effd;
    overflow-x: auto;
    display: flex;
    white-space: nowrap;
    li {
      line-height: 10.66vw;
      padding-left: 5.33vw;
      color: #8eaccc;
      font-size: 3.4vw;
      .dotted {
        width: 3vw;
        height: 3vw;
        border-radius: 50%;
        background: #007aff;
        transform: scale(0.4);
        margin: 0 auto;
        margin-top: -2vw;
      }
    }
    li:last-child {
      padding-right: 5vw;
    }
    .active {
      color: #363636;
      font-weight: bold;
      font-size: 3.4vw;
    }
  }
}
</style>

