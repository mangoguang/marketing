<template>
  <div class="checkDetail">
    <mybanner :title='$route.query.name' />
    <div class="form">
      <div class="editor">
        <textarea v-model="textareaVal"
                  v-if="isGrade!=1"
                  name="reason"
                  class="area"
                  placeholder="请填写扣分原因"></textarea>
        <div class="editor-readonly"
             v-else>{{textareaVal}}</div>
        <div class="upload">
          <div class="up-img"
               v-for="(item,index) in picVal"
               :key="index">
            <div class="up-del"
                 @click="bindDeleteImg(index)"
                 v-if="isGrade!=1"></div>
            <img :src="item"
                 :preview='true'
                 alt="">
          </div>

          <input type="file"
                 ref="upload"
                 hidden
                 multiple="multiple"
                 accept="image/*,video/*"
                 @change="bindUpload">

          <div class="up-btn"
               @click="sheetVisible=true"
               v-if="isGrade!=1"></div>
        </div>
      </div>

      <div class="rangeBox"
           v-if="!uploading">
        <div class="range-rule">
          <span class="tips">扣{{rangeValue}}分</span>
          <div class="top"><span>0</span><span>{{maxScore}}</span></div>
          <div class="rule">
            <div class="li"></div>
            <div class="li"></div>
            <div class="li"></div>
            <div class="li lis"></div>
            <div class="li"></div>
            <div class="li"></div>
            <div class="li"></div>
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
    <mt-actionsheet :actions="[{ name:'拍摄', method:getCamera }, { name:'从手机相册选择', method:getPhoto}]"
                    v-model="sheetVisible"></mt-actionsheet>
  </div>
</template>

<script>
import Vue from 'vue'
import mybanner from '../../../components/banner'
import { Range, Actionsheet, Toast, Indicator } from 'mint-ui';
Vue.component(Actionsheet.name, Actionsheet);
Vue.component(Range.name, Range);

import { uploadFile } from '@/api/4s'
import { async, Promise } from 'q';

