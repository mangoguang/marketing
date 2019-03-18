<template>
  <div class="share">
    <div class="canvas">
      <Banner :title="'产品分享'"/>
      <img :src="imgUrl" alt="">
      <div class="content">
        <img src="../../assets/imgs/share_bottom.png" alt="">
        <div class="msg">
          <p class="title">{{msg.title}}</p>
          <span class="price">¥{{msg.price}}</span>
          <div class="qrscan"></div>
        </div>
      </div>
    </div>
    <div class="save">
      <img src="../../assets/imgs/download.png" alt="">
      <span>保存图片</span>
    </div>
    <m-share  v-for="(item, index) in list" :key='index' :list='item' @touchend.native='shareBtn(index)'/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Banner from '../../components/banner'
import MShare from '../../components/Gallery/productDetails/productShare'
export default {
  components: { MShare,Banner },
  data() {
    return {
      msg: {},
      list: [{
        name: '分享给微信好友',
        imgUrl: './static/images/session.png'
      },{
        name: '分享到微信朋友圈',
        imgUrl: './static/images/timeline.png'
      },{
        name: '分享给QQ好友',
        imgUrl: './static/images/qq.png'
      },{
        name: '分享到微博',
        imgUrl: './static/images/weibo.png'
      }]
    }
  },
  computed: {
    ...mapState({
      imgUrl: state => state.share.imgUrl
    })
  },
  created() {
    this.msg = this.$route.query.msg
  },
  watch: {
    imgUrl() {
      console.log(this.imgUrl)
    }
  },
  methods: {
    imgTogether (url, callback) {
        var canvas = document.createElement('canvas');
        var size = 180;
        canvas.width = size;
        canvas.height = size;
        var context = canvas.getContext('2d');
        // 这是上传图像
        var imgUpload = new Image();
        imgUpload.onload = function () {
            // 绘制
            context.drawImage(imgUpload, 0, 0, size, size, 0,0, size, size);
            // 再次绘制
            context.drawImage(eleImgCover, 0, 0, size, size, 0,0, size, size);
            // 回调
            callback(canvas.toDataURL('image/png'));
        };
        imgUpload.src = url;
    },
    shareBtn (index) {
      console.log(index)
    }
  } 
  
}
</script>

<style lang="scss" scoped>
.share {
  width: 100vw;
  height: 100vh;
  background: #ededed;
  padding-top: 25.33vw;
  box-sizing: border-box;
  .canvas {
    margin: 0 auto;
    width: 61.33vw;
    img {
      width: 61.33vw;
      height: auto;
    }
    .content {
      margin-top: -10vw;
      position: relative;
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
        .qrscan {
          position: absolute;
          right: 3vw;
          width: 9.33vw;
          height: 9.33vw;
          top: 7.3vw;
          border: 1px solid #dcbf8a
        }
      }
    }
  }
  .save {
    background:linear-gradient(0deg,rgba(21,25,34,1),rgba(55,58,79,1));
    border:1px solid rgba(10,11,16,1);
    box-shadow:0px 0.8vw 1.6vw 0px rgba(18,26,41,0.17), 0px 2px 0px 0px rgba(255,255,255,0.11);
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
      height: auto;;
    }
    span {
      color: #fff;
      font-weight: 500;
      font-size: 4vw;
    }
  }
}
</style>


