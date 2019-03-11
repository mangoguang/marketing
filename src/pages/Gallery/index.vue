<template>
  <div class="index">
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
    TopNav
  },
  data() {
    return {
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.index {
  background: #fff;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  .top-bar {
    padding: 2vw 4vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    }
    .nav-right {
      flex: 0.77;
    }
  }
}
</style>