import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    mybanner
  },
  data () {
    return {

      rangeValue: 0,
      sheetVisible: false,
      picVal: [],
      FilesList: [],
      textareaVal: '',
      maxScore: 0,
      isGrade: 0, //是否已评分
      uploading: false
    }
  },
  computed: mapState({
    submitScoreData: state => state.eggRecordDetails.submitScoreData,
    categoryListIndex: state => state.eggRecordDetails.categoryListIndex,
    standardListIndex: state => state.eggRecordDetails.standardListIndex,
    subcategories: state => state.eggRecordDetails.subcategories,
    deductMarks: state => state.eggRecordDetails.deductMarks,
    totalPoints: state => state.eggRecordDetails.totalPoints
  }),
  created () {
    this.isGrade = this.$route.query.isGrade
    let standardList = this.submitScoreData.categoryList[this.categoryListIndex].standardList[this.standardListIndex]
    this.textareaVal = standardList.reason //扣分原因
    this.picVal = standardList.urls || []   //上传文件
    this.rangeValue = standardList.deduct || 0 //分数

    this.maxScore = this.subcategories[this.categoryListIndex].total
  },
  methods: {
    ...mapMutations(['setSubmitScoreData', 'setSubcategories', 'setdeductMarks']),
    bindSave () {
      // if (!this.textareaVal) {
      //   Toast('填写扣分原因')
      //   return
      // }
      let { rangeValue, textareaVal, picVal } = this

      let standardList = this.submitScoreData.categoryList[this.categoryListIndex].standardList[this.standardListIndex]

      standardList.reason = textareaVal //扣分原因
      standardList.urls = picVal  //上传文件
      standardList.deduct = rangeValue //分数
      let totle = this.deductMarks + rangeValue


      if (totle > this.totalPoints) {
        Toast('扣分不能超过总分')
        return
      }

      this.setdeductMarks(totle)

      this.setSubmitScoreData(this.submitScoreData)

      this.subcategories[this.categoryListIndex].standardList[this.$route.query.standardListIndex].status = true

      this.setSubcategories(this.subcategories)


      this.$router.go(-1)
    },
    //文件上传
    _uploadFile (e) {
      var _this = this;

      let files = Array.from(e.target.files);
      // files = Array.prototype.slice.call(files);
      if (!files.length) return;

      let imgSize = 1 * 1024 * 1024;
      return new Promise((resolve, reject) => {
        files.map(async (item, index) => {
          if (/^image/.test(item.type)) {
            if (item.size < imgSize) { resolve(item); return }
            let reader = new FileReader();
            reader.readAsDataURL(item);
            reader.onloadend = async function () {
              let img = new Image();
              img.src = this.result;
              img.onload = async function () {
                let data = _this.compress(img);
                let blob = _this.dataURItoBlob(data);
                console.log(blob)
                console.log(data)
                let file = new File([blob], item.name, { type: item.type })

                resolve(file)
              }
            }

          } else if (/^video/.test(item.type)) {
            resolve(file)
          } else {
            Toast({
              message: `上传正确的格式`,
              position: 'middle',
              duration: 2000
            })
          }


        });
      })


    },
    async  bindUpload (e) {

      console.log(e)
      let file = await this._uploadFile(e)

      var formData = new FormData();
      formData.append('dataFile', file);
      formData.append('prefix', 'cert-check-log');
      this.uploading = true
      Indicator.open({
        text: '图片上传中...',
        spinnerType: 'fading-circle'
      });
      let { data } = await uploadFile(formData)
      this.picVal.push(data.url)
      this.uploading = false
      Indicator.close();

    },
    // 压缩图片
    compress (img) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      let initSize = img.src.length;
      let width = img.width;
      let height = img.height;
      canvas.width = width;
      canvas.height = height;
      // 铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, width, height);

      //进行最小压缩
      let ndata = canvas.toDataURL("image/jpeg", 0.1);
      return ndata;
    },
    // base64转成bolb对象
    dataURItoBlob (base64Data) {
      var byteString;
      if (base64Data.split(",")[0].indexOf("base64") >= 0) { byteString = atob(base64Data.split(",")[1]); }
      else byteString = unescape(base64Data.split(",")[1]);
      var mimeString = base64Data
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], { type: mimeString });
    },
    getCamera () {
      this.$refs.upload.setAttribute("capture", 'camera');
      this.$refs.upload.removeAttribute("multiple");
      this.$refs.upload.click();
    },
    getPhoto () {
      this.$refs.upload.removeAttribute("capture");
      this.$refs.upload.setAttribute("multiple", 'multiple');
      this.$refs.upload.click();
    },
    bindDeleteImg (index) {
      this.picVal.splice(index, 1)
    }
  }
}
</script>
<style lang='scss' scoped>
/deep/ .mt-range-thumb {
  width: 17px;
  height: 17px;
  top: 50%;
  transform: translateY(-50%);
}
/deep/ .mt-range {
  width: 245px;
  margin: 0 auto;
}
/deep/ .mt-range-runway {
  border-radius: 6px;
  margin-right: 17px;
}
/deep/ .mt-range-content {
  margin-right: 17px;
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
.checkDetail {
  .range-rule {
    width: 245px;
    margin: 0 auto;
    position: relative;
    padding-top: 19px;
    border-top: 6px solid #f5f5f5;
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
        &::after {
          content: "";
          display: block;
          background: url("../../../assets/imgs/4s/cuowu@2x.png") center center /
            100% 100%;
          width: 8px;
          height: 8px;
        }
      }
      img {
        @extend %up_width;
      }
    }
    .up-btn {
      @extend %up_width;
      border: 1px dashed #e1e1e1;
      background: url(../../../assets/imgs/4s/up.png) center center no-repeat /
        39px 39px;
    }
  }
  .editor {
    padding: 17px 28px;
    .area {
      width: 319px;
      display: block;
      height: 50px;
      font-size: 14px;
      color: #2d2d2d;
      font-family: "Microsoft Yahei,PingFang-SC-Medium";
    }
    .editor-readonly {
      width: 319px;
      min-height: 50px;
      font-size: 14px;
      color: #2d2d2d;
    }
  }
  .form {
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    padding-top: 16.466vw;
    height: 100vh;
    box-sizing: border-box;
    .imgBox {
      li {
        width: 20vw;
        height: 20vw;
        background: blue;
      }
    }
    .rangeBox {
      width: 92vw;
      margin: 0 4vw;
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