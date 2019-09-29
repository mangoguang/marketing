<template>
  <div class="checkDetail">
    <mybanner :title='$route.query.name'
              :showLeft="true"
              :remark="0"
              @onHandleBack="onHandleBack">
      <div class="remark"
           @click="$router.push({path:'/checkTip',query:{name:'detail'}})"></div>
    </mybanner>

    <div class="form">
      <div class="tip"
           v-if="area.showAcreage||area.showDecorateDate||area.showExpiryDate"><span v-if="area.showAcreage">
          门店面积<br>{{shops[shopsSelectIndex]['acreage']||'-'}}平方 </span>
        <span v-if="area.showDecorateDate">装修时间<br>{{shops[shopsSelectIndex]['decorateTime']||'-'}} </span>
        <span v-if="area.showExpiryDate">装修结束时间<br>{{shops[shopsSelectIndex]['expiryDate']||'-'}} </span>
      </div>
      <div class="editor">
        <textarea v-model="textareaVal"
                  v-if="isGrade!=1"
                  name="reason"
                  class="area"
                  placeholder="请填写扣分原因"
                  @input="bindTexareaChange"
                  maxlength="100"></textarea>
        <div class="editor-readonly"
             :class="{'no-data':!textareaVal}"
             v-else>{{textareaVal||'暂无数据'}}</div>
        <div class="upload">
          <div class="up-img"
               v-for="(item,index) in picVal"
               :key="index">
            <div class="up-del"
                 @click="bindDeleteImg(index)"
                 v-if="isGrade!=1"></div>
            <div class="imgs"
                 v-if="/.png$|.jpg$|.jpeg$/gi.test(item)">
              <img class="source"
                   :src="item"
                   :preview='true'
                   alt="">
            </div>
            <div class="video"
                 v-if="/.3gp$|.mp4$|.mov$/gi.test(item)"
                 @click="bindPlay(item,index)">
            </div>

          </div>

          <input type="file"
                 ref="upload"
                 hidden
                 multiple
                 @change="bindUpload">

          <div class="up-btn"
               @click="bindMediaSelect"
               v-if="isGrade!=1"></div>

        </div>
      </div>
      <div class="progress">
        <mt-progress v-if="progress"
                     :value="progress"
                     :bar-height="5"></mt-progress>
      </div>
      <div class="rangeBox"
           v-if="!uploading">
        <h2>扣分：</h2>
        <div class="range-rule">
          <span class="tips">扣{{rangeValue}}分</span>
          <div class="top"><span>0</span><span>{{maxScore}}</span></div>
          <div class="rule">
            <div class="li"
                 v-for="(li,index) in 7"
                 :class="{lis:index==3}"
                 :key="index"></div>
          </div>
        </div>
        <mt-range v-model="rangeValue"
                  :disabled="isGrade==1"
                  :min="0"
                  :max="maxScore"
                  :step="1"
                  :bar-height="12">
        </mt-range>
      </div>
      <button @click="bindSave"
              v-if="isGrade!=1">保存</button>
    </div>
    <mt-actionsheet :actions="actions"
                    v-model="sheetVisible"></mt-actionsheet>
    <div class="video-box"
         v-if="showVideo">
      <div class="video-close"
           @click="bindVideoClose"></div>
      <video-player class="video-player"
                    ref="myVideoPlayer"
                    :playsinline="true"
                    :options="playerOptions" />
    </div>
    <ToastBox class="toast"
              v-if="toastReset">
      <template>
        <div class="contents"
             slot="content">
          <p>不保存离开将会清空数据<br>确认返回吗？</p>
        </div>

      </template>
      <template v-slot:bottons>
        <div class="but">
          <div class="btns"
               @click="toastReset=false">取消</div>
          <div class="btns"
               @click="$router.go(-1)">确定</div>
        </div>
      </template>
    </ToastBox>
  </div>
</template>

<script>
import Vue from 'vue'
import mybanner from '../../../components/banner'
import { Range, Actionsheet, Toast, Indicator } from 'mint-ui'
Vue.component(Actionsheet.name, Actionsheet)
Vue.component(Range.name, Range)

import { videoPlayer } from 'vue-video-player'

import { uploadFile, uploadFiles } from '@/api/4s'
import { async, Promise } from 'q'

