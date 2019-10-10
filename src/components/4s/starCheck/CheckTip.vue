<!--  -->
<template>
  <div class="checkTip">
    <div class="banner"
         :style="{'margin-top':`${top}vw`}">
      <div class="icon-back"
           @click="$emit('onCloseTip')">
        <div class="icon iconfont icon-fanhui1"></div>
      </div>
      <span class="my_title">检查标准</span>

      <!-- <more-details class="details"  v-show='MoreBtn'/> -->
    </div>
    <div class="content">
      <p v-html="msg"
         v-if="msg"></p>
      <p v-else
         class="no-data">无记录</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      top: 0
    }
  },
  mounted() {
    // this.msg = this.$route.query.remark.replace(/\\n/g, '<br>')
    document.querySelector('#app').scrollTop = 0
    this.isIPhoneX()
  },
  computed: {
    ...mapState({
      checkingMsg(state) {
        return state.eggRecordDetails.checkingMsg
      },
      checkLevelMsg(state) {
        return state.eggRecordDetails.checkLevelMsg
      },
      msg() {
        if (this.$route.query.name == 'level') {
          return this.checkLevelMsg.replace(/\\n|↵/g, '<br>')
        } else {
          return this.checkingMsg.replace(/\\n|↵/g, '<br>')
        }
      }
    })
  },
  methods: {
    isIPhoneX: function(fn) {
      var u = navigator.userAgent
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
      if (isIOS) {
        if (
          (screen.height == 812 && screen.width == 375) ||
          (screen.height == 896 && screen.width == 414)
        ) {
          this.fix = 'fix'
          this.top = '6'
        } else {
        }
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.no-data {
  text-align: center;
}
.checkTip {
  width: 100vw;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(248, 248, 248);
  z-index: 100;
  .content {
    padding-top: 61px;
    padding-bottom: 107px;
  }
  p {
    color: #666;
    margin-top: 6vw;
    line-height: 1.6em;
    font-size: 14px;
    padding: 0 6vw;
    word-break: break-all;
  }
}
.banner {
  // font-family: PINGPANG;
  font-weight: 600;
  z-index: 99;
  height: 16.466vw;
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  align-items: center;
  border-bottom: 1px solid #ccc;
  background: #f8f8f8;
  padding-top: 5vw;
  // justify-content: space-between;
  .fix {
    position: absolute;
    background: #f8f8f8;
    left: 0;
    top: -6vw;
    height: 7vw;
    width: 100%;
    z-index: 99;
  }
  .icon-back {
    width: 7vw;
    height: 6.66vw;
    padding-left: 4.266vw;
    .icon {
      // background: url(../assets/imgs/back.png) no-repeat center;
      // background-size: 100%;
      font-size: 18px;
      width: 2.66vw;
      height: 4.66vw;
      margin-top: -1vw;
    }
  }
  .my_title {
    width: 100%;
    text-align: center;
    padding-right: 50px;
    font-size: 5.06vw;
    letter-spacing: -1px;
    color: #363636;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  button {
    position: absolute;
    right: 0;
    font-size: 14px;
    line-height: 11vw;
    //width: 25vw;
    padding: 0 5vw;
    text-align: right;
    color: #007aff;
    font-weight: bold;
    z-index: 1000;
  }
  .myLeftStyle {
    color: #222444;
    font-size: 4.8vw;
    font-weight: 500;
    padding-left: 2vw;
    text-align: left;
  }
}
</style>