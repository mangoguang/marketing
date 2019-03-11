<template>
  <ul class="m-left">
    <li v-for="(item, index) in leftNavList" :key="index" 
      :class="{active : item.status}"
      @click="toggleNav(index)">
      <div class="wrapper" :class="{leftline_active : item.status}">
        <img src="../../../assets/imgs/hot.png" alt="" class="hot" v-if="index == 0">
        <span>{{ item.name }}</span>
      </div>
    </li>
  </ul>
</template>

<script>
import mango from '../../../js'
import {mapState, mapMutations} from 'vuex'
export default {
  data() {
    return {
      list: ['热门推荐','凯奇','3D','0769']
    }
  },
  computed: {
    ...mapState({
      leftNavList: state => state.leftNavList.leftNavList,
      listVal: state => state.leftNavList.listVal
    })
  },
  created() {
    this.initNav()
  },
  methods: {
    ...mapMutations(['setLeftNavList', 'getListVal']),
    //初始化默认选热门
    initNav() {
      if(this.leftNavList.length) {
        return
      }
      this.setLeftNavList(mango.btnList(this.list, 0))
      this.getListVal()
    },
    //切换导航
    toggleNav(index) {
      if(this.leftNavList[index].status) {
        return
      }
      this.setLeftNavList(mango.btnList(this.list, index))
      this.getListVal()
    }
  }
}
</script>

<style lang="scss" scoped>
.m-left {
  li {
    font-size: 4vw;
    color: #363636;
    text-align: center;
    background: #f8f8f8;
    box-shadow:0px 1px 0px 0px rgba(225,225,225,1);
    line-height: 1.5em;
    .wrapper {
      padding: 4vw 3vw;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .leftline_active {
      margin: 4vw 0; 
      border-left: 0.8vw solid #363636;
      padding: 0 3vw;
    }
  }
  .active {
    font-weight: bold;
    background: #fff;
    height: 80%;
  }
  .hot {
    width: 3.2vw;
    height: 4vw;
    margin: 1vw;
  }
}
</style>