import { mapState, mapMutations, mapGetters } from 'vuex'
import { getSign } from '@/utils/tools.js'
import lrz from 'lrz'
import _ from 'lodash'
import { Progress } from 'mint-ui'
Vue.component(Progress.name, Progress)
import ToastBox from '@/components/4s/tipsBox/ToastBox'

import { baseUrl } from '@/js/common'
export default {
  components: {
    mybanner,
    ToastBox
  },
  data() {
    return {
      rangeValue: 0,
      sheetVisible: false,
      picVal: [],
      FilesList: [],
      textareaVal: '',
      maxScore: 0,
      isGrade: 0, //是否已评分
      uploading: false,
      playerOptions: {
        // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '3:4', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src: '',
            type: 'video/mp4'
          }
        ],
        poster: '', //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        },
        defaltVal: 0
      },
      actions: [
        { name: '拍照', method: this.getCamera },
        { name: '录像', method: this.getCamcorder },
        { name: '上传图片', method: this.getPhoto },
        { name: '上传视频', method: this.getVideo }
      ],
      actionType: 0,
      showVideo: false,
      progress: 0,
      remark: '',
      area: { showAcreage: 0, showDecorateDate: 0, showExpiryDate: 0 },
      toastReset: false
    }
  },
  computed: {
    ...mapState({
      submitScoreData: state => state.eggRecordDetails.submitScoreData,
      categoryListIndex: state => state.eggRecordDetails.categoryListIndex,
      standardListIndex: state => state.eggRecordDetails.standardListIndex,
      subcategories: state => state.eggRecordDetails.subcategories,
      deductMarks: state => state.eggRecordDetails.deductMarks,
      totalPoints: state => state.eggRecordDetails.totalPoints,
      shopsSelectIndex: state => state.eggRecordDetails.shopsSelectIndex,
      shops: state => state.eggRecordDetails.shops
    })
    // ...mapGetters(['getSubmitScoreData'])
  },
  created() {
    this.isGrade = this.$route.query.isGrade

    // let standardList = this.subcategories[this.categoryListIndex].standardList[
    //   this.standardListIndex
    // ]

    let standardList = this.submitScoreData.categoryList[this.categoryListIndex]
      .standardList[this.standardListIndex]
    // this.submitScoreData.categoryList[this.categoryListIndex]
    //   .standardList[this.standardListIndex]
    //console.log(standardList)
    let subStandardList = this.subcategories[this.categoryListIndex]
      .standardList[this.standardListIndex]

    this.remark = subStandardList.remark
    this.setCheckingMsg(this.remark.replace(/\n/g, '<br>'))

    this.area = {
      showAcreage: subStandardList.showAcreage,
      showDecorateDate: subStandardList.showDecorateDate,
      showExpiryDate: subStandardList.showExpiryDate
    }

    this.textareaVal = standardList.reason //扣分原因
    var urls = [].concat(standardList.urls || [])
    this.picVal = urls || [] //上传文件

    this.defaltVal = standardList.deduct || 0
    this.rangeValue = standardList.deduct || 0 //分数

    this.maxScore = this.subcategories[this.categoryListIndex].total
  },
  beforeRouteLeave(to, from, next) {
    // let routeName = ['checkTip']
    // if (routeName.indexOf(to.name) != -1) {
    //   from.meta.keepAlive = true
    // } else {
    //   from.meta.keepAlive = false
    // }
    let pswp = document.querySelector('.pswp')
    let domColse = document.querySelector('.pswp__button--close')

    if (pswp.getAttribute('aria-hidden') == 'false') {
      domColse.click()
      next(false)
    } else {
      if (this.uploading) {
        Indicator.close()
        this.uploading = false
        next(false)
      } else {
        next()
      }
    }
  },
  methods: {
    ...mapMutations([
      'setSubmitScoreData',
      'setSubcategories',
      'setdeductMarks',
      'setCheckingMsg'
    ]),
    bindTexareaChange: _.debounce(function(e) {
      let val = this.textareaVal.replace(/<\/?[^>]*>/g, '')
      val = val.replace(/[^\w\d.?!,;"。，？《》！；<> “”\u4e00-\u9fa5]/g, '')
      this.textareaVal = val
    }, 300),
    onHandleBack() {
      if (
        this.subcategories[this.categoryListIndex].standardList[
          this.$route.query.standardListIndex
        ].status
      ) {
        this.$router.back()
      } else {
        this.toastReset = true
      }
    },
    bindSave() {
      // if (!this.textareaVal) {
      //   Toast('填写扣分原因')
      //   return
      // }
      let { rangeValue, textareaVal, picVal, defaltVal, deductMarks } = this

      let totle = rangeValue + deductMarks
      // console.log(deductMarks, rangeValue, totle)
      if (totle > this.totalPoints) {
        Toast('扣分不能超过总分')
        return
      }

      let standardList = this.submitScoreData.categoryList[
        this.categoryListIndex
      ].standardList[this.standardListIndex]

      standardList.reason = textareaVal //扣分原因
      standardList.urls = picVal //上传文件
      standardList.deduct = rangeValue //分数

      this.setdeductMarks(totle)
      this.setSubmitScoreData(this.submitScoreData)

      this.subcategories[this.categoryListIndex].standardList[
        this.$route.query.standardListIndex
      ].status = true
      this.subcategories[this.categoryListIndex].standardList[
        this.$route.query.standardListIndex
      ].deductMarks = rangeValue

      this.setSubcategories(this.subcategories)

      this.$router.go(-1)
    },
    bindMediaSelect() {
      let standardList = this.subcategories[this.categoryListIndex]
        .standardList[this.standardListIndex]
      let actionType = standardList.type
      this.actionType = actionType
      if (actionType == 1) {
        this.actions = [
          { name: '拍照', method: this.getCamera },
          { name: '上传图片', method: this.getPhoto }
        ]
      }
      if (actionType == 2) {
        this.actions = [
          { name: '录像', method: this.getCamcorder },
          { name: '上传视频', method: this.getVideo }
        ]
      }
      this.sheetVisible = true
    },
    _getVideoSource(sourceType = 'camera') {
      let _this = this
      api.getPicture(
        {
          sourceType,
          encodingType: 'jpg',
          mediaValue: 'video',
          destinationType: 'url'
          // allowEdit: true,
          // saveToPhotoAlbum: true
        },
        function(ret, err) {
          try {
            if (ret) {
              if (ret.duration == 0) return

              var model = api.deviceModel
              var sVer = api.systemVersion
              //小米8不压缩
              if (model == 'MI 8' && sVer == 9) {
                _this._nativeUpload(ret.data)
              } else {
                _this.videoCompress(ret.data)
              }
            } else {
              Toast('获取文件资源失败')
            }
          } catch (err) {
            console.log(err)
          }
        }
      )
    },
    videoCompress(path) {
      let _this = this
      var videoCompression = api.require('videoCompression')
      videoCompression.compression(
        {
          path,
          quality: 'medium'
        },
        function(ret) {
          if (ret.eventType == 'exporting') {
            _this.progress = ret.progress
          } else {
            _this._nativeUpload(ret.path)
          }
        }
      )
    },
    _nativeUpload(path) {
      let _this = this
      this.progress = 0
      if (_this.picVal.length > 4) {
        Toast('文件数量不可大于5个')
        return
      }
      var len = this.picVal.filter(item => /.3gp$|.mp4$|.mov$/gi.test(item))
      if (len.length >= 1) {
        Toast('视频最多上传一个')
        return
      }

      Indicator.open({
        text: '上传中...',
        spinnerType: 'fading-circle'
      })

      let token = JSON.parse(localStorage.getItem('token')) || {}
      api.ajax(
        {
          url: baseUrl + '/api/upload/files',
          method: 'post',
          headers: {
            Authorization: `Bearer ${token.access_token}`,
            sign: getSign({ prefix: 'cert-check-log' }, token.access_token)
          },
          data: {
            prefix: 'cert-check-log',
            files: {
              dataFiles: path
            }
          }
        },
        function(rets, errs) {
          if (rets) {
            let url = rets.list.map(item => item.url)
            _this.picVal = _this.picVal.concat(url)
            _this.uploading = false
            _this.progress = 0
            Indicator.close()
          } else {
            api.alert({
              msg: '网络错误'
            })
            console.log(JSON.stringify(errs))
          }
        }
      )
    },
    //文件上传
    _uploadFile(e) {
      return new Promise((resolve, reject) => {
        let file = e.target.files[0]
        if (/^image/.test(file.type)) {
          //iphone7 plus
          // var model = api.deviceModel
          // var sVer = api.systemVersion
          // if (model == 'iPhone 7 Plus' && sVer == '10.3.3') {
          //   resolve(file)
          //   return
          // }
          lrz(file, { quality: 0.2 })
            .then(function(rst) {
              // 处理成功会执行
              let newFile = new File([rst.file], file.name, { type: file.type })
              resolve(newFile)
            })
            .catch(function(err) {
              // 处理失败会执行
              Toast('图片压缩处理失败了')
            })
        } else if (/^video/.test(file.type)) {
          if (this.actionType == 1) {
            Toast('请上传图片')
            return
          }
          resolve(file)
        } else {
          Toast('上传正确的格式')
        }
      })
    },
    async bindUpload(e) {
      if (e.target.files.length == 0) return
      var img = Object.keys(e.target.files).filter(item =>
        /image/g.test(e.target.files[item]['type'])
      )
      if (img.length + this.picVal.length > 5) {
        Toast('图片上传数量最多不超过5张')
        return
      }
      if (this.picVal.length > 4) {
        Toast('文件数量不可大于5个')
        return
      }
      var len = this.picVal.filter(item => /.3gp$|.mp4$|.mov$/gi.test(item))
      let flg = false

      Object.keys(e.target.files).map(item => {
        if (/video/g.test(e.target.files[item]['type'])) {
          flg = true
        }
      })

      if (len.length >= 1 && flg) {
        Toast('视频最多上传一个')
        return
      }

      let file = await this._uploadFile(e)
      var formData = new FormData()

      if (file.length) {
        file.map(item => {
          formData.append('dataFiles', item)
        })
      } else {
        formData.append('dataFiles', file)
      }
      formData.append('prefix', 'cert-check-log')
      this.uploading = true
      Indicator.open({
        text: '上传中...',
        spinnerType: 'fading-circle'
      })
      let { data } = await uploadFiles(formData)
      let url = data.list.map(item => item.url)
      this.picVal = this.picVal.concat(url)
      this.uploading = false
      Indicator.close()
    },
    getCamcorder() {
      this._getVideoSource()
      // this.$refs.upload.setAttribute('capture', 'camcorder')
      // this.$refs.upload.setAttribute('accept', 'video/*')
      // // this.$refs.upload.removeAttribute('multiple')
      // this.$refs.upload.click()
    },
    getCamera() {
      this.$refs.upload.setAttribute('capture', 'camera')
      this.$refs.upload.setAttribute('accept', 'image/*')
      this.$refs.upload.click()
    },
    getPhoto() {
      this.$refs.upload.removeAttribute('capture')
      this.$refs.upload.setAttribute('accept', 'image/*')
      this.$refs.upload.click()
    },
    getVideo() {
      this._getVideoSource('album')
    },
    bindDeleteImg(index) {
      this.picVal.splice(index, 1)
      sessionStorage.setItem('urls', JSON.stringify(this.picVal))
    },
    bindVideoClose() {
      this.showVideo = false
    },
    bindPlay(item, index) {
      this.showVideo = true
      this.playerOptions.sources[0].src = item
    }
  }
}
</script>
<style lang='scss' scoped>
.checkDetail /deep/ .banner .icon-back {
  padding-left: 24px;
}
/deep/ .video-js {
  padding-top: 0;
  height: 100%;
}
/deep/ .video-js .vjs-big-play-button {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.5);
}

