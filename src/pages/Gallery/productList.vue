<template>
  <div class="prodectList">
    <div class="topBar">
      <button class="cancle" @click="backBtn"></button>
      <Search :origin="true" :type="'gallery'" class="search"/>
    </div>
    <p-topNav />
    <div class="nav_function">
      <sort-list  class="sortList"/>
      <div class="changeStyle" @click="changStyle">
        <img src="../../assets/imgs/waterfall.png" alt="瀑布流" v-if="type">
        <img src="../../assets/imgs/listStyle.png" alt="列表" v-else>
      </div>
      <m-filter />
    </div>
    <div>
      产品列表
    </div>
  </div>
</template>

<script>
import Search from "../../components/msManage/search/eggSearchInp";
import PTopNav from "../../components/Gallery/productList/pTopNav";
import SortList from '../../components/Gallery/productList/sortList';
import MFilter from '../../components/Gallery/productList/filter';
export default {
  components: {
    Search,
    PTopNav,
    SortList,
    MFilter
  },
  data() {
    return{
      key: true,
      type: true
    }
  },
  methods: {
    backBtn() {
      this.$router.go(-1)
    },
    //切换展示模式
    changStyle() {
      if(this.key) {
        this.key = false
        setTimeout(() => {
          this.type = !this.type
          this.key = true
        }, 200);
      }
      console.log(this.type)
    }
  }
}
</script>

<style lang="scss" scoped>
.prodectList {
  width: 100vw;
  min-height: 100vh;
  background: #fff;
  .topBar {
    padding: 2vw 4vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .cancle {
      background: url(../../assets/imgs/back.png) no-repeat center;
      background-size: contain;
      width: 2.66vw;
      height: 4.8vw;
      padding-right: 6vw;
    }
    .search {
      width: 78.66vw;
      margin-left: 2vw;
    }
  }
  .nav_function {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 10.6vw;
    .sortList {
      flex: 0.94;
    }
    .changeStyle {
        // padding-top: 1vw;
      img {
        width: 3.46vw;
        height: 3.46vw;
      }
    }
  }
}
</style>
