<template>
  <div class="detail">
    <div class="head">
      <div class="nav">
        <div class="back"
             @click="$router.go(-1)"></div>
        <div class="fix"
             v-if="$route.query.alter==1"
             @click="bindAlter">修改
        </div>
      </div>
      <div class="banner">
        <mt-swipe :show-indicators="false"
                  @change="bindSwipeChange">
          <mt-swipe-item class="slider"
                         v-for="(item,index) in slider"
                         :key="index"
                         @click.native="$router.push({path:'/browse',query:{imgIndex:swipeIndex-1}})">
            <img :src="item">
          </mt-swipe-item>
        </mt-swipe>
        <div class="dot">{{swipeIndex}}/{{slider.length}}</div>
      </div>
    </div>
    <div class="info">
      <div class="user">
        <div class="img">
          <img :src="detailData.userImage||'./static/images/default.jpg'"
               alt="">
        </div>
        <div class="name">
          <h2>{{detailData.goodsName||'-'}}</h2>
          <p class="pos">{{detailData.source}}</p>
        </div>
        <div class="date">{{detailData.createTime}}</div>
      </div>
      <div class="content">
        <div class="brand">
          <h2>
            <span>品牌：</span><span>{{detailData.brand}}</span>
          </h2>
          <h2>
            <span>产品：</span><span>{{detailData.category}}</span>
          </h2>
        </div>
        <div class="dec">
          {{detailData.remark||'-'}}
        </div>
      </div>
    </div>
    <fixed-bar @onShare="onShare"
               @onDelete="onDelete"
               @onLove="onLove"
               :detailData="detailData"
               :showDel="$route.query.alter==1?1:0" />
    <share-toast v-show="showShare"
                 :detailData="detailData"
                 @onCloseShare="showShare=false"></share-toast>
    <toast-comfirm :content="content"
                   v-if="showComfirm"
                   @onComfirm="onComfirm"
                   @onCancel="showComfirm=false"
                   title=""></toast-comfirm>
  </div>
