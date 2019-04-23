<template>
  <div class="home" :style="{'marginTop':`${marginTop}vw`}">
    <m-slider :list='list' class="slider"/>
    <ul class="cateList">
      <category  
        v-for="(item, index) in cateList"
        :key="index"
        :list="item"
        @click.native="toArt(index)"
        :bgColor="bgColor[index]"/>
    </ul>
    <Footer />
  </div>
</template>

<script>
import Footer from "../../components/Footer";
import MSlider from '../../components/Gallery/index/slider'
import category from '../../components/msManage/index/category'
import { mapMutations } from "vuex";
export default {
  components: { Footer, MSlider, category },
  data() {
    return {
      marginTop: '',
      list: [{
        imgUrl: './static/images/homeBanner.png'
      },{
        imgUrl: './static/images/homeBanner2.jpeg'
      },{
        imgUrl: './static/images/homeBanner3.jpeg'
      }],
      cateList: [{
        name: '图库',
        link: '/gallery',
        id: 0
      },{
        name: '金管家知识库',
        link: '/msManage',
        id: 1
      },{
        name: '学院知识库',
        link: '/msManage',
        id: 2
      }],
      bgColor: []
    }
  },
  mounted() {
    this.getBgColor()
  },
  created() {
    //图库的进入默认热门搜索
    this.setLeftNavList([])
    this.initListVal('慕思')
    this.isIPhoneX()
  },
  methods: {
    ...mapMutations(['setLeftNavList', 'initListVal']),
    toArt(index) {
      this.$router.push({
        path: this.cateList[index].link,
        query: {
          classify: this.cateList[index].id
        }})
    },
    //获取背景颜色
    getBgColor() {
      let len = this.cateList.length
      let arr = [];
      for(var i = 0; i < len; i ++) {
        if(i%4 === 0) {
          arr.push("#FF2D55")
        }else if(i%4 === 1) {
          arr.push("#FF964B")
        }else if(i%4 === 2) {
          arr.push("#FFCC00")
        }else if(i%4 === 3) {
          arr.push("#007AFF")
        }
      }
      this.bgColor = arr
    },
    isIPhoneX(){
      let phone = this.phoneSize()
      if(phone === 'iphonex') {
        this.marginTop = '-5.86'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  .slider {
    width: 100vw!important;
    height: 47.2vw!important;
  }
  .cateList {
    padding: 4vw 6.6vw;
    display: flex;
    overflow: scroll;
  }
}
</style>
