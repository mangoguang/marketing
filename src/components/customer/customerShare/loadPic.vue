<template>
  <div id="demo">
    <!-- 遮罩层 -->
    <div class="container" v-show="panel">
      <div>
        <img id="image" :src="url" alt="Picture">
      </div>
      <button type="button" id="button1" @click="crop">确定</button>
      <button type="button" id="button2" @click="cancle">取消</button>
      <button type="button" id="button3" @click="turnBack">还原</button>
    </div>
    <div class="hasPic" v-show="hasImgStatus">
      <div id="has_header">
        <div id="backicon" @click="backTo"></div>
        <div class="has_text">编辑头像</div>
        <div class="more" @click="loadMore"></div>
      </div>
      <div id="has_Img">
        <img :src="headerImage" alt="">
      </div>
    </div>
    <div @click="changeImg">
      <div >
        <input type="file" id="change" accept="image" @change="change" ref="file" name='dataFile'>
        <label for="change">
          <div class="show">
            <div class="picture" :style="'backgroundImage:url('+headerImage+')'"></div>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>
 
<script>
import {mapState,mapMutations} from 'vuex'
import Cropper from "cropperjs";
export default {
  props: ['select','customerImage'],
  components: {},
  data() {
    return {
      headerImage: "", //头像
      picValue: "",
      cropper: "",
      croppable: false,
      panel: false, //遮罩层
      url: "",
      hasImgStatus: false,
      selectStatus: '',
      imageData:''
    };
  },
  watch: {
    customerImage() {
      this.headerImage = this.customerImage
    }
  },
  computed: {
    ...mapState({
      upLoadUrl: state => state.loadImgUrl.upLoadUrl
    })
  },
  mounted() {
    //初始化这个裁剪框
    this.selectStatus = this.select
    if(this.customerImage) {
      this.headerImage = this.customerImage
    }
    var self = this;
    var image = document.getElementById("image");
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      // viewMode: 1,
      background: false,
      zoomable: true,
      center: false,
      guides: false,
      ready: function() {
        self.croppable = true;
      }
    });

     if(this.upLoadUrl) {
       console.log('hasurl')
      this.headerImage = this.upLoadUrl
      this.selectStatus = false
      // this.hasImgStatus = true
    }
  },
  methods: {
    ...mapMutations(['setUpLoadUrl']),
    //截取图片 blob地址
    getObjectURL(file) {
      var url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    //头部点击出现上传
    loadMore() {
      this.selectStatus = true
      this.$refs.file.click()
    },
    //头部后退
    backTo() {
      this.hasImgStatus = false 
      this.selectStatus = false
    },
    //判断是否出现上传
    changeImg(e) {
      if(!this.selectStatus) {
        e.preventDefault();
        this.hasImgStatus = true
      }
    },
    //上传图片
    change(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.hasImgStatus = false
      this.panel = true;
      this.picValue = files[0];
      this.url = this.getObjectURL(this.picValue);
      //每次替换图片要重新得到新的url
      if (this.cropper) {
        this.cropper.replace(this.url);
      }
    },
    //确定
    crop() {
      this.panel = false;
      //出现编辑头像顶部条
      this.selectStatus = false
      var croppedCanvas;
      var roundedCanvas;
      if (!this.croppable) {
        return;
      }
      // Crop
      croppedCanvas = this.cropper.getCroppedCanvas();
      // console.log(111,croppedCanvas)
      // Round
      roundedCanvas = this.getRoundedCanvas(croppedCanvas);
      this.headerImage = roundedCanvas.toDataURL();
      this.setUpLoadUrl(this.headerImage)
      // console.log(this.headerImage)
      //上传图片
      this.$refs.file.value = "";
    },
    //取消
    cancle() {
      this.$refs.file.value = "";
      this.panel = false;
      if(this.headerImage) {
        this.selectStatus = false
      }
    },
    //还原
    turnBack() {
      this.cropper.reset();
    },
    //绘制canvas
    getRoundedCanvas(sourceCanvas) {
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      var width = sourceCanvas.width;
      var height = sourceCanvas.height;
      canvas.width = width;
      canvas.height = height;
      context.imageSmoothingEnabled = true;
      context.drawImage(sourceCanvas, 0, 0, width, height);
      context.globalCompositeOperation = "destination-in";
      context.beginPath();
      // context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
      context.fill();

      return canvas;
    }
  }
};
</script>
 
