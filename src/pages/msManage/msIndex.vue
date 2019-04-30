<template>
  <div class="index">
    <banner :title="title"/>
    <Search :origin="origin" :type='"msIndex"' class="searchTop"/>
    <MSlider :list='list' class="slider" :myClass='"msManage"' @click.native="goNext"/>
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
      list: [],
      list1: [{
        imgUrl: './static/images/home/jinguanjia2.jpeg'
      }],
      list2: [{
        imgUrl: './static/images/home/banner1.jpeg'
      }],
      title: ''
    };
  },
  created() {
    this.list = (this.$route.query.classify == 1)? this.list1 : this.list2
    this.title = (this.$route.query.classify == 1)? '金管家服务' : '商学院'
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
    },
     //判断系统并打开外部链接
    judgeSystem(url) {
      // 判断操作系统
      if(api.systemType == 'android'){
          //Android中的使用方法如下：
        api.openApp({
            androidPkg: 'android.intent.action.VIEW',
            mimeType: 'text/html',
            url: url
        }, function(ret, err) {
          if(err) {alert('链接错误')}
        });
      }else{
        //iOS中的使用方法如下：
        api.openApp({
            iosUrl: url
        },function(ret, err) {
          if(err) {alert('链接错误')}
        });
      } 
    },
      //判断是外部链接还是内部id
    isHttps(url) {
      let result = url.indexOf('https') == '-1' ? 'id' : 'https'
      return result
    },
    //轮播图跳转到活动
    goNext(e) {
      let dom = e.target
      let className = dom.className.toLowerCase();
      if (className != "mint-swipe-item is-active") {
        return false;
      }
      let index = dom.getAttribute("data-type");
      if(this.imgSliderList && this.imgSliderList[index].url) {
        let url = this.imgSliderList[index].url
        let type = this.isHttps(url)
        if(type === 'id') {
           if(/^[0-9]+$/.test(url)) {
            this.$router.push({path:'/articleDetails',query: {articleId: url}})
          }else {
            alert('链接错误')
          }
        }else if(type === 'https') {
          this.judgeSystem(url)
        }
      }else {
        alert('没有相应的链接')
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
  max-height: 100vh;
  overflow: scroll;
  background: #fff;
}
.searchTop {
  margin-top: 20vw !important;
}
.slider {
  width: 100vw!important;
  height: 47.2vw!important;
}
</style>