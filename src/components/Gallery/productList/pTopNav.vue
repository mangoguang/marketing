<template>
  <div class="p-topNav">
    <ul ref='topNav'>
      <li v-for="(item, index) in productTabList"
          :key="index"
          :class="{active : index==activeIndex}"
          @click="toggleNav(index)">
        <span>{{ item.categoryName }}</span>
        <div class="dotted"
             v-show="index==activeIndex"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { btnList } from '../../../utils/gallery'
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      chooseIndex: -1,
      activeIndex: 0
    }
  },
  computed: {
    ...mapState({
      productNavList: state => state.productNavList.productNavList,
      productNavlistVal: state => state.productNavList.productNavlistVal,
      initNavList: state => state.productNavList.initNavList,
      productTabList: state => state.productNavList.productTabList
    })
  },
  created() {
    this.initNav()
    this.activeIndex = this.$route.query.index
  },
  mounted() {
    this.getIndex()
    this.$refs.topNav.scrollLeft = 60 * this.chooseIndex
  },
  methods: {
    ...mapMutations([
      'setProductNavList',
      'getProductNavListVal',
      'setProductTabList'
    ]),
    //初始化默认选热门
    initNav() {
      if (this.productNavList.length) {
        return
      }
      this.setProductNavList(btnList(this.initNavList, this.$route.query.index))
      this.getProductNavListVal()
    },
    //切换导航
    toggleNav(index) {
      // if (this.productNavList[index].status) {
      //   return
      // }
      this.activeIndex = index

      let name = this.productTabList[index]['categoryName']
      let navIndex = 0
      this.productNavList.map((item, index) => {
        if (item.name == name) {
          navIndex = index
        }
      })
      this.setProductTabList(this.productTabList)
      this.setProductNavList(btnList(this.productNavList, navIndex))
      this.getProductNavListVal()
    },
    getIndex() {
      this.productNavList.map((item, index) => {
        if (item.status) {
          this.chooseIndex = index
          return
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
ul::-webkit-scrollbar {
  background-color: #fff;
}
.p-topNav {
  overflow-x: hidden;
  position: relative;
  height: 11.46vw;
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

