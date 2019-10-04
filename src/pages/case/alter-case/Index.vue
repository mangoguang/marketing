<template>
  <div class="alter">
    <!-- <banner title="修改案例" /> -->
    <div class="title"
         @click="$router.push('/search-product')">产品<span>*</span>{{goodCase.goodId}}</div>
    <div class="text">
      <textarea class="area"
                maxlength="150"
                v-model="description"></textarea>
      <p>描述<span>*</span></p>
      <div class="num">{{description.length}}/150</div>
    </div>
    <div class="postion"
         @click="$router.push('/provice')">
      <span>{{provice}}</span>
    </div>
    <div class="upload">
      <h2>请按要求添加案例图片</h2>
      <div class="up-box">
        <div class="li"
             v-for="(item,index) in defaultImg"
             :key="index">
          <p><span>*</span>{{item.name}}</p>
          <div class="img-box"
               @click="bindPreview(index)"
               v-if="item.src">
            <img :src="item.src"
                 :alt="item.name">
          </div>
          <div class="img"
               v-else
               @click="sheetVisible = true,activeIndex=index"
               :class="`img${index}`">
            <div class="add"></div>

          </div>

        </div>
        <input type="file"
               accept="image/png,image/jpg,image/jpeg"
               hidden
               @change="bindUpload"
               ref="uploadImg">
      </div>
      <h2>其他（不超过3张）</h2>
      <div class="up-box other">
        <div class="li"
             v-for="(item,index) in oether "
             @click="bindPreview(index)"
             :key="index">
          <img :src="item">
        </div>
        <div class="li"
             v-if="oether.length<3">
          <div class="img"
               @click="sheetVisible = true;activeIndex=-1">
            <div class="tip">添加图片</div>
          </div>
        </div>
      </div>
      <div class="notice">注意：图片大小不能超过3M</div>
    </div>
    <div class="release">
      <div class="re-btn"
           @click="bindRelease">发布案例</div>
    </div>
    <toast-comfirm class="toast"
                   v-if="ShowToast"
                   :content="'是否确认重置？'">

      <template v-slot:bottons>
        <div class="but">
          <div class="btns commit">确定</div>
          <div class="btns"
               @click="ShowToast=false">取消</div>
        </div>
      </template>
    </toast-comfirm>
    <mt-actionsheet :actions="[{ name:'拍照', method:getCamera }, { name:'从手机相册选择', method:getPhoto}]"
                    v-model="sheetVisible"></mt-actionsheet>
  </div>
</template>

