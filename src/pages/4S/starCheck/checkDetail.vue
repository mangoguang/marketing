<template>
  <div class="checkDetail">
    <mybanner :title='title' />
    <div class="form">
      <div class="editor">
        <textarea name="reason"
                  class="area"
                  placeholder="请填写扣分原因"></textarea>
        <div class="upload">
          <div class="up-img"
               v-for="(item,index) in picVal"
               :key="index">
            <div class="up-del"
                 @click="bindDeleteImg(index)"></div>
            <img :src="item.url"
                 alt="">
          </div>

          <input type="file"
                 ref="upload"
                 hidden
                 accept="image/*"
                 @change="bindUpload">

          <div class="up-btn"
               @click="sheetVisible=true"></div>
        </div>
      </div>
      <div class="rangeBox">
        <div class="range-rule">
          <span class="tips">扣{{rangeValue}}分</span>
          <div class="top"><span>0</span><span>18</span></div>
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
                  :min="0"
                  :max="18"
                  :step="1"
                  :bar-height="12">
        </mt-range>
      </div>
      <button>保存</button>
    </div>
    <mt-actionsheet :actions="[{ name:'拍摄', method:getCamera }, { name:'从手机相册选择', method:getPhoto}]"
                    v-model="sheetVisible"></mt-actionsheet>
  </div>
</template>

<script>
import Vue from 'vue'
import mybanner from '../../../components/banner'
import { Range, Actionsheet, Toast } from 'mint-ui';
Vue.component(Actionsheet.name, Actionsheet);
Vue.component(Range.name, Range);
export default {
  components: {
    mybanner
  },
  data () {
    return {
      title: '店面',
      rangeValue: 0,
      sheetVisible: false,
      picVal: [],
      FilesList: []
    }
  },
  methods: {
    bindUpload (e) {
      var _this = this;
      let files = e.target.files;
      files = Array.prototype.slice.call(files);
      if (!files.length) return;

      let imgSize = 3 * 1024 * 1024;
      files.map((item, index) => {
        if (/^image/.test(item.type)) {
          if (item.size > imgSize) {
            Toast({
              message: `每张图片不能超过3M`,
              position: 'middle',
              duration: 2000
            })
            return;
          }
          let reader = new FileReader();
          reader.readAsDataURL(item);
          reader.onloadend = function () {
            _this.picVal.push({ name: item.name, url: this.result });
            _this.FilesList.push(item);
          }
        } else {
          Toast({
            message: `上传正确的格式`,
            position: 'middle',
            duration: 2000
          })
        }
      });
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