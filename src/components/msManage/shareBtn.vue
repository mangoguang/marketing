<template>
  <div class="share">
    <!-- 这是分享 -->
    <img src="../../assets/imgs/more.png" alt class="moreImg" @click="shareBtn" />
    <div class="shareList" v-show="isShow">
      <span class="shareTitle">分享到</span>
      <ul class="iconList">
        <li v-for="(value,key) in list" :key="key" @click="shareTo(value.title)">
          <i class="icon">
            <img :src="value.image" alt />
          </i>
          <span v-cloak>{{value.name}}</span>
        </li>
        <li @click="shareTo('shoucang')">
          <i class="icon">
            <img :src="collectImg" alt />
          </i>
          <span v-cloak>{{collectionText}}</span>
        </li>
      </ul>
      <div class="cencer" @click="centerShare">
        <span>取消</span>
      </div>
    </div>
  </div>
</template>

<script>
import { IndexModel } from "../../utils/index";
import { mapState } from "vuex";
const indexModel = new IndexModel();
export default {
  props: ["collection", "sharetitle", "remark"],
  data() {
    return {
      isShow: false,
      articleId: "", //文章详情id
      account: "", //用户账号
      collectionText: "收藏", //收藏文本
      collectImg: "./static/images/shoucang.png", //收藏logo
      collectStatus: this.collection, //收藏状态
      pageUrl: "",
      list: [
        {
          name: "微信好友",
          title: "weixin",
          image: "./static/images/weixin.png"
        },
        {
          name: "微信朋友圈",
          title: "pengyouquan",
          image: "./static/images/pengyouquan.png"
        },
        // {
        //   name: "新浪微博",
        //   title: "weibo",
        //   image: "./static/images/weibo1.png"
        // },
        { name: "QQ好友", title: "QQ", image: "./static/images/QQ1.png" }
      ]
    };
  },
  created() {
    this.articleId = this.$route.query.articleId;
    // this.account = this._localAjax().account;
    console.log(this.articleId, this.account);
    // this.pageUrl ="https://mobiletest.derucci.net" +"/web/marketing/#/articleDetails?articleId=" +this.articleId +"&name=产品知识&musi=1";
    this.pageUrl = `https://mobiletest.derucci.net/web/marketing/#/articleDetails?articleId=${this.articleId}&musi=1`;
  },
  computed: {
    ...mapState({
      imgUrl: state => state.share.imgUrl
    })
  },
  mounted() {
    this.title = this.sharetitle;
  },
  methods: {
    
    shareBtn() {
      this.isShow = !this.isShow;
    },
    // 取消分享
    centerShare() {
      this.isShow = false;
    },
    //收藏
    collect() {
      let id = this.articleId;
      indexModel.collect(1, id, this.account).then(res => {
        console.log("res");
      });
    },
    //取消收藏
    cancelCollect() {
      let id = this.articleId;
      indexModel.remove(1, id, this.account).then(res => {
        console.log("canclecollect");
      });
    },
    // 分享的路径
    shareTo(path) {
      switch (path) {
        case "weixin":
          this.sharewx("session");
          // console.log(path);  
          this.isShow = false;
          break;
        case "pengyouquan":
          this.sharewx("timeline");
          // console.log(path);
          this.isShow = false;
          break;
        case "weibo":
          console.log(path);
          this.sharewb();
          this.isShow = false;
          break;
        case "QQ":
          // console.log(path);
          console.log(this.imgUrl);
          
          this.shareQQ();
          this.isShow = false;
          break;
        case "shoucang":
          this.collectStatus = !this.collectStatus;
          if (this.collectStatus) {
            this.collectImg = "./static/images/yishoucang.png";
            this.collectionText = "取消收藏";
            this.collect();
          } else {
            this.collectImg = "./static/images/shoucang.png";
            this.collectionText = "收藏";
            this.cancelCollect();
          }
          console.log(path);
          // this.isShow = false
          break;
      }
    },
    // 分享到微信
    sharewx(Vscene) {
      var wx = api.require("wx");
      // console.log(this.remark);

      wx.shareWebpage(
        {
          apiKey: "",
          scene: Vscene,
          title: this.sharetitle,
          description: this.remark,
          thumb: this.imgUrl,
          contentUrl: this.pageUrl
        },
        function(ret, err) {
          if (ret.status) {
            // alert("分享成功");
            // this.isShow = false;
          } else {
            // alert(err.code);
            alert("分享失败");
          }
        }
      );
    },
    // 分享到微博
    sharewb() {
      var weiboPlus = api.require("weiboPlus");
      weiboPlus.shareWebPage(
        {
          text: this.sharetitle,
          title: this.sharetitle,
          description: this.remark,
          thumb: this.imgUrl,
          contentUrl: this.pageUrl
        },
        function(ret, err) {
          if (ret.status) {
            // alert("分享成功");
            // this.isShow = false;
          } else {
            alert(err.code)
            alert("分享失败");
          }
        }
      );
    },
    // 分享到QQ
    shareQQ() {
      var qq = api.require("QQPlus");
      qq.shareNews(
        {
          url: this.pageUrl,
          title: this.sharetitle,
          description: this.remark,
          imgUrl: this.imgUrl,
          type: "QFriend"
        },
        function(ret, err) {
          if (ret.status) {
            // alert("分享成功");
            // this.isShow = false;
          } else {
            alert("分享失败");
          }
        }
      );
    }
  },
  watch: {
    //监听弹窗是否显示
    // shareStatus() {
    //   // this.getshareStatus()
    //   if (this.shareStatus) {
    //     this.isShow = true;
    //   }
    // },
    // 监听弹窗的显示条件
    isShow() {
      this.$emit("centerShare", false);
    },
    collection() {
      if (this.collection) {
        this.collectStatus = true;
        this.collectImg = "./static/images/yishoucang.png";
        this.collectionText = "取消收藏";
      }
    }
  }
};
</script>

<style lang="scss" scope>
.share {
  width: 24px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  .moreImg {
    width: 16px;
    height: 4px;
  }
  .shareList {
    position: fixed;
    width: 100%;
    // height: 270px;
    left: 0;
    bottom: 0;
    background: #fff;
    .shareTitle {
      display: inline-block;
      font-size: 16px;
      height: 49px;
      line-height: 49px;
      text-align: center;
      width: 100%;
    }
    .iconList {
      display: flex;
      flex-wrap: wrap;
      padding: 0 26px;
      margin-bottom: 58px;
      li {
        width: 25%;
        // height: 72px;
        // background: pink;
        margin-bottom: 20px;
        font-size: 12px;
        white-space: nowrap;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #2d2d2d;
        &:nth-child(5) {
          margin: 0;
        }
        .icon {
          width: 49px;
          height: 49px;
          display: inline-block;
          margin-bottom: 11px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .cencer {
      position: fixed;
      left: 0;
      bottom: 0;
      font-size: 16px;
      text-align: center;
      height: 50px;
      line-height: 50px;
      width: 100%;
      color: #2d2d2d;
      //   padding: 0 8px 0 8px;
      span {
        display: inline-block;
        width: 96%;
        height: 100%;
        border-top: 1px solid #e5e5e5;
      }
    }
  }
}
</style>