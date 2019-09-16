<template>
  <div class="detail">
    <div class="head">
      <div class="nav">
        <div class="back"
             @click="$router.go(-1)"></div>
        <div class="fix">修改</div>
      </div>
      <div class="banner">
        <mt-swipe :show-indicators="false"
                  @change="bindSwipeChange">
          <mt-swipe-item class="slider">
            <img src="https://derucci-app.oss-cn-hangzhou.aliyuncs.com/upload/20190425/b169d7e844e653fecb41dc2edb5a7d32.jpg"
                 alt="">
          </mt-swipe-item>
          <mt-swipe-item class="slider">
            <img src="https://derucci-app.oss-cn-hangzhou.aliyuncs.com/upload/20190425/cd2134b17784c8c6896c9a34743d3083.jpg"
                 alt="">
          </mt-swipe-item>
          <mt-swipe-item class="slider">
            <img src="https://derucci-app.oss-cn-hangzhou.aliyuncs.com/upload/20190425/204bf75af8b5cb257f0c5f207c0175b3.jpg"
                 alt="">
          </mt-swipe-item>
        </mt-swipe>
        <div class="dot">{{swipeIndex}}/3</div>
      </div>
    </div>
    <div class="info">
      <div class="user">
        <div class="img">
          <img src="https://derucci-app.oss-cn-hangzhou.aliyuncs.com/upload/20190425/204bf75af8b5cb257f0c5f207c0175b3.jpg"
               alt="">
        </div>
        <div class="name">
          <h2>陈晓梅</h2>
          <p class="pos">广东 广州</p>
        </div>
        <div class="date">2018.12.7</div>
      </div>
      <div class="content">
        <div class="brand">
          <h2>
            <span>品牌：</span><span>歌蒂娅</span>
          </h2>
          <h2>
            <span>产品：</span><span>MFC1-021/非温感凝胶记忆绵/床垫/180*200*22</span>
          </h2>
        </div>
        <div class="dec">
          宝贝到货很快，一直很信赖慕思的品牌，送货师傅服务也很好，客服也很耐心！床垫的颜值超级高，躺上去很舒服，还有一层乳胶，家里几套房子都是一直用这个品牌！十分好评！
        </div>
      </div>
    </div>
    <fixed-bar />
  </div>
</template>
<script>
import Vue from 'vue'
import { Swipe, SwipeItem } from 'mint-ui'
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
import FixedBar from '@/components/case/FixedBar/Index'
export default {
  components: {
    FixedBar
  },
  data() {
    return {
      swipeIndex: 1
    }
  },
  methods: {
    bindSwipeChange(index) {
      this.swipeIndex = index + 1
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