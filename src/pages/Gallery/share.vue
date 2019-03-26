<template>
  <div class="share">
    <Banner :title="'产品分享'"/>
    <div class="saveTips" v-show="successSave">保存成功</div>
    <div class="canvas" ref="creatImg">
      <img :src="imgUrl" alt>
      <div class="content">
        <img src="../../assets/imgs/share_bottom.png" alt>
        <div class="msg">
          <p class="title">{{msg.title}}</p>
          <span class="price">¥{{msg.price}}</span>
          <div id="qrcode"></div>
        </div>
      </div>
    </div>
    <div class="save" @click="saveImg">
      <img src="../../assets/imgs/download.png" alt>
      <span>保存图片</span>
    </div>
    <m-share
      v-for="(item, index) in list"
      :key="index"
      :list="item"
      @touchend.native="shareBtn(index)"
    />
  </div>
</template>

<script>
import axios from "axios";
import QRCode from "qrcodejs2";
import html2canvas from "html2canvas";
import { mapState } from "vuex";
import Banner from "../../components/banner";
import MShare from "../../components/Gallery/productDetails/productShare";
export default {
  components: { MShare, Banner },
  data() {
    return {
      msg: {},
      list: [
        {
          name: "分享给微信好友",
          imgUrl: "./static/images/session.png"
        },
        {
          name: "分享到微信朋友圈",
          imgUrl: "./static/images/timeline.png"
        },
        {
          name: "分享给QQ好友",
          imgUrl: "./static/images/qq.png"
        },
        {
          name: "分享到微博",
          imgUrl: "./static/images/weibo.png"
        }
      ],
      url: "",
      loadImgUrl: "",
      successSave: false,
      imageData: ''
    };
  },
  computed: {
    ...mapState({
      imgUrl: state => state.share.imgUrl
    })
  },
  created() {
    this.msg = this.$route.query.msg;
  },
  watch: {
    imgUrl() {
      console.log(this.imgUrl);
    }
  },
  mounted() {
    this.getCode();
  },
  methods: {
    //生成二维码
    getCode() {
      let qrcode = new QRCode("qrcode", {
        width: 48,
        height: 48, // 高度
        text:
          "https://derucci.net/web/marketing/#/productDetails?id=1100231733594095620", // 二维码内容
        colorDark: "#000",
        colorLight: "#fff",
        correctLevel: QRCode.CorrectLevel.L,
        QRCodeVersion: 8
      });
    },
    //点击保存图片
    saveImg() {
      html2canvas(this.$refs.creatImg, {
        backgroundColor: null
      }).then(canvas => {
        this.url = canvas.toDataURL();
        this.postImage();
      });
    },
    //base64转成formdata形式上传
    changeFormData() {
      let bytes = window.atob(this.url.split(",")[1]);
      let temp = new ArrayBuffer(bytes.length);
      let ia = new Uint8Array(temp);
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i); 
      }
      //Blob对象
      let blob = new Blob([temp], { type: "image/jpeg" }); //type为图片的格式
      //FormData对象
      this.imageData = new FormData();
      this.imageData.append("dataFile", blob, Date.now() + ".jpg");
    },
    //上传图片获取图片地址
    postImage() {
      this.changeFormData()
      if(this.imageData) {
        this.getImgUrl()
      }
    },
    //请求服务器图片路径
    getImgUrl() {
       axios.post("http://10.11.8.229/upload/file", this.imageData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          this.loadImgUrl = res.data.url;
          this.savePicture();
        });
    },
    //保存图片
    savePicture() {
      var timestamp = new Date().getTime();
      api.download(
        {
          url: this.loadImgUrl,
          savePath: "fs://album" + timestamp + ".jpg"
          // report: true,
          // cache: true,
          // allowResume: true
        },
        (ret, err) => {
          if (ret) {
            this.showTips()
          }
          api.saveMediaToAlbum(
            {
              path: "fs://album" + timestamp + ".jpg"
            },
            function(ret, err) {}
          );
        }
      );
    },
    //出现保存成功提示
    showTips() {
      this.successSave = true
      setTimeout(() => {
        this.successSave = false;
      }, 1500);
    },
    shareBtn(index) {
      console.log(index)
      switch (index) {
        case 0: 
        this.shareWeixin('session',this.msg.title);
        break;
        case 1: 
        this.shareWeixin('timeline', this.msg.title);
        break;
        case 2: 
        this.shareQQ(this.msg.title);
        break;
        case 3:
        this.shareWeibo(this.msg.title);
        break
      }
    },
    qqsharetext() {
      var qq = api.require('qq');
      qq.shareText({
          text: 'testtext'
      });
    },
    //微信和朋友圈
     shareWeixin(Vscene,title) {
      //  var weiXin = api.require('weiXin');
        var wx = api.require('wx');
        wx.shareWebpage({
            apiKey: '',
            scene: Vscene,
            title: title,
            description: '分享网页的描述',
            thumb: 'widget://static/images/bed0.png',
            contentUrl: 'http://www.baidu.com'
        }, function(ret, err) {
            if (ret.status) {
                alert(JSON.stringify(ret))
            } else {
                alert(JSON.stringify(err))
            }
        });
    },
    shareQQ(title) {
      var qq = api.require('qq');
      qq.shareNews({
          url: 'http://www.baidu.com',
          title: title,
          description: '描述',
          imgUrl: './static/bed0.png',
          type:'QFriend'
      });
    },
    shareWeibo(title) {
      var sinaWeiBo = api.require('sinaWeiBo');
      sinaWeiBo.sendRequest({
          contentType: 'web_page',
          text: 'http://www.apicloud.com',
          media: {
              title: title,
              description: '多媒体描述',
              webpageUrl: 'http://v.ku6.com/show/ZgeIWrUgvfSuDN_fl_qNsQ...html'
          }
      }, function(ret, err) {
          if (ret.status) {
              api.alert({
                  title: '发表微博',
                  msg: '发表成功',
                  buttons: ['确定']
              });
          } else {
              api.alert({
                  title: '发表失败',
                  msg: err.msg,
                  buttons: ['确定']
              });
          }
      });
  }
  }
};
</script>

