<template>
  <div class="browse">
    <div class="nav">
      <div class="back"
           @click="$router.back()"></div>
      <div class="dot">{{imgIndex}}/5</div>
    </div>
    <div class="img">
      <mt-swipe :auto="100000"
                :show-indicators="false"
                :defaultIndex="dotIndex"
                @change="bindChange">
        <mt-swipe-item>
          <div class="slider">
            <img src="https://derucci-app.oss-cn-hangzhou.aliyuncs.com/train-advert/20190803/c4ffa40fb7e9f0070a8514ddd494dbb5.jpg"
                 alt="">
          </div>
        </mt-swipe-item>
        <mt-swipe-item>
          <div class="slider">
            <img src="https://derucci-app.oss-cn-hangzhou.aliyuncs.com/train-advert/20190503/273a01ea255e0621dc16d486ee5a6ee8.jpg"
                 alt="">
          </div>
        </mt-swipe-item>
        <mt-swipe-item>
          <div class="slider">
            <img src="https://derucci-app.oss-cn-hangzhou.aliyuncs.com/train-advert/20190506/d3e4b8bcb5b5d21aeb99dda2e50600b1.jpg"
                 alt="">
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="tips">
      <h2>@陈小美</h2>
      <p>@陈小美 宝贝到货很快，一直很信赖慕思的品牌，送货师傅服务也很好，客服也很耐心！床垫的颜值超级高，躺上去很舒服，还有一层乳胶，</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    dotIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      imgIndex: 1
    }
  },
  methods: {
    bindChange(index) {
      this.imgIndex = index + 1
    }
  }
}
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.browse {
  background-color: #000;
  overflow: auto;
}
.tips {
  height: 126px;
  color: #fff;
  margin: 16px;
  overflow: auto;
  h2 {
    font-size: 14px;
    font-weight: bold;
  }
  p {
    font-size: 14px;
  }
}

.img {
  height: calc(100vh-158px);
  .slider {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  img {
    width: 100%;
    vertical-align: middle;
  }
}
.nav {
  width: 375px;
  height: 44px;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  .back {
    height: 44px;
    width: 44px;
    background: url(~@/assets/imgs/back.png) left center / 10px 18px no-repeat;
    position: absolute;
    top: 0;
    left: 16px;
  }
  .dot {
    color: #909090;
    text-align: center;
    font-size: 19px;
    line-height: 44px;
  }
}
</style>