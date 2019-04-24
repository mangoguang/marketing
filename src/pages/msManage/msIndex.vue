<template>
  <div class="index">
    <banner :title="title"/>
    <Search :origin="origin" :type='"msIndex"' class="search"/>
    <MSlider :list='list' class="slider"/>
    <category-list :classify='$route.query.classify'/>
    <TopArt />
    <!-- <Footer/> -->
  </div>
</template>

<script>
import {IndexModel} from '../../utils/index'
const indexModel = new IndexModel()
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
        imgUrl: './static/images/home/banner.png'
      }],
      title: ''
    };
  },
  created() {
    this.title = (this.$route.query.classify == 1)? '慕思金管家' : '学院'
    this.getImgList()
  },
  methods: {
    //获取首页轮播图
    getImgList() {
      let classify = this.$route.query.classify
      indexModel.getIndexSlider(classify).then(res => {
        if(res.data && res.data.length) {
          this.list = res.data
        }
      })
    }
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
  height: 47.2vw!important;
}
</style>