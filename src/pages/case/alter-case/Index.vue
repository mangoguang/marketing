<template>
  <div class="alter">
    <!-- <banner title="修改案例" /> -->
    <div class="title">产品<span>*</span> BCG-105</div>
    <div class="text">
      <textarea class="area"
                maxlength="150"
                v-model="description"></textarea>
      <p>描述<span>*</span></p>
      <div class="num">{{description.length}}/150</div>
    </div>
    <div class="postion">
      <span> 广东 东莞</span>
    </div>
    <div class="upload">
      <h2>请按要求添加案例图片</h2>
      <div class="up-box">
        <div class="li"
             v-for="(item,index) in defaultImg"
             :key="index">
          <p><span>*</span>{{item}}</p>
          <div class="img"
               :class="`img${index}`">
            <div class="add"></div>
            <input type="file"
                   hidden>
          </div>
        </div>
      </div>
      <h2>其他（不超过3张）</h2>
      <div class="up-box">
        <div class="li">
          <div class="img">
            <div class="tip">添加图片</div>
            <input type="file"
                   hidden>
          </div>
        </div>
      </div>
      <div class="notice">注意：图片大小不能超过3M</div>
    </div>
    <div class="release">
      <div class="re-btn">发布案例</div>
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
  </div>
</template>

<script>
import Banner from '@/components/banner'
import ToastComfirm from '@/components/case/ToastComfirm/Index'
export default {
  name: 'AlterCase',
  components: {
    Banner,
    ToastComfirm
  },
  data() {
    return {
      description: '',
      defaultImg: ['正面', '侧面', '对角'],
      ShowToast: true
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