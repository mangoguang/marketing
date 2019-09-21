<template>
  <div id="select">
    <div class="left">
      <div class="area" @click="changeArea">
        <span class="title">{{areaText}}</span>
        <img
          src="../../assets/imgs/back.png"
          alt
          class="back"
          :style="{'transform': `rotate(${areaRotate}deg)`}"
        />
      </div>
      <div class="area">
        <span class="title">{{brandText}}</span>
        <img
          src="../../assets/imgs/back.png"
          alt
          class="back"
          :style="{'transform': `rotate(${brandRotate}deg)`}"
        />
      </div>
    </div>
    <div class="right">
      <div class="area">
        <span class="title">{{dateText}}</span>
        <img
          src="../../assets/imgs/back.png"
          alt
          class="back"
          :style="{'transform': `rotate(${dateRotate}deg)`}"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      areaText: "区域一",
      areaRotate: 90,
      areaShow: true,
      brandText: "歌蒂娅",
      brandRotate: 90,
      dateText: "本周",
      dateRotate: 90
    };
  },
  methods: {
    changeArea() {
      this.areaShow = !this.areaShow;
      if (this.areaShow) {
        this.areaRotate = -90;
      } else {
        this.areaRotate = 90;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#select {
  padding-top: 16.466vw;
  position: fixed;
  width: 100vw;
  height: 40px;
  border-bottom: 1px solid #e1e1e1;
  .left {
    display: flex;
    height: 100%;
    .area {
      height: 100%;
      display: flex;
      align-items: center;
      .title {
        color: #363636;
        font-size: 12px;
        padding: 0 10px 0 17px;
      }
      .back {
        width: 5px;
        height: 10px;
      }
      &:nth-child(1) {
        margin-right: 8px;
      }
    }
  }
  .right {
    height: 100%;
    padding-right: 16px;
    .area {
      height: 100%;
      display: flex;
      align-items: center;
      .title {
        color: #363636;
        font-size: 12px;
        padding: 0 10px 0 17px;
      }
      .back {
        width: 5px;
        height: 10px;
      }
    }
  }
}
</style>