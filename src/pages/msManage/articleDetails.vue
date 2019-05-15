<template>
  <div class="article paddingTop">
    <banner :title="'文章详情'"/>
    <collect-btn class="collentBtn" 
        :collection='collection'
        v-on:touchend.native='changeCollectBtn'
        :style="{'top': top}"
        />
    <div class="titleBar">
      <div class="title">{{ articleDetails.title }}</div>
      <!-- <span>{{ articleDetails.createTime }}</span> -->
    </div>
    <div class="content" v-html="myhtml">
    </div>
  </div>
</template>

<script>
import {IndexModel} from '../../utils/index'
const indexModel = new IndexModel()
import {removeItem, addItem, b64DecodeUnicode, changeImgStyle, changeVedioStyle,waterMark} from '../../utils/msManage'
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
      top: '',
      account: ''
    }
  },
  created() {
    this.articleId = this.$route.query.articleId
    this.account = this._localAjax().account
    this.getArticleDetail()
    this.isIPhoneX()
  },
  mounted() {
    // var a = document.getElementsByTagName("html")
    // console.log(a)
    waterMark('.article');
    console.log(document.getElementsByTagName('embed'));
  },
  methods: {
    //获取文章详情
    getArticleDetail() {
      const id = this.articleId
      indexModel.getArticleDetail(id, this.account).then(res => {
        this.articleDetails = res.data
        if(res.data.remark) {
          let temp = res.data.remark
          this.myhtml = changeImgStyle(b64DecodeUnicode(temp))
          this.myhtml = changeVedioStyle(this.myhtml)
        }
        this.collection = res.data.collect
      })
    },
    //收藏
    collect() {
      let id = this.articleId
      indexModel.collect(1, id, this.account).then(res => {
        console.log('res')
      })
    },
    //取消收藏
    cancelCollect() {
      let id = this.articleId
      indexModel.remove(1, id, this.account).then(res => {
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
    //收藏的样式
    isIPhoneX (){
      let phone = this.phoneSize()
      if(phone === 'iphonex') {
        this.top = '11vw'
      }else if(phone === 'iphone') {
        this.top = '6vw'
      }else {
        this.top = '6vw'
      }
    }
    
  }
}
</script>

<style lang="scss" scoped>
.article {
  // padding: 4.26vw;
  text-align: center;
  padding-top: 20vw;
  position: relative;
  box-sizing: border-box;
  // width: 100vw;
  // overflow: hidden;

  .collentBtn {
      position: fixed;
      right: 4.26vw;
      top: 0;
      z-index: 99;
    }
  .titleBar {
    .title {
      color: #353535;
      font-size: 5.33vw;
      width: 80vw;
      text-align: center;
      margin: 0 auto;
      font-weight: bold;
      margin-bottom:1.4vw;
    }
    span {
      color: #909090;
      font-size: 3.73vw;
    }
  }
  .content {
    text-align: left;
    word-wrap: break-word !important;
    width: 100vw;
    overflow: hidden;
    padding: 4.26vw;
    box-sizing: border-box;
    h2,p {
      color: #363636;
      font-size: 3.73vw;
    }
  }
    
}
</style>
