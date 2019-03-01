<template>
  <div class="article paddingTop">
    <banner :title="'文章详情'"/>
    <div class="titleBar">
      <h1>{{ articleId }}</h1>
      <span>歌迪亚 2018.11.11</span>
      <collect-btn class="collentBtn" 
        :collection='collection'
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
      </div>
    </div>
  </div>
</template>

<script>
import {IndexModel} from '../../utils/index'
const indexModel = new IndexModel()
import {removeItem, addItem} from '../../utils/msManage'
import Banner from '../../components/banner'
import CollectBtn from '../../components/msManage/eggCollectBtn'
export default {
  components: {CollectBtn,Banner},
  data() {
    return {
      isBegin: true,
      articleId: '',
      collection: false
    }
  },
  created() {
    this.articleId = this.$route.query.articleId
    this.getArticleDetail()
  },
  methods: {
    //获取文章详情
    getArticleDetail() {
      // const id = this.articleId
      indexModel.getArticleDetail().then(res => {
        this.collection = res.collection
      })
    },
    //收藏
    collect() {
      let obj = {
        account: '11608050',      //获取账号
        type: 'article',
        articleId: this.articleId
      }
      indexModel.collect().then(res => {
        console.log('collect')
      })
    },
    //取消收藏
    cancelCollect() {
       let obj = {
        account: '11608050',      //获取账号
        type: 'article',
        articleId: this.articleId
      }
      indexModel.remove().then(res => {
        console.log('canclecollect')
      })
    },
    // 切换收藏按钮
    changeCollectBtn() {
      this.collection = !this.collection
      if(this.collection) {
        //收藏接口
        this.collect()
      }else {
        //移除收藏接口
        this.cancelCollect()
      }
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