<script>
import Banner from '@/components/banner'
import ToastComfirm from '@/components/case/ToastComfirm/Index'
import { mapState, mapMutations } from 'vuex'
import lrz from 'lrz'
export default {
  name: 'AlterCase',
  components: {
    Banner,
    ToastComfirm
  },
  data() {
    return {
      description: '',
      ShowToast: false,
      sheetVisible: false,
      activeIndex: -1,
      oetherLength: 0
    }
  },
  created() {
    this.description = this.goodCase.remark
  },
  computed: {
    ...mapState({
      provice: state => state.caseStore.provice,
      goodCase: state => state.caseStore.goodCase
    }),
    oether() {
      let { goodCase } = this
      let arr = [
        goodCase.spareImgFile1,
        goodCase.spareImgFile2,
        goodCase.spareImgFile3
      ]
      return arr.filter(item => item)
    },
    defaultImg() {
      let { goodCase } = this
      return [
        { name: '正面', src: goodCase.frontImgFile },
        { name: '侧面', src: goodCase.flankImgFile },
        { name: '对角', src: goodCase.diagonalImgFile }
      ]
    }
  },
  methods: {
    ...mapMutations(['setGoodCase']),
    async bindRelease() {},
    async bindUpload(e) {
      let file = e.target.files[0]
      // var model = api.deviceModel
      // var sVer = api.systemVersion
      // if (model == 'iPhone 7 Plus' && sVer == '10.3.3') {
      //   resolve(file)
      //   return
      // }
      let { activeIndex } = this
      try {
        let res = await lrz(file, { quality: 0.2 })
        if (activeIndex == -1) {
          //其他
          //this.oether.push(res.base64)
          this.oetherLength += 1
          this.setGoodCase({ ['spareImgFile' + this.oetherLength]: res.base64 })

          return
        }
        //必须
        var arr = ['frontImgFile', 'flankImgFile', 'diagonalImgFile']
        var name = arr[this.activeIndex]
        console.log(name)
        this.setGoodCase({ [name]: res.base64 })
        //this.defaultImg[activeIndex].src = res.base64
      } catch (err) {
        console.log(err)
      }
    },
    bindPreview(index) {
      console.log(this.activeIndex)
      this.$router.push({
        path: '/preview',
        query: { index, pre: this.activeIndex == -1 ? 1 : 0 }
      })
    },
    getCamera() {
      this.$refs.uploadImg.removeAttribute('capture')
      this.$refs.uploadImg.setAttribute('accept', 'image/*,video/*')
      this.$refs.uploadImg.setAttribute('multiple', 'multiple')
      this.$refs.uploadImg.click()
    },
    getPhoto() {
      this.$refs.uploadImg.removeAttribute('capture')
      this.$refs.uploadImg.setAttribute('accept', 'image/*,video/*')
      this.$refs.uploadImg.setAttribute('multiple', 'multiple')
      this.$refs.uploadImg.click()
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
    background: url($url) no-repeat;
    background-size: contain;
  }
}
.but {
  display: flex;
  width: 100%;
  .btns {
    flex: 1;
    font-size: 18px;
    color: #909090;
    &:active {
      background-color: #b2d7ff;
      color: #007aff;
    }
  }
  .commit {
    color: #363636;
    border-right: 1px solid #ddd;
  }
}
.alter {
  background-color: #fff;
  height: 100vh;
  padding: 0 10px;
  overflow: auto;
  .release {
    height: 52px;
    margin-top: 30px;
    .re-btn {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 52px;
      background-color: #007aff;
      color: #fff;
      text-align: center;
      line-height: 52px;
      z-index: 9;
      font-size: 16px;
    }
  }
  .upload {
    padding: 0 6px;
    & > h2 {
      font-size: 12px;
      color: #363636;
      line-height: 1;
      padding-bottom: 11px;
    }
    .notice {
      font-size: 11px;
      color: #cc2934;
      padding-left: 20px;
      background: url('~@/assets/imgs/case/注意 拷贝@2x.png') left center / 16px
        16px no-repeat;
    }
    .up-box {
      display: flex;
      justify-content: space-between;
      padding-bottom: 16px;
      .li {
        & > p {
          color: #909090;
          font-size: 11px;
          line-height: 1;
          padding-bottom: 10px;
          span {
            color: #cc2934;
          }
        }
      }
      .img-box {
        width: 110px;
        height: 110px;
        border-radius: 4px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .img {
        width: 110px;
        height: 110px;
        position: relative;
        background: #e1e1e1;
        border: 1px solid rgba(225, 225, 225, 1);
        border-radius: 4px;
      }
      .tip {
        background: #e1e1e1 url(~@/assets/imgs/case/拍照@2x.png) top center /
          20px 16px no-repeat;
        padding-top: 27px;
        text-align: center;
        position: absolute;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        line-height: 1;
        font-size: 12px;
        color: #909090;
      }
      .img0 {
        background: #e1e1e1 url(~@/assets/imgs/case/正面@2x.png) center center /
          70px 70px no-repeat;
      }
      .img1 {
        background: #e1e1e1 url(~@/assets/imgs/case/侧面@2x.png) center center /
          70px 70px no-repeat;
      }
      .img2 {
        background: #e1e1e1 url(~@/assets/imgs/case/对角@2x.png) center center /
          70px 70px no-repeat;
      }
      .add {
        width: 27px;
        height: 27px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: url('~@/assets/imgs/case/圆角矩形 1007@2x.png') center
          center / 100% 100% no-repeat;
      }
    }
    .other {
      display: flex;
      justify-content: flex-start;
      .li {
        width: 110px;
        height: 110px;
        margin-right: 7px;
        &:nth-child(3n) {
          margin-right: 0;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .postion {
    border-top: 1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
    margin-top: 10px;
    margin-bottom: 15px;
    margin-left: 6px;
    margin-right: 6px;
    height: 45px;
    color: #007aff;
    padding-right: 17px;
    display: flex;
    align-items: center;
    background: url('~@/assets/imgs/case/箭头 拷贝 4@2x.png') right 17px center /
      7px 12px no-repeat;
    span {
      padding-left: 5px;
    }
    @include before-bg(18px, 18px, '~@/assets/imgs/case/定位@2x.png');
  }
  .text {
    width: 355px;
    height: 245px;
    background: rgba(248, 248, 248, 1);
    border-radius: 4px;
    padding: 16px 5px 25px 5px;
    position: relative;
    .area {
      text-indent: 50px;
      height: 100%;
      width: 100%;
      font-size: 14px;
      color: #363636;
      line-height: 21px;
    }
    & > p {
      font-size: 18px;
      color: #363636;
      position: absolute;
      top: 13px;
      left: 5px;
      line-height: 1;
      span {
        color: #fb222b;
      }
    }
    .num {
      position: absolute;
      bottom: 8px;
      right: 26px;
      font-size: 9px;
      color: #909090;
    }
  }
  .title {
    margin-top: 10px;
    margin-bottom: 10px;
    width: 355px;
    height: 45px;
    border-radius: 4px;
    color: #363636;
    padding-left: 7px;
    padding-right: 26px;
    line-height: 45px;
    font-size: 18px;
    background: rgba(248, 248, 248, 1)
      url('~@/assets/imgs/case/箭头 拷贝 4@2x.png') right 17px center / 7px 12px
      no-repeat;

    span {
      color: #fb222b;
    }
  }
}
</style>