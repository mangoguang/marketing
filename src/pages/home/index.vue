<template>
  <div class="home" :style="{paddingBottom:`${paddingBottom}vw`}">
    <div class="banner" :style="{'paddingTop':`${marginTop}vw`}">
      <img src="../../../static/images/home/logo.png" alt="">
    </div>
    <m-slider :list='list' class="slider" :myClass='"home"' @click.native="goNext"/>
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
        @click.native="getFlow(item.id)"
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
import {IndexModel} from '../../utils/index'
const indexModel = new IndexModel()
import Footer from "../../components/Footer";
import MSlider from '../../components/Gallery/index/slider'
import category from '../../components/msManage/index/category'
import {checkLogin} from '../../utils/token/toLogin'
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
        imgUrl: './static/images/home/jinguanjia2.jpeg'
      }],
      cateList: [{
        name: '产品中心',
        preName: '快速深入了解慕思产品知识，巩固产品认识',
        link: '/gallery',
        id: 0,
        image: './static/images/home/tuku1.png'
      },{
        name: '网络商学院',
        preName: '精英必备产品知识、卖点，销售技能、门店管理攻略',
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
    checkLogin()
    //图库的进入默认热门搜索
    this.setLeftNavList([])
    this.initListVal('慕思')
    this.isIPhoneX()
    this.getImgList()
  },
  methods: {
    ...mapMutations(['setLeftNavList', 'initListVal']),
     //获取首页轮播图
    getImgList() {
      indexModel.getIndexSlider(0).then(res => {
        if(res.data && res.data.length) {
          this.list = res.data
        }
      })
    },
    // 获取流量信息
    getFlow(id){
      console.log(id);
      
    },
    toArt(index) {
      this.$router.push({
        path: this.cateList[index].link,
        query: {
          classify: this.cateList[index].id
        }})
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
      if(this.list && this.list[index].url) {
        let url = this.list[index].url
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
