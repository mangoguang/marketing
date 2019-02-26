<template>
  <div class="article paddingTop">
    <banner :title="'文章详情'"/>
    <div class="titleBar">
      <h1>{{ title }}</h1>
      <span>歌迪亚 2018.11.11</span>
      <collect-btn class="collentBtn" 
        :isCollect='isCollect'
        v-on:click.native='changeCollectBtn'/>
    </div>
    <div class="content">
      <h2>  (一)床垫的主要介绍</h2>
      <p>1.一线弹簧</p>
      <img src="../../assets/imgs/article_search.png" class="img">
      <div class="m-video">
        <div class="video_wrapper" @click="beginPlay" v-if="isBegin">
          <img src="../../assets/imgs/play.png" >
        </div>
        <video src=""></video>
      </div>
    </div>
  </div>
</template>

<script>
import Vuex, { mapMutations, mapState } from 'vuex'
import {removeItem, addItem} from '../../utils/msManage'
import Banner from '../../components/banner'
import CollectBtn from '../../components/msManage/eggCollectBtn'
export default {
  components: {CollectBtn,Banner},
  data() {
    return {
      isCollect: true,
      isBegin: true,
      title: ''
    }
  },
  computed: {
    ...mapState({
      collectArtList: state => state.collectArt.collectArtList
    })
  },
  created() {
    this.title = this.$route.query.articleId
  },
  methods: {
    ...mapMutations(['setCollectArtList']),
    // 切换收藏按钮
    changeCollectBtn() {
      this.isCollect = !this.isCollect
      if(!this.isCollect) {
        //收藏接口
        this.collect(this.collectArtList, this.title)
      }else {
        //移除收藏接口
        this.cancelCollect(this.collectArtList, this.title)
      }
    },
    //点击收藏
    collect(temp, title) {
      if(!temp.length) {
        this.setCollectArtList([title])
      }else {
        temp = addItem(temp, title)
        this.setCollectArtList(temp)
      }
    },
    //取消收藏
    cancelCollect(temp, title) {
      temp = removeItem(temp, title)
      this.setCollectArtList(temp)
    },
    //开始播放
    beginPlay() {
      this.isBegin = false
    }
    // console.log(123,this.titleList);
    //  //获取收藏列表文章路由"/collectList"传过来的文章articleId
    // console.log(this.$route.params.articleId);
  }
}
</script>

<style lang="scss" scoped>
.article {
  padding: 4.26vw;
  text-align: center;
  padding-top: 22vw;
  .titleBar {
    position: relative;
    h1 {
      color: #353535;
      font-size: 4.53vw;
    }
    span {
      color: #909090;
      font-size: 3.73vw;
    }
    .collentBtn {
      position: absolute;
      right: 0;
      top: 0
    }
  }
  .content {
    text-align: left;
    h2,p {
      color: #363636;
      font-size: 3.73vw;
    }
    .img {
      width: 91.48vw;
      height: auto;
    }
    .m-video {
      position: relative;
      height: 50vw;
      width: 91.48vw;
      .video_wrapper {
        z-index: 99;
        width: 91.48vw;
        height: 50vw;
        position: absolute;
        top: 0;
        left: 0;
        background: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 15.46vw;
          height: 15.46vw;
        }
      }
      video {
        height: 50vw;
        width: 91.48vw;
      }
    }
  }
}
</style>
