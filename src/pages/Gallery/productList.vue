<template>
  <div class="prodectList">
    <div class="topBar">
      <button class="cancle" @click="cancleBtn"></button>
      <Search :origin="true" :type="'gallery'" class="search"/>
    </div>
    <p-topNav />
    <div class="nav_function">
      排序
      切换列表
      筛选
      123123
    </div>
    <div>
      产品列表
    </div>
  </div>
</template>

<script>
import Search from "../../components/msManage/search/eggSearchInp";
import PTopNav from "../../components/Gallery/productList/pTopNav";
export default {
  components: {
    Search,
    PTopNav
  },
  data() {
    return{}
  },
  methods: {
    cancleBtn() {
      this.$router.go(-1)
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
}
</style>
