<template>
  <div class="share"
       @touchmove.prevent>
    <div class="cont">
      <div class="bg"
           ref="saveImg">
        <div class="img">
          <img id="img"
               :src="src"
               alt="">
        </div>
        <div class="dec">

          <div class="title">
            <h2>{{detailData.brand}}</h2>
            <p>{{detailData.category}} </p>
          </div>
          <div class="qrcode"
               id="qrcode"></div>
        </div>
      </div>
      <div class="download"
           @click="bindSave">保存图片</div>
      <div class="share-btns">
        <h3>- 分享至 -</h3>
        <div class="btn">
          <img src="~@/assets/imgs/case/微信@2x.png"
               alt="微信"
               @click="bindShareWeixin('session')">
          <img src="~@/assets/imgs/case/朋友圈@2x.png"
               alt="朋友圈"
               @click="bindShareWeixin('timeline')">
          <!-- <img src="~@/assets/imgs/case/qq-(1)@2x.png"
               alt="qq">
          <img src="~@/assets/imgs/case/微博@2x.png"
               alt="微博"> -->
        </div>
      </div>
      <div class="close"
           @click="$emit('onCloseShare')"></div>
    </div>
  </div>
</template>
<script>
import html2canvas from 'html2canvas'
import QRCode from 'qrcodejs2'
import { uploadFile } from '@/api/case'
import { Toast } from 'mint-ui'
export default {
  props: {
    detailData: {}
  },
  data() {
    return {
      src: '',
      imgUrl: ''
    }
  },
  mounted() {
    new QRCode('qrcode', {
      width: 35,
      height: 35, // 高度
      text: `http://10.11.8.156:8080/#/detail?id=${this.$route.query.id}`,
      colorDark: '#000',
      colorLight: '#dcbf8a',
      correctLevel: QRCode.CorrectLevel.L,
      QRCodeVersion: 1
    })
  },
  watch: {
    detailData() {
      this._tobase64()
    }
  },
  methods: {
    async _tobase64() {
      let _this = this
      var canvas = document.createElement('canvas')
      var ctx = canvas.getContext('2d')
      var img = new Image()
      img.crossOrigin = 'Anonymous'
      img.src = this.detailData.frontImg
      img.onload = function() {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0, img.width, img.height)
        var dataURL = canvas.toDataURL('image/png')
        _this.src = dataURL
        canvas = null
      }
    },
    async bindSave() {
      var width = 258
      var height = 312
      let canvas = await html2canvas(this.$refs.saveImg, {
        backgroundColor: null,
        dpi: window.devicePixelRatio,
        width: width,
        height: height
      })
      var url = canvas.toDataURL()
      var arr = url.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      let imgFile = new File([u8arr], `img${new Date().getTime()}`, {
        type: mime
      })
      let formData = new FormData()
      formData.append('prefix', 'cert-check-log')
      formData.append('dataFile', imgFile)
      let res = await uploadFile(formData)
      this.imgUrl = res.url
      this._downloadFile(res.url)
    },
    _downloadFile(url) {
      var timestamp = new Date().getTime()
      api.download(
        {
          url,
          savePath: 'fs://album' + timestamp + '.jpg'
          // report: true,
          // cache: true,
          // allowResume: true
        },
        (ret, err) => {
          api.saveMediaToAlbum(
            {
              path: 'fs://album' + timestamp + '.jpg'
            },
            function(ret, err) {
              Toast('保存成功')
            }
          )
        }
      )
    },
    bindShareWeixin(scene) {
      let { detailData, imgUrl } = this
      var wx = api.require('wx')
      wx.shareWebpage(
        {
          apiKey: '',
          scene,
          title: detailData.brand + detailData.category,
          description: detailData.brand + detailData.category,
          thumb: imgUrl,
          contentUrl: 'https://op.derucci.com/web/marketingTest/#/'
        },
        function(ret, err) {
          if (ret.status) {
            alert('分享成功')
          } else {
            alert('分享失败')
          }
        }
      )
    }
  }
}
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
@mixin before-bg($width, $height, $url) {
  &::before {
    content: '';
    display: block;
    width: $width;
    height: $height;
    background: $url;
  }
}
.img {
  img {
    width: 248px;
    height: 302px;
  }
}
.dec {
  height: 90px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: url(~@/assets/imgs/case/share_bottom.jpg) center center / 248px
    80px no-repeat;
  display: flex;
  justify-content: space-between;
  padding: 0px 16px;
  border: none;

  .qrcode {
    width: 40px;
    height: 40px;
    background-color: #dcbf8a;
    margin-top: 27px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .title {
    color: #dcbf8a;
    font-size: 12px;
    margin-top: 27px;
    width: 164px;
    height: 45px;
    overflow: hidden;
    p,
    h2 {
      line-height: 15px;
      font-size: 12px;
    }
  }
}
.share {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  background: rgba(0, 0, 0, 0.9);
  .cont {
    overflow: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .share-btns {
    margin-bottom: 80px;
    h3 {
      text-align: center;
      color: #fff;
      font-size: 12px;
      line-height: 1;
      padding-bottom: 20px;
    }
    .btn {
      display: flex;
      justify-content: center;
      img {
        width: 42px;
        height: 42px;
        margin: 0 20px;
      }
    }
  }
  .close {
    width: 35px;
    height: 35px;
    background: url(~@/assets/imgs/case/关闭@2x.png) center center / contain
      no-repeat;
    margin: 0 auto;
  }
  .download {
    margin: 24px auto 70px auto;
    width: 106px;
    height: 34px;
    background: linear-gradient(0deg, rgba(21, 25, 34, 1), rgba(55, 58, 79, 1));
    border: 1px solid rgba(10, 11, 16, 1);
    box-shadow: 0px 3px 6px 0px rgba(18, 26, 41, 0.17),
      0px 1px 0px 0px rgba(255, 255, 255, 0.11);
    border-radius: 17px;
    font-size: 15px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    @include before-bg(
      24px,
      19px,
      url(~@/assets/imgs/case/下载@2x.png) left center / 19px 19px no-repeat
    );
  }
  .bg {
    width: 258px;
    height: 312px;
    background-color: #fff;
    position: relative;
    padding: 5px;
    margin: 0 auto;
  }
}
</style>