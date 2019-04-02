<template>
  <div class="index">
    <banner :title="'慕思金管家'"/>
    <Search :origin="origin" :type='"msIndex"' class="search"/>
    <MSlider :list='list' class="slider"/>
    <category-list />
    <TopArt />
    <!-- <Footer/> -->
  </div>
</template>

<script>
import axios from 'axios'
import eggShare from "../../components/myApi/eggShare";
import eggScan from "../../components/myApi/eggScan";
import Footer from "../../components/Footer";
import Search from "../../components/msManage/search/eggSearchInp";
import banner from '../../components/banner'
import MSlider from '../../components/Gallery/index/slider'
import TopArt from '../../components/msManage/index/topArt'
import CategoryList from '../../components/msManage/index/categoryList'
export default {
  components: { Footer, Search, eggShare, eggScan, banner, MSlider, TopArt, CategoryList },
  data() {
    return {
      origin: true,
      list: [{
        imgUrl: './static/images/bed0.png'
      }]
    };
  }
};
</script>

<style lang="scss" scoped>
.index {
  max-height: 100vh;
  overflow: scroll;
}
.search {
  margin-top: 20vw !important;
}
.slider {
  width: 100vw!important;
  height: 37.33vw!important;
}
</style>