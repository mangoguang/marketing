<template>
  <div class="moreDetails">
    <div class="icon_more" @click="changeShow">
      <img src="../../../assets/imgs/more.png" alt>
    </div>
    <div class="more_content" v-show="isShow">
      <div class="trigon"></div>
      <ul>
        <li v-for="(item, index) in list" :key="index" @click="skipTo(index)">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      list: ["图库首页", "我的收藏", "扫一扫"]
    };
  },
  methods: {
    changeShow() {
      this.isShow = !this.isShow;
    },
    skipTo(index) {
      this.list.forEach(item => {
        switch (index) {
          case 0:
            this.$router.push({ path: "/gallery" });
            break;
          case 1:
            this.$router.push({ path: "/collectList" });
            break;
          case 2:
            this.openscan();
            break;
        }
      });
    },
    openscan() {
      var FNScanner = api.require("FNScanner");
      FNScanner.open(
        {
          autorotation: true,
          verticalLineColor: "##94f8fa",
          isAlbum: true,
          hintText: "将二维码放入取景框内即可自动扫描"
        },
        function(ret, err) {
          if (ret) {
            console.log(JSON.stringify(ret));
          } else {
            console.log(JSON.stringify(err));
          }
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.moreDetails {
  .icon_more {
    padding: 4vw;
    margin-top: 0vw;
    margin-right: -4vw;
    img {
      width: 4.26vw;
      height: 1.06vw;
    }
  }
  .trigon {
    background: url(../../../assets/imgs/trigon.png) no-repeat center;
    background-size: contain;
    width: 2vw;
    height: 1.06vw;
    position: absolute;
    top: 4.98vw;
    right: 1vw;
  }
  ul {
    position: absolute;
    width: 21.33vw;
    right: 0;
    top: 6vw;
    background: rgba(54, 54, 54, 1);
    box-shadow: 0px 0.26vw 0.8vw 0px rgba(67, 66, 66, 0.2);
    opacity: 0.96;
    border-radius: 0.53vw;
    li {
      color: #909090;
      font-size: 3.73vw;
      line-height: 8.13vw;
      text-align: center;
      border-bottom: 1px solid #2d2d2d;
      box-shadow: 0px 1px 0px 0px rgba(67, 66, 66, 1);
    }
  }
}
a {
  color: #909090;
}
</style>