<style >
* {
  margin: 0;
  padding: 0;
}
.hasPic {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  background: #000;
  z-index: 99;
  overflow: hidden;
}
#has_header {
  display: flex;
  justify-content: space-between;
  padding: 9vw 4.26vw;
  color: #fff;
  font-size: 5.06vw;
  font-weight: bold;
  align-items: center;
}
#backicon {
  background: url(../../../assets/imgs/backicon.png) no-repeat center;
  background-size: 100% 100%;
  width: 2.66vw;
  height: 4.66vw;
}
.more {
  background: url(../../../assets/imgs/loadmore.png) no-repeat center;
  background-size: 100% 100%;
  width: 4.26vw;
  height: 4.06vw;
}
#has_Img{
  width: 100vw;
  height: 100vw;
}
#has_Img img{
  width: 100%;
  height: 100%;
}

#change {
  display: none;
  /* opacity: 0; */
}
 button {
    margin: 0;
    padding: 0;
    border: 1px solid transparent; 
    outline: none;
}
#demo #button1 {
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 80px;
  height: 40px;
  border: none;
  background: #000;
  color: #fff;
  font-weight: 500;
  font-size: 4.26vw;
}
#demo #button2 {
  position: absolute;
  left: 10px;
  bottom: 10px;
  width: 80px;
  height: 40px;
  border: none;
  background: #000;
  color: #fff;
  font-weight: 500;
  font-size: 4.26vw;
}
#demo #button3 {
  position: absolute;
  left: 40%;
  bottom: 10px;
  width: 80px;
  height: 40px;
  border: none;
  background: #000;
  color: #fff;
  font-weight: 500;
  font-size: 4.26vw;
}
#demo .show {
  width: 14.66vw;
  height: 14.66vw;
  overflow: hidden;
  position: relative;
  border-radius: 1.3vw;
  border: 1px solid #d5d5d5;
}
#demo .picture {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
#demo .container {
  z-index: 99;
  position: fixed;
  padding-top: 100px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 1);
  width: 100vw;
}

#demo #image {
  width: 80vw;
}

.cropper-view-box,
.cropper-face {
  border-radius: 0;
}
.cropper-face .cropper-move {
  /* border: 1px solid red; */
}
/*!
 * Cropper.js v1.0.0-rc
 * https://github.com/fengyuanchen/cropperjs
 *
 * Copyright (c) 2017 Fengyuan Chen
 * Released under the MIT license
 *
 * Date: 2017-03-25T12:02:21.062Z
 */

.cropper-container {
  font-size: 0;
  line-height: 0;

  position: relative;

  -webkit-user-select: none;

  -moz-user-select: none;

  -ms-user-select: none;

  user-select: none;

  direction: ltr;
  -ms-touch-action: none;
  touch-action: none;
}

.cropper-container img {
  /* Avoid margin top issue (Occur only when margin-top <= -height) */
  display: block;
  min-width: 0 !important;
  max-width: none !important;
  min-height: 0 !important;
  max-height: none !important;
  width: 100%;
  height: 100%;
  image-orientation: 0deg;
}

.cropper-wrap-box,
.cropper-canvas,
.cropper-drag-box,
.cropper-crop-box,
.cropper-modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.cropper-wrap-box {
  overflow: hidden;
}

.cropper-drag-box {
  opacity: 0;
  background-color: #fff;
}

.cropper-modal {
  opacity: 0.5;
  background-color: #000;
}

.cropper-view-box {
  display: block;
  overflow: hidden;

  width: 100%;
  height: 100%;

  outline: 1px solid #fff;
  /* outline-color: rgba(51, 153, 255, 0.75); */
}

