<template>
  <ul class="m-left">
    <li v-for="(item, index) in leftNavList" :key="index" 
      :class="{active : item.status}"
      @touchend="toggleNav(index)">
      <div class="wrapper" :class="{leftline_active : item.status}">
        <img src="../../../assets/imgs/hot.png" alt="" class="hot" v-if="index == 0">
        <span>{{ item.name }}</span>
      </div>
    </li>
  </ul>
</template>

<script>
import {getAjax, btnList} from '../../../utils/gallery'
import {mapState, mapMutations} from 'vuex'
import {IndexModel} from '../../../utils/index'
const indexModel = new IndexModel()
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      leftNavList: state => state.leftNavList.leftNavList,
      listVal: state => state.leftNavList.listVal,
      initlist: state => state.leftNavList.initlist
    })
  },
  created() {
    this.initNav()
  },
  methods: {
    ...mapMutations(['setLeftNavList', 'getListVal', 'setInitList']),
    //初始化默认选热门
    initNav() {
      if(this.leftNavList.length) {
        return
      }
      this.getBrand()
    },
    //获取导航栏
    getBrand() {
      let account = getAjax().account
      indexModel.getBrand(account).then(res => {
        if(res.data) {
          let hot = {name: '慕思'}
          let list = res.data.list
          list.unshift(hot)
          this.setInitList(list)
          this.setLeftNavList(btnList(this.initlist, 0))
          this.getListVal()
        }
      })
    },
    //切换导航
    toggleNav(index) {
      if(this.leftNavList[index].status) {
        return
      }
      this.setLeftNavList(btnList(this.initlist, index))
      this.getListVal()
    }
  }
}
</script>

<style lang="scss" scoped>
.m-left {
  margin-bottom: 48vw;
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

