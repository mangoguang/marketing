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
                :defaultIndex="$route.query.imgIndex"
                @change="bindChange">
        <mt-swipe-item v-for="(item,index) in browseData.imgs"
                       :key="index">
          <div class="slider">
            <img :src="item"
                 alt="">
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="tips">
      <h2>@{{browseData.createByName}}</h2>
      <p>{{browseData.remark}}</p>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
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
  computed: {
    ...mapState({
      browseData: state => state.caseStore.browseData
    })
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