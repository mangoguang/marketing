<template>
  <div class="index">
    <banner :title='"图库"'/>
    <div class="top-bar">
      <scan/>
      <Search :origin="true" :type="'gallery'" class="search"/>
    </div>
    <TopNav/>
    <div class="content">
      <div class="nav-left">
        <left-nav/>
      </div>
      <div class="nav-right">
        <RightContent/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import banner from '../../components/banner'
import Search from "../../components/msManage/search/eggSearchInp";
import Scan from "../../components/Gallery/index/scan";
import LeftNav from "../../components/Gallery/index/leftNav";
import RightContent from "../../components/Gallery/index/rightContent";
import TopNav from "../../components/Gallery/index/topNav";
export default {
  components: {
    Search,
    Scan,
    LeftNav,
    RightContent,
    TopNav,
    banner
  },
  data() {
    return {
    };
  },
  mounted() {
    this.setProductNavList([])
    this.setInitParmas()
    this.initPageList([])
  },
  methods: {
    ...mapMutations(['setProductNavList', 'setInitParmas', 'initPageList'])
  }
};
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
  .content {
    width: 100vw;
    border-top: 1px solid #e1e1e1;
    display: flex;
    .nav-left {
      flex: 0.25;
      height: 100vh;
      overflow: scroll;
      // padding-bottom: 50vw;
    }
    .nav-right {
      flex: 0.77;
    }
  }
}
</style>

