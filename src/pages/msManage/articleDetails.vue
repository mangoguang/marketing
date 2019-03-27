<template>
  <div class="article paddingTop">
    <banner :title="'文章详情'"/>
    <collect-btn class="collentBtn" 
        :collection='collection'
        v-on:touchend.native='changeCollectBtn'
        :style="{top: top}"
        />
    <div class="titleBar">
      <div class="title">{{ articleDetails.title }}</div>
      <span>{{ articleDetails.createTime }}</span>
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
      ajaxData: {},
      top: ''
    }
  },
  created() {
    this.articleId = this.$route.query.articleId
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    this.getArticleDetail()
    this.isIPhoneX()
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
      indexModel.collect(1, id, account).then(res => {
        console.log('res')
      })
    },
    //取消收藏
    cancelCollect() {
      let account = this.ajaxData.account
      let id = this.articleId
      indexModel.remove(1, id, account).then(res => {
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
      var u = navigator.userAgent;
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isIOS) {        
        if ((screen.height == 812 && screen.width == 375) || (screen.height == 896 && screen.width == 414)) {
          this.top = '11vw'
        }else{
          this.top = '6vw'
        } 
      }else{
        this.top = '6vw'
      }
    }
    
  }
}
</script>

<style lang="scss" scoped>
.article {
  padding: 4.26vw;
  text-align: center;
  padding-top: 22vw;
  position: relative;
  .collentBtn {
      position: fixed;
      right: 4.26vw;
      top: 0;
      z-index: 99;
    }
  .titleBar {
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
  }
  .content {
    text-align: left;
    word-wrap: break-word !important;
    h2,p {
      color: #363636;
      font-size: 3.73vw;
    }
    .img {
      width: 91.48vw;
      height: auto;
    }
  }
}
</style>