<style lang="scss" scoped>
.share {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #ededed;
  padding-top: 25.33vw;
  box-sizing: border-box;
  .saveTips {
    width: 100vw;
    line-height: 9.06vw;
    background: rgba(76, 217, 100, 0.7);
    color: #136f23;
    font-size: 3.46vw;
    position: absolute;
    top: 22vw;
    left: 0;
    text-align: center;
    z-index: 10;
  }
  .canvas {
    margin: 0 auto;
    width: 61.33vw;
    box-sizing: border-box;
    position: relative;
    img {
      width: 61.33vw;
      height: auto;
    }
    .content {
      margin-top: -10vw;
      position: relative;
      height: 21vw;
      img {
        width: 100%;
        height: auto;
      }
      .msg {
        color: #dcbf8a;
        font-size: 3.2vw;
        .title {
          top: 5.3vw;
          left: 3vw;
          position: absolute;
          width: 40.66vw;
          line-height: 1.2em;
        }
        .price {
          position: absolute;
          font-weight: bold;
          font-size: 4vw;
          top: 12vw;
          left: 3vw;
        }
        #qrcode {
          position: absolute;
          right: 2vw;
          top: 4.3vw;
          padding: 1vw;
          // box-sizing: border-box;
          background: #fff;
        }
        /*生成的二维码里面的img标签宽高自适应*/
      }
    }
  }
  .save {
    background: linear-gradient(0deg, rgba(21, 25, 34, 1), rgba(55, 58, 79, 1));
    border: 1px solid rgba(10, 11, 16, 1);
    box-shadow: 0px 0.8vw 1.6vw 0px rgba(18, 26, 41, 0.17),
      0px 2px 0px 0px rgba(255, 255, 255, 0.11);
    border-radius: 4.53vw;
    width: 28.26vw;
    height: 9.06vw;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 2vw;
    box-sizing: border-box;
    margin: 2vw auto;
    margin-bottom: 4vw;
    img {
      width: 5.06vw;
      height: auto;
    }
    span {
      color: #fff;
      font-weight: 500;
      font-size: 4vw;
    }
  }
}
</style>