.cropper-dashed {
  position: absolute;

  display: block;

  opacity: 0.5;
  border: 0 dashed #eee;
}

.cropper-dashed.dashed-h {
  top: 33.33333%;
  left: 0;
  width: 100%;
  height: 33.33333%;
  border-top-width: 1px;
  border-bottom-width: 1px;
}

.cropper-dashed.dashed-v {
  top: 0;
  left: 33.33333%;
  width: 33.33333%;
  height: 100%;
  border-right-width: 1px;
  border-left-width: 1px;
}

.cropper-center {
  position: absolute;
  top: 50%;
  left: 50%;

  display: block;

  width: 0;
  height: 0;

  opacity: 0.75;
}

.cropper-center:before,
.cropper-center:after {
  position: absolute;
  display: block;
  content: " ";
  background-color: #eee;
}

.cropper-center:before {
  top: 0;
  left: -3px;
  width: 7px;
  height: 1px;
}

.cropper-center:after {
  top: -3px;
  left: 0;
  width: 1px;
  height: 7px;
}

.cropper-face,
.cropper-line,
.cropper-point {
  position: absolute;

  display: block;

  width: 100%;
  height: 100%;

  opacity: 0.1;
}

.cropper-face {
  top: 0;
  left: 0;

  background-color: #fff;
}

.cropper-line {
  /* background-color: #39f */
}

.cropper-line.line-e {
  top: 0;
  right: -3px;
  width: 5px;
  cursor: e-resize;
}

.cropper-line.line-n {
  top: -3px;
  left: 0;
  height: 5px;
  cursor: n-resize;
}

.cropper-line.line-w {
  top: 0;
  left: -3px;
  width: 5px;
  cursor: w-resize;
}

.cropper-line.line-s {
  bottom: -3px;
  left: 0;
  height: 5px;
  cursor: s-resize;
}

.cropper-point {
  width: 5px;
  height: 5px;

  opacity: 0;
  /* background-color: #39f */
}

.cropper-point.point-e {
  /* top: 50%;
  right: -3px;
  margin-top: -3px;
  cursor: e-resize */
}

.cropper-point.point-n {
  /* top: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: n-resize */
}

.cropper-point.point-w {
  /* top: 50%;
  left: -3px;
  margin-top: -3px;
  cursor: w-resize */
}

.cropper-point.point-s {
  /* bottom: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: s-resize */
}

.cropper-point.point-ne {
  top: -3px;
  right: -3px;
  cursor: ne-resize;
}

.cropper-point.point-nw {
  top: -3px;
  left: -3px;
  cursor: nw-resize;
}

.cropper-point.point-sw {
  bottom: -3px;
  left: -3px;
  cursor: sw-resize;
}

.cropper-point.point-se {
  right: -3px;
  bottom: -3px;
  /* width: 20px;
  height: 20px; */
  /* cursor: se-resize;
  opacity: 1 */
}

@media (min-width: 768px) {
  .cropper-point.point-se {
    /* width: 15px;
    height: 15px; */
  }
}

@media (min-width: 992px) {
  .cropper-point.point-se {
    /* width: 10px;
    height: 10px; */
  }
}

@media (min-width: 1200px) {
  .cropper-point.point-se {
    /* width: 5px;
    height: 5px; */
    opacity: 0.75;
  }
}

.cropper-point.point-se:before {
  /* position: absolute;
  right: -50%;
  bottom: -50%;
  display: block;
  width: 200%;
  height: 200%;
  content: ' ';
  opacity: 0;
  background-color: #39f */
}

.cropper-invisible {
  opacity: 0;
}

.cropper-bg {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");
}

.cropper-hide {
  position: absolute;

  display: block;

  width: 0;
  height: 0;
}

.cropper-hidden {
  display: none !important;
}

.cropper-move {
  cursor: move;
}

.cropper-crop {
  cursor: crosshair;
}

.cropper-disabled .cropper-drag-box,
.cropper-disabled .cropper-face,
.cropper-disabled .cropper-line,
.cropper-disabled .cropper-point {
  cursor: not-allowed;
}
</style>