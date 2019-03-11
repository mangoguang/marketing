<template>
  <div class="article paddingTop">
    <banner :title="'文章详情'"/>
    <div class="titleBar">
      <div class="title">{{ articleDetails.title }}</div>
      <span>{{ articleDetails.createTime }}</span>
      <collect-btn class="collentBtn" 
        :collection='collection'
        v-on:click.native='changeCollectBtn'/>
    </div>
    <div class="content" v-html="myhtml">
    </div>
  </div>
</template>

<script>
import {IndexModel} from '../../utils/index'
const indexModel = new IndexModel()
import {removeItem, addItem, b64DecodeUnicode, changeImgStyle} from '../../utils/msManage'
import Banner from '../../components/banner'
import CollectBtn from '../../components/msManage/eggCollectBtn'
export default {
  components: {CollectBtn,Banner},
  data() {
    return {
      isBegin: true,
      articleId: '',
      collection: false,
      myhtml: '',
      articleDetails: '',
      ajaxData: {}
    }
  },
  created() {
    this.articleId = this.$route.query.articleId
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    this.getArticleDetail()
  },
  methods: {
    //获取文章详情
    getArticleDetail() {
      const id = this.articleId
      const account = this.ajaxData.account
      indexModel.getArticleDetail(id, account).then(res => {
        this.articleDetails = res.data
        if(res.data.remark) {
          let temp = res.data.remark
          this.myhtml = changeImgStyle(b64DecodeUnicode(temp))
        }
        this.collection = res.data.collect
      })
    },
    //收藏
    collect() {
      let account = this.ajaxData.account
      let id = this.articleId
      indexModel.articleCollect(id, account).then(res => {
        console.log('res')
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
    .title {
      color: #353535;
      font-size: 4.53vw;
      width: 50vw;
      text-align: center;
      margin: 0 auto;
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
