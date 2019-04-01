<template>
  <div class="index">
    <Title :title="'首页'"/>
    <Search :origin="origin" :type='"msIndex"' class="search"/>
    <MSlider :list='list' class="slider"/>
    <category-list />
    <!-- <div class="entry">
      <router-link to="/gallery">
        <img src="../../assets/imgs/picentry.png" alt>
      </router-link>
      <span style="color: #666">营销助手图库</span>
    </div> -->
    <TopArt />
    <Footer/>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from "vuex";
import eggShare from "../../components/myApi/eggShare";
import eggScan from "../../components/myApi/eggScan";
import Footer from "../../components/Footer";
import Search from "../../components/msManage/search/eggSearchInp";
import Title from '../../components/title'
import MSlider from '../../components/Gallery/index/slider'
import TopArt from '../../components/msManage/index/topArt'
import CategoryList from '../../components/msManage/index/categoryList'
export default {
  components: { Footer, Search, eggShare, eggScan, Title, MSlider, TopArt, CategoryList },
  data() {
    return {
      origin: true,
      list: [{
        imgUrl: './static/images/bed0.png'
      }]
    };
  },
  created() {
    //图库的进入默认热门搜索
    this.setLeftNavList([])
    this.initListVal('慕思')
  },
  methods: {
    ...mapMutations(['setLeftNavList', 'initListVal'])
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
.entry {
  padding: 4vw;
  box-sizing: border-box;
  img {
    background: rgba(255, 45, 85, 1);
    width: 20vw;
    height: 20vw;
    display: block;
    border-radius: 2vw;
  }
}
</style>