/deep/ .mt-range {
  width: 245px;
  margin: 0 auto;
}
/deep/ .mt-range-runway {
  border-radius: 6px;
}
/deep/ .mt-range-progress {
  padding-right: 10px;
  border-radius: 6px 0 0 6px;
  background: linear-gradient(
    90deg,
    rgba(255, 187, 2, 1),
    rgba(255, 161, 91, 1),
    rgba(255, 106, 93, 1)
  );
}
%up_width {
  width: 90px;
  height: 90px;
}
.progress {
  width: 300px;
  margin: 0 auto;
}
.checkDetail {
  .contents {
    height: 96px;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      text-align: center;
      font-size: 14px;
    }
  }
  .but {
    display: flex;
    .btns {
      flex: 1;
      font-size: 15px;
    }
    .btns:first-child {
      color: #909090;
      border-right: 1px solid #ddd;
    }
    .btns:last-child {
      color: #007aff;
    }
  }
  .remark {
    position: absolute;
    bottom: 13px;
    right: 24px;
    width: 34px;
    height: 34px;
    background: url(~@/assets/imgs/4s/help拷贝3@2x.png) right bottom no-repeat;
    background-size: 19px 19px;
  }
  .video-box {
    position: fixed;
    width: 100vw;
    height: 100%;
    z-index: 99;
    top: 0;
    left: 0;
  }
  .video-player {
    height: 100%;
    box-sizing: border-box;
    padding: 20% 0;
    background: #000;
  }
  .video-close {
    background: url('../../../assets/imgs/4s/cuowu@2x.png') center center / 100%
      100%;
    height: 20px;
    width: 20px;
    z-index: 999;
    position: absolute;
    right: 5px;
    top: 5px;
  }
  .range-rule {
    width: 245px;
    margin: 0 auto;
    position: relative;
    padding-top: 10px;

    .top {
      display: flex;
      justify-content: space-between;
    }
    .rule {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .li {
        border-left: 2px solid #bdc3cf;
        height: 4px;
      }
      .lis {
        height: 12px;
      }
    }
  }
  .upload {
    padding-top: 36px;
    display: flex;
    flex-flow: wrap;
    .up-img {
      @extend %up_width;
      margin-right: 10px;
      margin-bottom: 10px;
      position: relative;
      .up-del {
        position: absolute;
        top: 0;
        right: 0;
        width: 15px;
        height: 15px;
        background: rgba(0, 0, 0, 1);
        opacity: 0.3;
        border-radius: 0px 0px 0px 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
        &::after {
          content: '';
          display: block;
          background: url('../../../assets/imgs/4s/cuowu@2x.png') center center /
            100% 100%;
          width: 8px;
          height: 8px;
        }
      }
      .imgs {
        @extend %up_width;
      }
      .source {
        width: 100%;
        height: 100%;
      }
      .video {
        @extend %up_width;
        position: relative;
        background: #2d2d2d;
        &::after {
          content: '';
          display: block;
          height: 0;
          width: 0;
          border-right: 8px solid #fff;
          border-bottom: 8px solid #fff;
          border-top: 8px solid transparent;
          border-left: 8px solid transparent;
          position: absolute;
          top: 50%;
          left: 50%;
          opacity: 0.8;
          transform: translate(-50%, -50%) rotate(-45deg);
        }
      }
    }
    .up-btn {
      @extend %up_width;
      border: 1px dashed #e1e1e1;
      background: url(../../../assets/imgs/4s/up.png) center center no-repeat;
      background-size: 39px 39px;
    }
  }
  .editor {
    padding: 17px 24px;
    .area {
      width: 319px;
      display: block;
      min-height: 100px;
      max-height: 200px;
      font-size: 14px;
      color: #2d2d2d;
      font-family: 'Microsoft Yahei,PingFang-SC-Medium';
      outline: none;
    }
    .editor-readonly {
      width: 319px;
      min-height: 50px;
      font-size: 14px;
      color: #2d2d2d;
      overflow: hidden;
      word-wrap: break-word;
    }
    .no-data {
      color: #999;
      font-size: 14px;
    }
  }
  .form {
    position: relative;
    padding-top: 16.466vw;
    box-sizing: border-box;
    padding-bottom: 200px;
    .tip {
      height: 32px;
      border: 1px solid transparent;
      background-color: #fec06d;
      padding: 5px 24px;
      display: flex;
      align-items: center;
      line-height: 1.4;
      // &::before {
      //   content: '';
      //   display: block;
      //   height: 16px;
      //   width: 16px;
      //   background: url(~@/assets/imgs/4s/29感叹号@2x.png) no-repeat;
      //   background-size: contain;
      // }
      span {
        color: #915305;
        font-size: 12px;
        flex: 1;
        text-align: center;
      }
    }
    .imgBox {
      li {
        width: 20vw;
        height: 20vw;
        background: blue;
      }
    }
    .rangeBox {
      // width: 92vw;
      // margin: 0 4vw;
      border-top: 6px solid #f5f5f5;
      & > h2 {
        font-size: 14px;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        padding: 19px 24px 0 24px;
        line-height: 1;
      }
      .tips {
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        margin-left: 8px;
        display: block;
        width: 12.8vw;
        height: 8.1vw;
        font-size: 12px;
        line-height: 6.6vw;
        color: #e4675b;
        text-align: center;
        background: url(../../../assets/imgs/4s/starCheck/msg.png) no-repeat;
        background-size: 100%;
      }
    }
    button {
      position: fixed;
      bottom: 35px;
      left: 50%;
      transform: translateX(-50%);
      width: 320px;
      background: #007aff;
      color: #fff;
      font-size: 16px;
      line-height: 13.34vw;
      border-radius: 6.67vw;
    }
  }
}
</style>