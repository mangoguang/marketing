<template>
  <div class="alter">
    <div class="header">
      <div class="back"
           @click="ShowToast=true"></div>
      <h3>{{alter==1?'修改案例':'发布案例'}}</h3>
    </div>
    <div class="title"
         @click="$router.push('/searchType')">产品<span>*</span>{{goodCase.goodId}} <label v-if="ver==1">请选择案例产品</label></div>
    <div class="text">
      <textarea class="area"
                maxlength="150"
                v-model="description"
                @focus="ver=0"
                @input="bindAreaChange"></textarea>
      <p>描述<span>*</span></p>
      <label v-if="ver==2">请输入案例描述</label>
      <div class="num">{{description.length}}/150</div>
    </div>
    <div class="postion"
         @click="$router.push('/provice'),ver=0">
      <span>{{provice}}</span>
      <label v-if="ver==3">请选择所在位置</label>
    </div>
    <div class="upload">
      <h2>请按要求添加案例图片</h2>
      <div class="up-box">
        <div class="li"
             v-for="(item,index) in defaultImg"
             :key="index">
          <p><span>*</span>{{item.name}}</p>
          <div class="img-box"
               @click="bindPreview(index,0)"
               v-if="item.src">
            <img :src="item.src"
                 :alt="item.name">
          </div>
          <div class="img"
               v-else
               @click="sheetVisible = true,activeIndex=index,ver=0"
               :class="`img${index} ${ver==index+4?'vertify':''}` ">
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
             @click="bindPreview(index,1)"
             :key="index">
          <img :src="item">
        </div>
        <div class="li"
             v-if="oether.length<2">
          <div class="img"
               @click="sheetVisible = true;activeIndex=-1">
            <div class="tip">添加图片</div>
          </div>
        </div>
      </div>
      <div class="notice">注意：图片大小不能超过3M</div>
    </div>
    <div class="release"
         v-if="alter==1">
      <div class="re-btn"
           @click="bindUpdate">保存并发布</div>
    </div>
    <div class="release"
         v-else>
      <div class="re-btn"
           @click="bindRelease">发布案例</div>
    </div>

    <toast-comfirm class="toast"
                   v-if="ShowToast"
                   content="退出编辑后将不保存<br>已编辑内容，确定退出？">

      <template v-slot:bottons>
        <div class="but">
          <div class="btns commit"
               @click="bindExitPage">确定</div>
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
import { mapState, mapMutations, mapGetters } from 'vuex'
import { goodCaseSave, goodCaseUpdate } from '@/api/case'
import { Toast } from 'mint-ui'
import lrz from 'lrz'
import _ from 'lodash'
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
      oetherLength: 0,
      ver: 0,
      alter: 0
    }
  },
  created() {
    if (!this.provice) {
      var myCity = new BMap.Geolocation()
      myCity.getCurrentPosition(data => {
        this.setProvice(data.address.city.replace(/市$/, ''))
      })
    }

    this.alter = this.$route.query.alter
    this.description = this.goodCase.remark || ''

    this.setGoodCase({
      account: JSON.parse(localStorage.getItem('userInfo'))['account']
    })
  },
  computed: {
    provice() {
      let { provice } = this.$store.state.caseStore
      this.setGoodCase({
        source: provice
      })
      return provice
    },
    ...mapState({
      // provice: state => state.caseStore.provice,
      goodCase: state => state.caseStore.goodCase,
      alterUploadImg: state => state.caseStore.alterUploadImg
    }),
    oether() {
      let { alterUploadImg } = this
      let arr = [alterUploadImg.spareImgFile1, alterUploadImg.spareImgFile2]
      return arr.filter(item => item)
    },
    defaultImg() {
      let { alterUploadImg } = this
      return [
        { name: '正面', src: alterUploadImg.frontImgFile },
        { name: '侧面', src: alterUploadImg.flankImgFile },
        { name: '对角', src: alterUploadImg.diagonalImgFile }
      ]
    }
  },
  methods: {
    ...mapMutations(['setGoodCase', 'setProvice', 'setAlterUploadImg']),
    _vertify() {
      let {
        goodId,
        remark,
        source,
        frontImgFile,
        flankImgFile,
        diagonalImgFile
      } = this.goodCase
      let verify = [
        goodId,
        remark,
        source,
        frontImgFile,
        flankImgFile,
        diagonalImgFile
      ]

      let arr = [
        '请选择产品型号',
        '请填写描述',
        '请选择地区',
        '上传产品正面',
        '上传产品侧面',
        '上传产品对角'
      ]
      for (let i = 0; i < verify.length; i++) {
        if (!verify[i]) {
          this.ver = i + 1
          //Toast(arr[i])
          break
        }
      }
      return this.ver == 0 ? false : true
    },
    async bindRelease() {
      if (this._vertify()) return
      var formData = new FormData()
      for (let obj in this.goodCase) {
        if (this.goodCase[obj]) {
          formData.append(obj, this.goodCase[obj])
        }
      }
      let { status, msg } = await goodCaseSave(formData)
      Toast(msg)
      if (status == 1) {
        this.setGoodCase({
          enable: '',
          goodId: '',
          remark: '',
          source: '',
          frontImgFile: '',
          flankImgFile: '',
          diagonalImgFile: '',
          spareImgFile1: '',
          spareImgFile2: ''
        })
        this.setAlterUploadImg({
          frontImgFile: '',
          flankImgFile: '',
          diagonalImgFile: '',
          spareImgFile1: '',
          spareImgFile2: ''
        })
        this.description = ''
        this.setProvice('')
      }
    },
    async bindUpdate() {
      // if (this._vertify()) {
      //   return
      // }

      let imgList = Object.keys(this.alterUploadImg)
      for (let j = 0; j <= imgList.length; j++) {
        let a = imgList[j]
        this.ver = j + 4
        if (!this.alterUploadImg[imgList[j]] && j < 3) return
      }

      var formData = new FormData()
      for (let obj in this.goodCase) {
        let uparr = ['diagonalImg', 'flankImg', 'frontImg', 'img1', 'img2']
        if (this.goodCase[obj] || uparr.indexOf(obj) != -1) {
          formData.append(obj, this.goodCase[obj])
        }
      }
      let { status, msg } = await goodCaseUpdate(formData)

      if (status == 1) {
        Toast('更新成功')
        setTimeout(() => {
          this.setGoodCase({
            enable: '',
            goodId: '',
            remark: '',
            source: '',
            frontImgFile: '',
            flankImgFile: '',
            diagonalImgFile: '',
            spareImgFile1: '',
            spareImgFile2: ''
          })
          this.setAlterUploadImg({
            frontImgFile: '',
            flankImgFile: '',
            diagonalImgFile: '',
            spareImgFile1: '',
            spareImgFile2: ''
          })
          this.description = ''
          this.setProvice('')
          this.$router.back()
        }, 1000)
      } else {
        Toast('更新失败')
      }
    },
    async bindUpload(e) {
      let file = e.target.files[0]
      // var model = api.deviceModel
      // var sVer = api.systemVersion
      // if (model == 'iPhone 7 Plus' && sVer == '10.3.3') {
      //   resolve(file)
      //   return
      // }
      let { activeIndex } = this
      let alterFlag = this.$route.query.alter
      try {
        let res = await lrz(file, { quality: 0.2 })
        var newFile = new File([res.file], res.origin.name, {
          type: res.file.type
        })
        if (activeIndex == -1) {
          //其他
          //this.oether.push(res.base64)
          this.oetherLength += 1
          this.setGoodCase({ ['spareImgFile' + this.oetherLength]: newFile })
          this.setAlterUploadImg({
            ['spareImgFile' + this.oetherLength]: res.base64
          })
          if (alterFlag == 1) {
            this.setGoodCase({ ['img' + this.oetherLength]: '' })
          }
          return
        }
        //必须
        var arr = ['frontImgFile', 'flankImgFile', 'diagonalImgFile']
        var name = arr[this.activeIndex]
        this.setGoodCase({
          [name]: newFile
        }) //res.base64
        this.setAlterUploadImg({
          [name]: res.base64
        })
        if (alterFlag == 1) {
          let alterArr = ['frontImg', 'flankImg', 'diagonalImg']
          let alterImg = alterArr[this.activeIndex]
          this.setGoodCase({
            [alterImg]: ''
          })
        }
        //this.defaultImg[activeIndex].src = res.base64
      } catch (err) {
        console.log(err)
      }
    },
    bindAreaChange: _.debounce(function() {
      this.setGoodCase({
        remark: this.description
      })
    }),
    bindPreview(index, flag) {
      this.$router.push({
        path: '/preview',
        query: { index, pre: flag }
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
    },
    bindExitPage() {
      this.setGoodCase({
        enable: '',
        goodId: '',
        remark: '',
        source: '',
        frontImgFile: '',
        flankImgFile: '',
        diagonalImgFile: '',
        spareImgFile1: '',
        spareImgFile2: ''
      })
      this.setAlterUploadImg({
        frontImgFile: '',
        flankImgFile: '',
        diagonalImgFile: '',
        spareImgFile1: '',
        spareImgFile2: ''
      })
      this.description = ''
      this.setProvice('')

      this.ShowToast = false
      this.$router.back()
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
.toast {
  text-align: center;
}
.alter {
  background-color: #fff;
  height: 100vh;
  padding: 0 10px;
  overflow: auto;
  .header {
    height: 44px;
    position: relative;
    h3 {
      font-size: 19px;
      color: #363636;
      text-align: center;
      padding: 0 54px;
      line-height: 44px;
      font-weight: bold;
    }
    .back {
      height: 30px;
      width: 30px;
      background: url(~@/assets/imgs/back.png) left center no-repeat;
      background-size: 10px 18px;
      position: absolute;
      top: 50%;
      left: 16px;
      transform: translateY(-50%);
    }
  }
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
      .vertify {
        border: 1px dashed #cc2934;
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
    label {
      color: #cc2934;
      font-size: 14px;
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
    & > label {
      color: #cc2934;
      font-size: 14px;
      position: absolute;
      top: 13px;
      left: 55px;
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
    label {
      color: #cc2934;
      font-size: 14px;
    }
  }
}
</style>