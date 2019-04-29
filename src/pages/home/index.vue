<template>
  <div class="home" :style="{paddingBottom:`${paddingBottom}vw`}">
    <div class="banner" :style="{'paddingTop':`${marginTop}vw`}">
      <img src="../../../static/images/home/logo.png" alt="">
    </div>
    <m-slider :list='list' class="slider" :myClass='"home"'/>
    <ul class="cateList">
      <router-link 
        :to="{path: item.link,
              query: {
                'classify': item.id
              }}"
        v-for="(item, index) in cateList"
        :key="index"
        tag="li"
        class="list"
        :style="{backgroundImage: `url(${item.image})`}"
      >
        <div class="title">
          <div class="Main-title">{{item.name}}</div>
          <div class="Pre-title">{{item.preName}}</div>
        </div>
      </router-link>
      <!-- <category  
        v-for="(item, index) in cateList"
        :key="index"
        :list="item"
        @click.native="toArt(index)"
        :bgColor="bgColor[index]"/> -->
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
      paddingBottom: '',
      list: [{
        imgUrl: './static/images/home/banner.png'
      },{
        imgUrl: './static/images/home/banner1.jpeg'
      },{
        imgUrl: './static/images/home/banner2.jpeg'
      },{
        imgUrl: './static/images/home/banner4.jpeg'
      }],
      cateList: [{
        name: '产品中心',
        preName: '快速深入了解慕思产品知识，巩固产品认识',
        link: '/gallery',
        id: 0,
        image: './static/images/home/tuku1.png'
      },{
        name: '商学院',
        preName: '-精英必备产品知识、卖点，销售技能、门店管理攻略',
        link: '/msManage',
        id: 2,
        image: './static/images/home/xueyuan1.png'
      },{
        name: '金管家服务',
        preName: '为客户提供方便、快捷、可靠的五星级服务',
        link: '/msManage',
        id: 1,
        image: './static/images/home/jinguanjia1.png'
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
      }else {
        this.paddingBottom = '14'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  box-sizing: border-box;
  .banner {
    width: 100%;
    height: 16.66vw;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    img {
      width: 13.86vw;
      height: 9.6vw;
      margin-bottom: 2vw;
    }
  }
  .slider {
    width: 100vw!important;
    height: 47.2vw!important;
  }
  .cateList {
    // overflow: scroll;
    box-sizing: border-box;
    .list {
      background-size: 100% 100%;
      width: 97.33vw;
      height: 40vw;
      margin: 0 auto;
      margin-top: 2vw;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
    } 
    .title {
      text-align: center;
      color:#fff;
      .Main-title{
        font-size: 6.4vw;
      }
      .Pre-title {
        font-size: 3.2vw
      }
    }
  }
}
</style>
