<template>
  <div class="index">
    <banner :title='"产品中心"' />
    <div class="top-bar">
      <scan />
      <Search :origin="true"
              :type="'gallery'"
              class="search"
              style="margin-top:6vw" />
    </div>
    <div class="nav">
      <TopNav @onTabChange="onTabChange" />
    </div>
    <router-view></router-view>

    <!-- <div class="content"
         v-show="tabIndex==0">
      <div class="nav-left">
        <left-nav />
      </div>
      <div class="nav-right">
        <RightContent />
      </div>
    </div>
    <CaseIndex v-show="tabIndex==1"></CaseIndex> -->
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import banner from '../../components/banner'
import Search from '../../components/msManage/search/eggSearchInp'
import Scan from '../../components/Gallery/index/scan'
import LeftNav from '../../components/Gallery/index/leftNav'
import RightContent from '../../components/Gallery/index/rightContent'
import TopNav from '../../components/Gallery/index/topNav'
import CaseIndex from '@/pages/case/index/Index'
export default {
  components: {
    Search,
    Scan,
    LeftNav,
    RightContent,
    TopNav,
    banner,
    CaseIndex
  },
  data() {
    return {
      tabIndex: 0
    }
  },
  mounted() {
    this.setProductNavList([])
    this.setInitParmas()
    this.initPageList([])
  },
  // beforeRouteLeave(){
  //   if (routeName.indexOf(to.name) != -1) {
  //     from.meta.keepAlive = true
  //   } else {
  //     from.meta.keepAlive = false
  //   }
  //   next()
  // },
  methods: {
    ...mapMutations(['setProductNavList', 'setInitParmas', 'initPageList']),
    onTabChange(index) {
      //this.tabIndex = index
      if (index == 0) {
        this.$router.replace('/gallery/product')
      } else {
        this.$router.replace('/gallery/case')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.index {
  background: #fff;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  .top-bar {
    padding: 0 4vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16vw;
    .search {
      width: 76.66vw;
    }
  }
  .nav {
    border-bottom: 1px solid #e1e1e1;
  }
  .content {
    width: 100vw;

    display: flex;
    .nav-left {
      flex: 0.21;
      width: 21vw;
      height: 100vh;
      overflow: scroll;
      // padding-bottom: 50vw;
    }
    .nav-right {
      flex: 0.79;
      width: 79vw;
    }
  }
}
</style>