</template>
<script>
import FixedBar from '@/components/case/FixedBar/Index'
import ShareToast from '@/components/case/FixedBar/ShareToast'
import ToastComfirm from '@/components/case/ToastComfirm/Index'
import {
  goodCaseDetails,
  goodCaseDelete,
  cancelCollect,
  collect
} from '@/api/case'
import { Toast } from 'mint-ui'
import { mapMutations } from 'vuex'
export default {
  components: {
    FixedBar,
    ShareToast,
    ToastComfirm
  },
  data() {
    return {
      swipeIndex: 1,
      showShare: false,
      slider: [],
      detailData: {},
      content: '',
      showComfirm: false
    }
  },
  created() {
    this._initData()
  },
  methods: {
    ...mapMutations([
      'setBrowseData',
      'setGoodCase',
      'setAlterUploadImg',
      'setSelectGoods'
    ]),
    async _initData() {
      let account = JSON.parse(localStorage.getItem('userInfo'))['account']
      let { entity } = await goodCaseDetails({
        id: this.$route.query.id,
        account
      })
      let imgs = ['flankImg', 'frontImg', 'diagonalImg', 'img1', 'img2']
      let arr = []
      for (var item in entity) {
        if (imgs.includes(item) && entity[item]) {
          arr.push(entity[item])
        }
      }
      this.slider = arr
      this.detailData = entity
      let { createByName, remark, username } = entity
      this.setBrowseData({
        imgs: arr,
        createByName: createByName || '-',
        remark: remark || '-',
        username
      })
    },
    bindAlter() {
      let {
        diagonalImg,
        flankImg,
        frontImg,
        img1,
        img2,
        remark,
        goodId,
        id,
        source,
        goodsName
      } = this.detailData
      this.setGoodCase({
        diagonalImg,
        flankImg,
        frontImg,
        img1,
        img2,
        remark,
        goodId,
        id,
        source
      })
      this.setAlterUploadImg({
        diagonalImgFile: diagonalImg,
        flankImgFile: flankImg,
        frontImgFile: frontImg,
        spareImgFile1: img1,
        spareImgFile2: img2
      })
      this.setSelectGoods({ goodsName, goodId })
      this.$router.push({ path: '/alterCase', query: { alter: 1 } })
    },
    bindSwipeChange(index) {
      this.swipeIndex = index + 1
    },
    onShare() {
      this.showShare = true
    },
    onDelete() {
      this.showComfirm = true
      this.content = '删除后将不能恢复<br>确定删除案例？'
    },
    async onLove(id) {
      let account = JSON.parse(localStorage.getItem('userInfo'))['account']
      if (this.detailData.collectStatus == true) {
        let { code, msg } = await cancelCollect({
          id,
          account,
          type: 5 //this.detailData.type
        })
        this.detailData.collectStatus = false
        this.detailData.collect -= 1
      } else {
        let { code, msg } = await collect({
          id,
          account,
          type: 5 //this.detailData.type
        })
        this.detailData.collectStatus = true
        this.detailData.collect += 1
      }
      //this._initData()
    },
    async onComfirm(item) {
      this.showComfirm = false
      let { code, msg } = await goodCaseDelete({ id: this.$route.query.id })
      if (code == 0) {
        Toast('删除成功')
        setTimeout(() => {
          this.$router.back()
        }, 1000)
      } else {
        Toast('删除失败')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
@mixin com-img {
  img {
    width: 100%;
    height: 100%;
  }
}

.info {
  padding-bottom: 66px;
  .content {
    padding: 15px 16px;
    background-color: #fff;
    .dec {
      font-weight: 500;
      color: rgba(54, 54, 54, 1);
      line-height: 21px;
      padding-top: 15px;
    }
    .brand {
      border-bottom: 1px solid #e1e1e1;
      padding-bottom: 15px;
      h2 {
        font-size: 14px;
        color: #363636;
        font-weight: 500;
        line-height: 25px;
        display: flex;
        span:first-child {
          min-width: 60px;
          &::before {
            content: '';
            display: inline-block;
            width: 4px;
            height: 4px;
            background-color: #ffcc00;
            border-radius: 50%;
            vertical-align: middle;
            margin-right: 5px;
          }
        }
      }
    }
  }
  .user {
    background-color: #fff;
    margin-top: 5px;
    margin-bottom: 5px;
    padding: 8px 16px;
    display: flex;
    .img {
      width: 60px;
      height: 60px;
      overflow: hidden;
      border-radius: 5px;
      margin-right: 10px;
      @include com-img;
    }
    .name {
      flex: 1;
      h2 {
        font-size: 16px;
        color: #363636;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 100px;
        line-height: 1;
        padding-top: 8px;
        padding-bottom: 16px;
      }
      .pos {
        font-size: 12px;
        color: #909090;
        padding-left: 13px;
        background: url(~@/assets/imgs/case/定位拷贝2@2x.png) left center / 8px
          10px no-repeat;
      }
    }
    .date {
      color: #909090;
      font-size: 12px;
      padding-top: 11px;
      line-height: 1;
    }
  }
}
.head {
  position: relative;
  .nav {
    position: absolute;
    top: 20px;
    width: 100%;
    height: 30px;
    z-index: 9;
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
    .back {
      width: 30px;
      height: 30px;
      background: url(~@/assets/imgs/case/返回@2x.png) center center / 100% 100%
        no-repeat;
    }
    .fix {
      width: 48px;
      height: 30px;
      background: rgba(0, 0, 0, 1);
      border: 1px solid rgba(255, 255, 255, 1);
      opacity: 0.3;
      border-radius: 4px;
      color: #fff;
      font-size: 14px;
      line-height: 30px;
      text-align: center;
    }
  }
}
.banner {
  height: 375px;
  width: 100%;
  position: relative;
  .dot {
    position: absolute;
    right: 5px;
    bottom: 10px;
    min-width: 32px;
    height: 20px;
    background: rgba(0, 0, 0, 1);
    opacity: 0.4;
    border-radius: 10px;
    color: #fff;
    line-height: 20px;
    text-align: center;
    font-size: 9px;
  }
  .slider {
    @include com-img;
  }
}
</style>