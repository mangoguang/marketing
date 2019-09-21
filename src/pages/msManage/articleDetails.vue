<template>
  <div class="article paddingTop">
    <Banner :title="'文章详情'" v-show="status"/>
    <!-- <collect-btn class="collentBtn"
                 :collection='collection'
                 v-on:touchend.native='changeCollectBtn'
    :style="{'top': top}" />-->
    <shareBtn
      v-show="status"
      class="shareBtn"
      :remark="articleDetails.keyWords"
      :sharetitle="articleDetails.title"
      :collection="collection"
      @centerShare="centerShare"
      :style="{'top': top}"
    />

    <div class="titleBar">
      <div class="title">
        <img v-show="logoImageUrl!==''" :src="logoImageUrl" />
        {{articleDetails.title}}
      </div>
      <!-- <span>{{ articleDetails.createTime }}</span> -->
      <div v-if="articleDetails.author" style="color:#909090;font-size:14px">
        作者：{{articleDetails.author}}&nbsp;&nbsp;
        <span
          v-if="articleDetails.createTime"
        >{{articleDetails.createTime.split(' ')[0].split('-').join('.')}}</span>
      </div>
    </div>
    <div class="content" v-html="myhtml" @click="showImage"></div>
  </div>
</template>

<script>
var fullscreen = function(elem) {
  var prefix = "webkit";
  if (elem[prefix + "EnterFullScreen"]) {
    return prefix + "EnterFullScreen";
  } else if (elem[prefix + "RequestFullScreen"]) {
    return prefix + "RequestFullScreen";
  }
  return false;
};
import { IndexModel } from "../../utils/index";
const indexModel = new IndexModel();
import {
  removeItem,
  addItem,
  b64DecodeUnicode,
  changeImgStyle,
  changeVedioStyle,
  waterMark
} from "../../utils/msManage";
import Banner from "../../components/banner";
import shareBtn from "../../components/msManage/shareBtn";
import CollectBtn from "../../components/msManage/eggCollectBtn";
import { mapMutations } from "vuex";
export default {
  components: { shareBtn, Banner },
  data() {
    return {
      isBegin: true,
      articleId: "",
      collection: false,
      myhtml: "",
      articleDetails: "",
      top: "",
      account: "",
      imgSrc: [],
      logoImageUrl: "",
      status: true
    };
  },
  created() {
    this.articleId = this.$route.query.articleId;
    // this.account = this._localAjax().account;
    this.getArticleDetail();
    this.isIPhoneX();
    this.sharePage()
  },
  mounted() {
    // var a = document.getElementsByTagName("html")
    // console.log(a)
    waterMark(".article", 1);
  },
  methods: {
    ...mapMutations(["setImgUrl"]),
    browser() {
      let flag;
      let sUserAgent = navigator.userAgent.toLowerCase();
      let bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
      let bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
      let bIsMidp = sUserAgent.match(/midp/i) == "midp";
      let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
      let bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
      let bIsAndroid = sUserAgent.match(/android/i) == "android";
      let bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
      let bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
      if (
        !(
          bIsIpad ||
          bIsIphoneOs ||
          bIsMidp ||
          bIsUc7 ||
          bIsUc ||
          bIsAndroid ||
          bIsCE ||
          bIsWM
        )
      ) {
        //alert('pc')
        flag = false;
      } else {
        //alert('phone')
        flag = true;
      }
      return flag;
    },
    showImage(e) {
      // if (e.target.nodeName.toLowerCase == 'video') {
      //   var fl = fullscreen(e.target)
      //   alert(fl)
      // }
      console.log(e.target.nodeName.toLowerCase());
      if (e.target.nodeName.toLowerCase() === "img") {
        console.log(e.target.src);
        if (this.imgSrc.length > 0) {
          let index = this.imgSrc.indexOf(e.target.src);
          if (index > -1) {
            console.log(index);
            let that = this;
            this.browser();
            /*   if(this.browser()){ */
            /*  var UIPhotoViewer=api.require('UIPhotoViewer');
                alert(UIPhotoViewer);
                UIPhotoViewer.open({
                    images: that.imgSrc,
                    bgColor: '#000',
                    activeIndex:index
                }, function(ret, err) {
                    if (ret) {
                        alert(JSON.stringify(ret));
                    } else {
                        alert(JSON.stringify(err));
                    }
                }); */
            /* } */
          } else {
            this.activeImg = 0;
          }
        }
      }
    },
    //获取文章详情
    getArticleDetail() {
      const id = this.articleId;
      indexModel.getArticleDetail(id).then(res => {
        this.articleDetails = res.data;
        this.logoImageUrl = res.data.logoImageUrl;
        this.setImgUrl(res.imageURL);
        if (res.data.remark) {
          let temp = res.data.remark;
          this.myhtml = changeImgStyle(b64DecodeUnicode(temp));
          this.myhtml = changeVedioStyle(this.myhtml);
          let imgReg = /<img.*?(?:>|\/>)/gi;
          let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
          let arr = this.myhtml.match(imgReg);
          if (arr) {
            for (let i = 0; i < arr.length; i++) {
              this.imgSrc.push(arr[i].match(srcReg)[1]);
            }
          }
        }
        this.collection = res.data.collect;
      });
    },
    // //收藏
    // collect() {
    //   let id = this.articleId;
    //   indexModel.collect(1, id, this.account).then(res => {
    //     console.log("res");
    //   });
    // },
    // //取消收藏
    // cancelCollect() {
    //   let id = this.articleId;
    //   indexModel.remove(1, id, this.account).then(res => {
    //     console.log("canclecollect");
    //   });
    // },
    // 切换收藏按钮
    // changeCollectBtn() {
    //   this.collection = !this.collection;
    //   if (this.collection) {
    //     //收藏接口
    //     this.collect();
    //   } else {
    //     //移除收藏接口
    //     this.cancelCollect();
    //   }
    // },
    // 判断是否是分享页面
    sharePage() {
      let url = window.location.href;

      if (url.indexOf("musi") === -1) {
      } else {
        this.status = false;
      }
    },
    //分享的样式
    isIPhoneX() {
      let phone = this.phoneSize();
      if (phone === "iphonex") {
        this.top = "11vw";
      } else if (phone === "iphone") {
        this.top = "6vw";
      } else {
        this.top = "6vw";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.article {
  // padding: 4.26vw;
  text-align: center;
  padding-top: 20vw;
  position: relative;
  box-sizing: border-box;
  min-height: 100vh;
  // width: 100vw;
  // overflow: hidden;

  .collentBtn {
    position: fixed;
    right: 4.26vw;
    top: 0;
    z-index: 99;
  }
  .shareBtn {
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
      margin-bottom: 1.4vw;
      img {
        display: inline-block;
        width: 4.8vw;
        height: 4.8vw;
        // background: red;
        vertical-align: -3px;
        margin-right: 2px;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 4.8vw 4.8vw;
      }
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
    h2,
    p {
      color: #363636;
      font-size: 3.73vw;
    }
  }
}
</style>
